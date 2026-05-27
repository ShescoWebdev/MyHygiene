import React, { useState, useEffect, useContext, useRef } from 'react';
import { Calendar, ChevronRight, Heart, UserCircle, Plus, X, Image as ImageIcon, Video, Type, MoreVertical, Edit2, Trash2, CheckSquare } from 'lucide-react';
import Swal from 'sweetalert2';
import PageWrapper from '../components/PageWrapper';
import API, { BASE_URL } from "../api";
import { AuthContext } from '../context/AuthContext';
import SafeNavLink from '../components/SafeNavLink';

const Hub = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  // Modal & Menu States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [menuOpenPostId, setMenuOpenPostId] = useState(null);
  const [modalMenuOpen, setModalMenuOpen] = useState(false);

  // Bulk Selection States
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const pressTimer = useRef(null); // For mobile long-press

  // Form States
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [caption, setCaption] = useState('');
  const [mediaType, setMediaType] = useState('photo');
  const [file, setFile] = useState(null);

  // Video Syncing Refs
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);

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

  // Prevent background scrolling when any modal view is active
  useEffect(() => {
    if (selectedPost || showCreateModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPost, showCreateModal]);

  // To Handle Syncing Video Time When Opening Modal
  useEffect(() => {
    if (selectedPost && selectedPost.mediaType === "video" && modalVideoRef.current) {
      modalVideoRef.current.currentTime = selectedPost.initialTime || 0;
      if (selectedPost.isPlaying) {
        modalVideoRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }
  }, [selectedPost]);

  // To Handle Closing Modal and Syncing Back Video Time if Needed
  const closePostModal = () => {
    if (selectedPost?.mediaType === "video" && modalVideoRef.current) {
      const feedVid = videoRefs.current[selectedPost._id];
      if (feedVid) {
        feedVid.currentTime = modalVideoRef.current.currentTime;
        if (!modalVideoRef.current.paused) {
          feedVid.play().catch(() => {});
        }
      }
    }
    setSelectedPost(null);
  };

  // To Close Menus When Clicking Outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.post-menu-container')) {
        setMenuOpenPostId(null);
      }
      if (!e.target.closest('.modal-menu-container')) {
        setModalMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // To Handle Long Press for Mobile to Activate Selection Mode
  const handleTouchStart = (postId) => {
    if (!isAdmin || isSelectionMode) return;
    pressTimer.current = setTimeout(() => {
      setIsSelectionMode(true);
      setSelectedPostIds([postId]);
      setMenuOpenPostId(null);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  // To Toggle Selection of Individual Posts
  const toggleSelection = (postId) => {
    setSelectedPostIds(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };

  const handleSelectAllCheckbox = (e) => {
    if (e.target.checked) {
      setSelectedPostIds(posts.map(p => p._id));
    } else {
      setSelectedPostIds([]);
    }
  };

  const cancelSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedPostIds([]);
  };

  // To Bulk Delete Posts
  const handleBulkDelete = async () => {
    if (selectedPostIds.length === 0) return;

    const confirm = await Swal.fire({
      title: 'Delete Selected Posts?',
      text: `You are about to delete ${selectedPostIds.length} post(s). This cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!'
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await Promise.all(
          selectedPostIds.map(id => 
            API.delete(`/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
          )
        );
        
        setPosts(posts.filter((p) => !selectedPostIds.includes(p._id)));
        cancelSelectionMode();
        
        Swal.fire('Deleted!', 'Selected posts have been deleted.', 'success');
      } catch (error) {
        console.error("Error bulk deleting posts:", error);
        Swal.fire('Error!', 'Failed to delete some posts.', 'error');
      }
    }
  };

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
      
      if (selectedPost && selectedPost._id === postId) {
        setSelectedPost({ ...selectedPost, likes: data.likes });
      }
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
    // 1GB limit in bytes (1024 * 1024 * 1024)
    const MAX_FILE_SIZE = 1073741824; 
    
    if (file && file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Please upload a video or photo smaller than 1GB.',
        confirmButtonColor: '#79bab9' 
      });
      return;
    }

    setIsCreating(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("mediaType", mediaType);
      if (file) formData.append("file", file); 

      if (isEditing) {
        const { data } = await API.put(`/posts/${editPostId}`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data" 
          }
        });
        
        const updatedPost = data.post || data;
        setPosts(posts.map(p => p._id === editPostId ? updatedPost : p));
        if (selectedPost && selectedPost._id === editPostId) {
          setSelectedPost(updatedPost);
        }
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Your post was updated.', confirmButtonColor: '#f0b000', timer: 2000, showConfirmButton: false });
      } else {
        const { data } = await API.post("/posts", formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data" 
          }
        });

        console.log("Backend response after creation:", data);
        
        const newPost = data.post || data;
        setPosts([newPost, ...posts]);
        Swal.fire({ icon: 'success', title: 'Published!', text: 'Your post has been successfully created.', confirmButtonColor: '#f0b000', timer: 2000, showConfirmButton: false });
      }

      closeCreateModal();
    } catch (error) {
      console.error("Error saving post:", error);
      Swal.fire({ icon: 'error', title: 'Action Failed', text: 'Failed to process request. Please try again.', confirmButtonColor: '#f0b000' });
    } finally {
      setIsCreating(false);
    }
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setEditPostId(post._id);
    setCaption(post.caption || '');
    setMediaType(post.mediaType || 'photo');
    setFile(null); 
    setShowCreateModal(true);
    setMenuOpenPostId(null);
    setModalMenuOpen(false);
  };

  const handleDelete = async (postId) => {
    setMenuOpenPostId(null);
    setModalMenuOpen(false);
    
    const confirm = await Swal.fire({
      title: 'Delete this post?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await API.delete(`/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(posts.filter((p) => p._id !== postId));
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(null);
        }
        Swal.fire('Deleted!', 'The post has been deleted.', 'success');
      } catch (error) {
        console.error("Error deleting post:", error);
        Swal.fire('Error!', 'Failed to delete the post.', 'error');
      }
    }
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setIsEditing(false);
    setEditPostId(null);
    setCaption('');
    setMediaType('photo');
    setFile(null);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getHubProfilePic = (picUrl, name) => {
    if (!picUrl) {
      return `https://ui-avatars.com/api/?name=${name || 'User'}&background=0D8ABC&color=fff&bold=true`;
    }
    return picUrl.startsWith("http") ? picUrl : `${BASE_URL}/${picUrl}`;
  };

    // Add a default fallback value right in the parameters
  // Add postId as the first parameter so you can map it directly
const handleHeartClick = async (postId, postText = "this post") => {
  if (isLiked) return; 
  setIsLiked(true); 

  let loggedInUser = "A Website Visitor"; 
  let userImage = null; 

  try {
    const userStorageString = localStorage.getItem("user");
    if (userStorageString) {
      const userObject = JSON.parse(userStorageString);
      if (userObject) {
        if (userObject.name) loggedInUser = userObject.name;
        if (userObject.profilePic) userImage = userObject.profilePic;
      }
    }
  } catch (error) {
    console.error("Failed to parse user from local storage:", error);
  }

  const safeText = String(postText || "this post");
  const snippet = safeText.length > 40 
    ? safeText.substring(0, 40) + "..." 
    : safeText;

  try {
    await API.post("/activities", {
      user: loggedInUser, 
      action: `liked your post: "${snippet}"`, 
      profilePic: userImage,
      postId: postId // 👈 NEW: Sending the specific post ID down the pipe
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};

  return (
    <PageWrapper>
      <header className='fixed top-0 bg-black w-full h-20 text-white z-[100] flex items-center justify-between px-6 md:px-20 border-b-4 border-red-500 shadow-lg'>
        <h1 className='text-2xl md:text-3xl font-bold'>Hub</h1>

        <SafeNavLink to="/">
            <button className="text-sm font-bold text-blue-400 hover:text-blue-300 underline whitespace-nowrap">
              &larr; Back to Homepage
            </button>
        </SafeNavLink>
      </header>
      <div className="bg-[#faf6e8] min-h-screen md:mt-[-25px] pt-28 pb-16 px-4 md:px-10 relative">
        
        
        {/* Bulk Selection Sticky Top Bar */}
        {isSelectionMode && isAdmin && (
          <div className="fixed top-0 left-0 right-0 bg-white shadow-xl z-[100] p-4 px-6 md:px-20 flex justify-between items-center border-b-4 border-red-500 animate-slide-down">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 text-sm md:text-base">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 accent-red-600 cursor-pointer"
                  checked={selectedPostIds.length === posts.length && posts.length > 0} 
                  onChange={handleSelectAllCheckbox} 
                />
                Select All
              </label>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm font-semibold border">
                {selectedPostIds.length} Selected
              </span>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={cancelSelectionMode} 
                className="px-3 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg text-sm md:text-base transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleBulkDelete} 
                disabled={selectedPostIds.length === 0}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-sm md:text-base shadow-md transition-all"
              >
                <Trash2 size={18} /> <span className="hidden md:inline">Delete Selected</span>
              </button>
            </div>
          </div>
        )}

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
              const isLiked = post.likes?.some(liker => (liker._id || liker) === currentUserId);  
              const isSelected = selectedPostIds.includes(post._id);

              return (
                <div 
                  key={post._id} 
                  onPointerDown={() => handleTouchStart(post._id)}
                  onPointerUp={handleTouchEnd}
                  onPointerLeave={handleTouchEnd}
                  onClick={() => {
                    if (isSelectionMode) toggleSelection(post._id);
                  }}
                  className={`bg-white rounded-2xl shadow-lg flex flex-col transition-all duration-300 border relative 
                    ${isSelectionMode ? 'cursor-pointer' : ''} 
                    ${isSelected ? 'ring-4 ring-red-500 scale-[0.98]' : 'border-gray-100'} 
                    ${isSelectionMode && !isSelected ? 'opacity-70 grayscale-[30%]' : ''}
                    `}
                >
                  
                  {/* Dark Overlay When Selected */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-black/50 z-[15] pointer-events-none flex items-center justify-center transition-all rounded-2xl overflow-hidden">
                      <CheckSquare size={54} className="text-white opacity-90 drop-shadow-lg" />
                    </div>
                  )}

                  {post.mediaType === "photo" && post.url && (
                    <div className="h-56 overflow-hidden bg-gray-100 rounded-t-2xl z-10 relative">
                      <img src={`${BASE_URL}/${post.url}`} alt="Post media" className="w-full h-full object-cover object-top" />
                    </div>
                  )}
                  {post.mediaType === "video" && post.url && (
                  <div className="h-56 overflow-hidden cursor-pointer bg-black rounded-t-2xl z-10 relative">
                    <video 
                      ref={(el) => (videoRefs.current[post._id] = el)}
                      src={`${BASE_URL}/${post.url}`} 
                      controls 
                      playsInline
                      className="w-full h-full object-cover" 
                      onClick={(e) => e.stopPropagation()} 
                      onPointerDown={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

                  <div className={`p-6 flex flex-col flex-grow relative z-20 ${isSelectionMode ? 'pointer-events-none' : ''}`}>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-gray-400 text-xs gap-2">
                        <Calendar size={14} />
                        <span>{formatDateTime(post.createdAt)}</span>
                      </div>

                {/* Hover Like Button */}
              <div className="relative group flex items-center gap-1 z-40">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(post._id);
                  }} 
                  className="focus:outline-none transform transition-transform hover:scale-110 active:scale-75 flex items-center"
                >
                  <Heart 
                    onClick={() => handleHeartClick(post._id, post.caption)}
                    size={20} 
                    color={isLiked ? "#f0b000" : "#9ca3af"} 
                    fill={isLiked ? "#f0b000" : "transparent"} 
                  />
                </button>
                <span className="text-gray-500 text-sm font-semibold">{post.likes?.length || 0}</span>

                {/* The Hover Tooltip */}
                {post.likes && post.likes.length > 0 && typeof post.likes[0] === 'object' && (
                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-[80] w-48 bg-gray-900 text-white shadow-xl rounded-lg border border-gray-700 pointer-events-none">
                    <div className="max-h-40 overflow-y-auto p-2 custom-scrollbar">
                      <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider px-1">
                        Reactions
                      </p>
                      {post.likes.map((liker) => (
                        <div key={liker._id} className="flex items-center gap-2 mb-2 last:mb-0 px-1">
                          <img 
                            src={getHubProfilePic(liker.profilePic, liker.name)} 
                            alt={liker.name} 
                            className="w-5 h-5 rounded-full object-cover border border-gray-600"
                          />
                          <span className="text-xs font-medium truncate">{liker.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-full right-3 border-[6px] border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            </div>
                    {/* Uploaded By */}
                    <div className="flex justify-between items-center mb-4 relative z-50">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                         {post.uploadedBy?.profilePic ? (
                           <img 
                             src={getHubProfilePic(post.uploadedBy?.profilePic, post.uploadedBy?.name)}
                             alt="Profile" 
                             className="w-8 h-8 text-[10px] rounded-full object-cover"
                           />
                         ) : (
                           <UserCircle size={24} className="text-[#f0b000]" />
                         )}
                         <span>{post.uploadedBy?.name || "Admin"}</span>
                      </div>

                      {/* 3 Dots Menu */}
                      {isAdmin && !isSelectionMode && (
                        // ADDED z-50 container to keep menu context clean
                        <div className="relative post-menu-container z-50">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuOpenPostId(menuOpenPostId === post._id ? null : post._id);
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors z-20"
                          >
                            <MoreVertical size={18} className="text-gray-500" />
                          </button>
                          
                          {menuOpenPostId === post._id && (
                            <div className="absolute right-0 bottom-full mb-2 w-44 bg-white border border-gray-100 rounded-xl shadow-2xl z-[100] py-2 overflow-hidden">
                              
                              {/* Select */}
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  setIsSelectionMode(true); 
                                  setSelectedPostIds([post._id]); 
                                  setMenuOpenPostId(null); 
                                }} 
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors rounded-xl"
                              >
                                <CheckSquare size={16} /> Select
                              </button>
                              
                              {/* Select All */}
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  setIsSelectionMode(true); 
                                  setSelectedPostIds(posts.map(p => p._id)); 
                                  setMenuOpenPostId(null); 
                                }} 
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 border-b border-gray-100 pb-3 mb-1 transition-colors rounded-xl"
                              >
                                <CheckSquare size={16} className="opacity-50" /> Select All
                              </button>

                              {/* Edit */}
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  handleEdit(post); 
                                }} 
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors rounded-xl"
                              >
                                <Edit2 size={16} /> Edit
                              </button>

                              {/* Delete */}
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  handleDelete(post._id); 
                                }} 
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors rounded-xl"
                              >
                                <Trash2 size={16} /> Delete
                              </button>
                              
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {post.caption && (
                      <p className="text-gray-700 mb-6 flex-grow whitespace-pre-wrap line-clamp-3">
                        {post.caption}
                      </p>
                    )}
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        let initialTime = 0;
                        let isPlaying = false;

                        if (post.mediaType === 'video') {
                          const feedVid = videoRefs.current[post._id];
                          if (feedVid) {
                            initialTime = feedVid.currentTime;
                            isPlaying = !feedVid.paused;
                            feedVid.pause();
                          }
                        }

                        setSelectedPost({ ...post, initialTime, isPlaying });
                      }}
                      className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      View Details <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Post Details Modal View */}
        {selectedPost && (
          <div className="fixed inset-0  bg-black/90 z-[100] flex justify-center items-center overflow-y-auto p-4 md:p-8">
            <div className="bg-white rounded-2xl w-full overflow-y-auto md:overflow-hidden relative shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
              
              <button 
                onClick={closePostModal}
                className="fixed top-7 right-1 md:right-16 md:top-14 z-[70] text-gray-500 border border-gray-300 hover:text-black bg-white rounded-full p-1 shadow-md transition-colors"
              >
                <X size={24} />
              </button>

              {(selectedPost.mediaType === "photo" || selectedPost.mediaType === "video") && selectedPost.url && (
                <div className="w-full md:w-3/5 bg-black flex items-center justify-center">
                  {selectedPost.mediaType === "photo" ? (
                    <img 
                      src={`${BASE_URL}/${selectedPost.url}`} 
                      alt="Full post media" 
                      className="w-full max-h-[90vh] rounded-2xl object-contain" 
                    />
                  ) : (
                    <video 
                      ref={modalVideoRef}
                      src={`${BASE_URL}/${selectedPost.url}`} 
                      controls 
                      playsInline
                      className="w-full max-h-[90vh] cursor-pointer object-contain" 
                    />
                  )}
                </div>
              )}

              <div className={`w-full flex flex-col p-6 overflow-y-visible md:overflow-y-auto ${selectedPost.mediaType === "text" ? 'md:w-full' : 'md:w-2/5'}`}>
                
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                  {selectedPost.uploadedBy?.profilePic ? (
                    <img 
                      src={getHubProfilePic(selectedPost.uploadedBy?.profilePic, selectedPost.uploadedBy?.name)} 
                      alt="Profile" 
                      className="w-12 h-12 text-[11px] rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle size={48} className="text-[#f0b000]" />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedPost.uploadedBy?.name || "Admin"}</h3>
                    <p className="text-xs text-gray-500">{formatDateTime(selectedPost.createdAt)}</p>
                  </div>
                </div>

                <div className="flex-grow">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {selectedPost.caption}
                  </p>
                </div>

                  {/* Hover Like Button */}
                <div className="mt-6 pt-4 border-t flex items-center justify-between relative z-30">
              <div className="relative group flex items-center gap-1">
                <button 
                  onClick={() => handleLike(selectedPost._id)} 
                  className="focus:outline-none transform transition-transform active:scale-75"
                >
                  <Heart 
                    size={28} 
                    color={selectedPost.likes?.some(liker => (liker._id || liker) === currentUserId) ? "#f0b000" : "#9ca3af"} 
                    fill={selectedPost.likes?.some(liker => (liker._id || liker) === currentUserId) ? "#f0b000" : "transparent"} 
                  />
                </button>
                <span className="text-gray-700 font-semibold text-lg">{selectedPost.likes?.length || 0} likes</span>

                {/* The Hover Tooltip */}
                {selectedPost.likes && selectedPost.likes.length > 0 && typeof selectedPost.likes[0] === 'object' && (
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-[80] w-52 bg-gray-900 text-white shadow-xl rounded-lg border border-gray-700 pointer-events-none">
                    <div className="max-h-48 overflow-y-auto p-2 custom-scrollbar">
                      <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider px-1">
                        Reactions
                      </p>
                      {selectedPost.likes.map((liker) => (
                        <div key={liker._id} className="flex items-center gap-2 mb-2 last:mb-0 px-1">
                          <img 
                            src={getHubProfilePic(liker.profilePic, liker.name)} 
                            alt={liker.name} 
                            className="w-6 h-6 rounded-full object-cover border border-gray-600"
                          />
                          <span className="text-sm font-medium truncate">{liker.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>

                  {isAdmin && (
                    // ADDED z-50 to Modal menu
                    <div className="relative modal-menu-container z-50">
                      <button 
                        onClick={(e) => {
                          // ADDED e.stopPropagation() here to prevent the document click listener from instantly hiding it
                          e.stopPropagation();
                          setModalMenuOpen(!modalMenuOpen);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MoreVertical size={24} className="text-gray-500 hover:text-black" />
                      </button>

                      {modalMenuOpen && (
                        // Bumped dropdown z-index up
                        <div className="absolute bottom-full right-0 mb-2 w-36 bg-white border border-gray-100 rounded-xl shadow-2xl z-[100] py-2 overflow-hidden">
                          <button onClick={() => handleEdit(selectedPost)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <Edit2 size={16} /> Edit
                          </button>
                          <button onClick={() => handleDelete(selectedPost._id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* CREATE / EDIT POST MODAL */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex justify-center items-center overflow-y-auto px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
              <button 
                onClick={closeCreateModal} 
                className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h2>
              
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload {mediaType === 'photo' ? 'Image' : 'Video'}
                      {isEditing && " (Leave empty to keep existing media)"}
                    </label>
                    <input 
                      type="file" 
                      accept={mediaType === 'photo' ? 'image/*' : 'video/*'}
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 border rounded-2xl cursor-pointer"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                  <textarea 
                    rows="4"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write something engaging..."
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f0b000] resize-none whitespace-pre-wrap"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isCreating}
                  className="w-full py-3 bg-[#f0b000] text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors disabled:bg-yellow-200 disabled:cursor-not-allowed"
                >
                  {isCreating ? 'Publishing...' : isEditing ? 'Update Post' : 'Publish Post'}
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