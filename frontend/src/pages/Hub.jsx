import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Heart, UserCircle, Plus, X, Image as ImageIcon, Video, Type } from 'lucide-react';
import Swal from 'sweetalert2';
import PageWrapper from '../components/PageWrapper';
import API from '../api'; 

const Hub = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Create Post Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [caption, setCaption] = useState('');
  const [mediaType, setMediaType] = useState('photo');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        setCurrentUserId(userObj._id);
        if (userObj.role === 'admin' || userObj.isAdmin === true) {
          setIsAdmin(true);
        }
      } catch (e) {
        console.error("Failed to parse user from local storage");
      }
    }

    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts");
        setPosts(data.posts || data); 
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (!currentUserId) {
      Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please log in to like posts!',
        confirmButtonColor: '#f0b000'
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const { data } = await API.put(`/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPosts((prevPosts) => 
        prevPosts.map((p) => 
          p._id === postId ? { ...p, likes: data.likes } : p
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!caption && !file && mediaType !== 'text') {
      Swal.fire({
        icon: 'info',
        title: 'Missing Content',
        text: 'Please add some content or a file before publishing.',
        confirmButtonColor: '#f0b000'
      });
      return;
    }

    setIsCreating(true);
    try {
      const token = localStorage.getItem("token");
      
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("mediaType", mediaType);
      if (file) {
        formData.append("file", file); 
      }

      const { data } = await API.post("/posts", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      });

      setShowCreateModal(false);
      setCaption('');
      setFile(null);
      setMediaType('photo');
      
      const newPost = data.post || data;
      setPosts([newPost, ...posts]);
      
      Swal.fire({
        icon: 'success',
        title: 'Published!',
        text: 'Your post has been successfully created.',
        confirmButtonColor: '#f0b000',
        timer: 2000,
        showConfirmButton: false
      });
      
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Failed to create post. Please try again.',
        confirmButtonColor: '#f0b000'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <PageWrapper>
      <div className="bg-[#faf6e8] min-h-screen md:mt-[-25px] pt-28 pb-16 px-4 md:px-10 relative">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            MyHygiene <span className="text-[#f0b000]">Hub</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
            Stay updated with the latest tips, news, and behind-the-scenes looks at our professional cleaning services.
          </p>

          {isAdmin && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0b000] text-black font-semibold rounded-full hover:bg-yellow-500 transition-colors shadow-md"
            >
              <Plus size={20} /> Create New Post
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet. Check back soon!</p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => {
              const isLiked = post.likes?.includes(currentUserId);

              return (
                <div key={post._id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-2 duration-300 border border-gray-100">
                  
                  {post.mediaType === "photo" && post.url && (
                    <div className="h-56 overflow-hidden bg-gray-100">
                      <img src={post.url} alt="Post media" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {post.mediaType === "video" && post.url && (
                    <div className="h-56 overflow-hidden bg-black">
                      <video src={post.url} controls className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-gray-400 text-sm gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button onClick={() => handleLike(post._id)} className="focus:outline-none transform transition-transform active:scale-75">
                          <Heart 
                            size={24} 
                            color={isLiked ? "#f0b000" : "#9ca3af"} 
                            fill={isLiked ? "#f0b000" : "transparent"} 
                          />
                        </button>
                        <span className="text-gray-500 text-sm font-semibold">{post.likes?.length || 0}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
                       <UserCircle size={20} className="text-[#f0b000]" />
                       <span>{post.uploadedBy?.name || "Admin"}</span>
                    </div>
                    
                    {post.caption && (
                      <p className="text-gray-700 mb-6 flex-grow whitespace-pre-wrap">
                        {post.caption}
                      </p>
                    )}
                    
                    <button className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
                      View Details <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center overflow-y-auto px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
              <button 
                onClick={() => setShowCreateModal(false)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Post</h2>
              
              <form onSubmit={handleCreatePost} className="flex flex-col gap-5">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setMediaType('photo')}
                      className={`flex-1 py-2 px-3 rounded-lg border flex justify-center items-center gap-2 transition-colors ${mediaType === 'photo' ? 'bg-[#f0b000] border-[#f0b000] text-black font-semibold' : 'bg-gray-50 text-gray-600'}`}
                    >
                      <ImageIcon size={18} /> Photo
                    </button>
                    <button 
                      type="button"
                      onClick={() => setMediaType('video')}
                      className={`flex-1 py-2 px-3 rounded-lg border flex justify-center items-center gap-2 transition-colors ${mediaType === 'video' ? 'bg-[#f0b000] border-[#f0b000] text-black font-semibold' : 'bg-gray-50 text-gray-600'}`}
                    >
                      <Video size={18} /> Video
                    </button>
                    <button 
                      type="button"
                      onClick={() => setMediaType('text')}
                      className={`flex-1 py-2 px-3 rounded-lg border flex justify-center items-center gap-2 transition-colors ${mediaType === 'text' ? 'bg-[#f0b000] border-[#f0b000] text-black font-semibold' : 'bg-gray-50 text-gray-600'}`}
                    >
                      <Type size={18} /> Text Only
                    </button>
                  </div>
                </div>

                {mediaType !== 'text' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload {mediaType === 'photo' ? 'Image' : 'Video'}</label>
                    <input 
                      type="file" 
                      accept={mediaType === 'photo' ? 'image/*' : 'video/*'}
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-[#f0b000]"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                  <textarea 
                    rows="4"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write something about this post..."
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0b000]/50 focus:border-[#f0b000] resize-none"
                    required={mediaType === 'text'}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isCreating}
                  className="w-full py-3 mt-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {isCreating ? 'Publishing...' : 'Publish Post'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </PageWrapper>
  );
};

export default Hub;