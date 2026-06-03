import React, { useState, useEffect, useContext, useRef } from 'react';
import { Calendar, ChevronRight, Heart, UserCircle, Plus, X, Image as ImageIcon, Video, Type, MoreVertical, Edit2, Trash2, CheckSquare, MoreHorizontal } from 'lucide-react';
import Swal from 'sweetalert2';
import PageWrapper from '../components/PageWrapper';
import API, { BASE_URL } from "../api";
import { AuthContext } from '../context/AuthContext';
import SafeNavLink from '../components/SafeNavLink';
import { Await } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Hub = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(AuthContext);

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

  // To Handle Highlighting Post from Admin Activity Click
  const location = useLocation();
  const [highlightedPostId, setHighlightedPostId] = useState(null);
  const postCardRefs = useRef({});

  // Fetch posts and user info on mount
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

  // Prevent background scrolling when modal is active
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

  // Handle syncing video time when opening modal
  useEffect(() => {
    if (selectedPost && selectedPost.mediaType === "video" && modalVideoRef.current) {
      modalVideoRef.current.currentTime = selectedPost.initialTime || 0;
      if (selectedPost.isPlaying) {
        modalVideoRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }
  }, [selectedPost]);

  // Handle closing modal and syncing back video time
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

  // Close menus when clicking outside
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

  // Scroll to + highlight a specific post when arriving from Activity Log
  useEffect(() => {
    if (!location.state?.highlightPostId || posts.length === 0) return;

    const targetId = location.state.highlightPostId;
    setHighlightedPostId(targetId);

    // Small delay to let the DOM paint the cards before scrolling
    const scrollTimer = setTimeout(() => {
      const el = postCardRefs.current[targetId];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 350);

    // Stop highlighting after 3.5 seconds
    const clearTimer = setTimeout(() => setHighlightedPostId(null), 3500);

    // Wipe the router state so a hard refresh doesn't re-trigger this
    window.history.replaceState({}, '');

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(clearTimer);
    };
  }, [posts, location.state]);

  // Long-press for mobile to enter selection mode
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

  // Toggle selection of posts
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

  // Bulk Delete
const handleBulkDelete = async () => {
  if (selectedPostIds.length === 0) return;

  // To Confirm Deletion of Multiple Posts
  const { isConfirmed } = await Swal.fire({
    title: `Delete ${selectedPostIds.length} post${selectedPostIds.length > 1 ? 's' : ''}?`,
    text: "All selected posts will be permanently removed.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  });

  if (!isConfirmed) return;

  // To Manage Cancellation & Progress
  const controller = new AbortController();
  let isComplete = false; // Guards against race condition on fast completions

  // To Show Progress & Allow Cancellation
  Swal.fire({
    title: 'Deleting...',
    html: `Removing <b>${selectedPostIds.length}</b> post${selectedPostIds.length > 1 ? 's' : ''}...`,
    showConfirmButton: true,
    confirmButtonText: 'Deleting',
    confirmButtonColor: '#dc2626',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#6b7280',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
      const confirmBtn = Swal.getConfirmButton();
      if (confirmBtn) confirmBtn.style.pointerEvents = 'none';
    },
  }).then(() => {
    // To Abort Deletion
    if (!isComplete) controller.abort();
  });

  // To Perform Deletion
  try {
    const token = localStorage.getItem("token");

    const results = await Promise.allSettled(
      selectedPostIds.map((id) =>
        API.delete(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })
      )
    );

    isComplete = true;

    // To determine which selections succeeded before potential cancellation
    const succeededIds = selectedPostIds.filter((_, i) => results[i].status === 'fulfilled');
    const wasCancelled = controller.signal.aborted;

    if (succeededIds.length > 0) {
      setPosts((prev) => prev.filter((p) => !succeededIds.includes(p._id)));
    }

    if (wasCancelled) {
      if (succeededIds.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Cancelled',
          text: 'No posts were removed.',
          confirmButtonColor: '#f0b000',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        cancelSelectionMode();
        Swal.fire({
          icon: 'warning',
          title: 'Partially Deleted',
          html: `<b>${succeededIds.length}</b> post${succeededIds.length > 1 ? 's were' : ' was'} already deleted before you cancelled.`,
          confirmButtonColor: '#f0b000',
        });
      }
    } else {
      cancelSelectionMode();
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: `${succeededIds.length} post${succeededIds.length > 1 ? 's' : ''} removed.`,
        confirmButtonColor: '#f0b000',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  } catch (err) {
    isComplete = true;
    if (!controller.signal.aborted) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#f0b000',
      });
    }
  }
};


// Single Delete
const handleDelete = async (postId) => {
  setMenuOpenPostId(null);
  setModalMenuOpen(false);

  // To Confirm
  const { isConfirmed } = await Swal.fire({
    title: 'Delete this post?',
    text: "This action cannot be undone.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  });

  if (!isConfirmed) return;

  const controller = new AbortController();
  let isComplete = false;

  // To Show Progress & Allow Cancellation
  Swal.fire({
    title: 'Deleting...',
    text: 'Removing this post...',
    showConfirmButton: true,
    confirmButtonText: 'Deleting',
    confirmButtonColor: '#dc2626',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#6b7280',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
      const confirmBtn = Swal.getConfirmButton();
      if (confirmBtn) confirmBtn.style.pointerEvents = 'none';
    },
  }).then(() => {
    if (!isComplete) controller.abort();
  });

  // To Perform Deletion
  try {
    const token = localStorage.getItem("token");
    await API.delete(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });

    isComplete = true;
    setPosts((prev) => prev.filter((p) => p._id !== postId));
    if (selectedPost?._id === postId) setSelectedPost(null);

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Post has been removed.',
      confirmButtonColor: '#f0b000',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (err) {
    isComplete = true;
    if (controller.signal.aborted) {
      Swal.fire({
        icon: 'info',
        title: 'Cancelled',
        text: 'Deletion was cancelled.',
        confirmButtonColor: '#f0b000',
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete. Please try again.',
        confirmButtonColor: '#f0b000',
      });
    }
  }
};

  // Unified Like Engine (Handles state updates + activity logs safely)
  const handleLike = async (postId, postCaption = "this post") => {
    if (!currentUserId) {
      Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please log in to like posts!',
        confirmButtonColor: '#f0b000'
      });
      return;
    }

    // Find current post status to check if it's a new like or an unlike
    const targetPost = posts.find(p => p._id === postId);
    const hasAlreadyLiked = targetPost?.likes?.some(liker => (liker._id || liker) === currentUserId);

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

      // Trigger Activity logging only if it's a new like action
      if (!hasAlreadyLiked) {
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
        } catch (err) {
          console.error("Failed to parse local storage user for activity feed context:", err);
        }

        const safeText = String(postCaption || "this post");
        const snippet = safeText.length > 40 ? safeText.substring(0, 40) + "..." : safeText;

        await API.post("/activities", {
          user: loggedInUser, 
          action: `liked your post: "${snippet}"`, 
          profilePic: userImage,
          postId: postId 
        });
      }
    } catch (error) {
      console.error("Error toggling love reaction connection:", error);
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
    const MAX_FILE_SIZE = 1073741824; // 1GB limit
    
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
            // "Content-Type": "multipart/form-data" 
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
            // "Content-Type": "multipart/form-data" 
          }
        });
        
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
              
              // Check if post actually contains visual media to display
              const hasMedia = (post.mediaType === "photo" || post.mediaType === "video") && post.url;

              return (
                <div 
                  key={post._id}
                  ref={(el) => (postCardRefs.current[post._id] = el)}
                  onPointerDown={() => handleTouchStart(post._id)}
                  onPointerUp={handleTouchEnd}
                  onPointerLeave={handleTouchEnd}
                  onClick={() => {
                    if (isSelectionMode) toggleSelection(post._id);
                    }}
                  className={`bg-white rounded-2xl shadow-lg flex flex-col transition-all duration-700 border relative 
                    ${isSelectionMode ? 'cursor-pointer' : ''} 
                    ${isSelected ? 'ring-4 ring-red-500 scale-[0.98]' : 'border-gray-100'} 
                    ${isSelectionMode && !isSelected ? 'opacity-70 grayscale-[30%]' : ''}
                    ${highlightedPostId === post._id ? 
                      'ring-1 ring-[#f0b000] bg-yellow-50 animate-pulse' 
                      : ''}
                    `}
                >
                  
                  {/* Dark Overlay When Selected */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-black/50 z-[15] pointer-events-none flex items-center justify-center transition-all">
                      <CheckSquare size={54} className="text-white opacity-90 drop-shadow-lg" />
                    </div>
                  )}

                  {/* INFO SECTION */}
                  <div className={`p-6 pb-4 flex flex-col relative z-20 ${isSelectionMode ? 'pointer-events-none' : ''}`}>
                    
                    {/* Uploaded By & Options Menu */}
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

                      {isAdmin && !isSelectionMode && (
                        <div className="relative post-menu-container z-50">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuOpenPostId(menuOpenPostId === post._id ? null : post._id);
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors z-20"
                          >
                            <MoreHorizontal size={18} className="text-gray-500" />
                          </button>
                          
                          {menuOpenPostId === post._id && (
                            <div className="absolute right-0 top-full mb-2 w-44 bg-white border border-gray-100 rounded-xl shadow-2xl z-[100] py-2 overflow-hidden">
                              <button onClick={(e) => { e.stopPropagation(); setIsSelectionMode(true); setSelectedPostIds([post._id]); setMenuOpenPostId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors rounded-xl">
                                <CheckSquare size={16} /> Select
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); setIsSelectionMode(true); setSelectedPostIds(posts.map(p => p._id)); setMenuOpenPostId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 border-b border-gray-100 pb-3 mb-1 transition-colors rounded-xl">
                                <CheckSquare size={16} className="opacity-50" /> Select All
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); handleEdit(post); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors rounded-xl">
                                <Edit2 size={16} /> Edit
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); handleDelete(post._id); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors rounded-xl">
                                <Trash2 size={16} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Created At & Like Action */}
                    <div className="flex justify-between items-center mb-4 z-40">
                      <div className="flex items-center text-gray-400 text-xs gap-2">
                        <Calendar size={14} />
                        <span>{formatDateTime(post.createdAt)}</span>
                      </div>

                      <div className="relative group flex items-center gap-1 z-40">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(post._id, post.caption);
                          }} 
                          className="focus:outline-none transform transition-transform hover:scale-110 active:scale-75 flex items-center"
                        >
                          <Heart 
                            size={20} 
                            color={isLiked ? "#f0b000" : "#9ca3af"} 
                            fill={isLiked ? "#f0b000" : "transparent"} 
                          />
                        </button>
                        <span className="text-gray-500 text-sm font-semibold">{post.likes?.length || 0}</span>

                        {/* Tooltip List of Likers */}
                        {post.likes && post.likes.length > 0 && typeof post.likes[0] === 'object' && (
                          <div className="absolute top-0 right-10 mb-2 hidden group-hover:block z-[100] w-48 bg-gray-900 text-white shadow-xl rounded-lg border border-gray-700 pointer-events-none">
                            <div className="max-h-40 overflow-y-auto p-2 custom-scrollbar">
                              <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider px-1">Reactions</p>
                              {post.likes.map((liker) => (
                                <div key={liker._id} className="flex items-center gap-2 mb-2 last:mb-0 px-1">
                                  <img src={getHubProfilePic(liker.profilePic, liker.name)} alt={liker.name} className="w-5 h-5 rounded-full object-cover border border-gray-600"/>
                                  <span className="text-xs font-medium truncate">{liker.name}</span>
                                </div>
                              ))}
                            </div>
                            <div className="absolute left-full top-2 right-3 border-[6px] border-transparent border-l-gray-900"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dynamic Caption Space Allotment */}
                    {post.caption && (
                      <p className={`text-gray-700 whitespace-pre-wrap ${hasMedia ? 'line-clamp-3' : 'line-clamp-[13]'} text-sm md:text-base`}>
                        {post.caption}
                      </p>
                    )}
                  </div>

                  {/* Media Content Area */}
                  {post.mediaType === "photo" && post.url && (
                    <div className="h-56 w-full overflow-hidden bg-gray-100 z-10 relative">
                      <img 
                      src={post.url}
                      alt="Post media" 
                      className="w-full h-full cursor-pointer object-cover object-top" 
                      onClick={setSelectedPost.bind(null, post)}
                      />
                    </div>
                  )}
                  {post.mediaType === "video" && post.url && (
                    <div className="h-56 w-full overflow-hidden cursor-pointer bg-black z-10 relative">
                      <video 
                        ref={(el) => (videoRefs.current[post._id] = el)}
                        src={post.url}
                        controls 
                        playsInline
                        className="w-full h-full object-cover" 
                        onClick={(e) => e.stopPropagation()} 
                        onPointerDown={(e) => e.stopPropagation()}
                        onPointerUp={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}

                  {/* Open Post Action */}
                  <div className={`p-6 pt-4 mt-auto z-20 ${isSelectionMode ? 'pointer-events-none' : ''}`}>
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
                      className="flex items-center justify-center gap-2 w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      View Details <ChevronRight size={18} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Modal Overlay View */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/90 z-[100] flex justify-center items-center overflow-y-auto p-4 md:p-8">
            <div className="bg-white rounded-2xl w-full overflow-y-auto md:overflow-hidden relative shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
              
              <button 
                onClick={closePostModal}
                className="fixed top-7 right-1 md:right-16 md:top-14 z-[70] text-gray-500 border border-gray-300 hover:text-black bg-white rounded-full p-1 shadow-md transition-colors"
              >
                <X size={24} />
              </button>

              {/* Modal Media Side */}
              {(selectedPost.mediaType === "photo" || selectedPost.mediaType === "video") && selectedPost.url && (
                <div className="w-full md:w-3/5 bg-black flex items-center justify-center order-2 md:order-1">
                  {selectedPost.mediaType === "photo" ? (
                    <img 
                      src={selectedPost.url} 
                      alt="Full post media" 
                      className="w-full max-h-[90vh] rounded-b-2xl md:rounded-b-none md:rounded-l-2xl object-contain" 
                    />
                  ) : (
                    <video 
                      ref={modalVideoRef}
                      src={selectedPost.url} 
                      controls 
                      playsInline
                      className="w-full max-h-[90vh] cursor-pointer object-contain" 
                    />
                  )}
                </div>
              )}

              {/* Modal Text & Info Side */}
              <div className={`w-full flex flex-col p-6 overflow-y-visible md:overflow-y-auto ${selectedPost.mediaType === "text" ? 'md:w-full' : 'md:w-2/5'} order-1 md:order-2`}>
                
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
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
                  </div>
                </div>

                {/* Date & Like Engine Trigger */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b relative z-30">
                  <p className="text-xs text-gray-500 font-medium">{formatDateTime(selectedPost.createdAt)}</p>

                  <div className="relative group flex items-center gap-1">
                    <button 
                      onClick={() => handleLike(selectedPost._id, selectedPost.caption)} 
                      className="focus:outline-none transform transition-transform active:scale-75"
                    >
                      <Heart 
                        size={28} 
                        color={selectedPost.likes?.some(liker => (liker._id || liker) === currentUserId) ? "#f0b000" : "#9ca3af"} 
                        fill={selectedPost.likes?.some(liker => (liker._id || liker) === currentUserId) ? "#f0b000" : "transparent"} 
                      />
                    </button>
                    <span className="text-gray-700 font-semibold text-base ml-1">{selectedPost.likes?.length || 0}</span>

                    {/* Modal Hover Tooltip */}
                    {selectedPost.likes && selectedPost.likes.length > 0 && typeof selectedPost.likes[0] === 'object' && (
                      <div className="absolute top-0 right-14 mb-2 hidden group-hover:block z-[80] w-52 bg-gray-900 text-white shadow-xl rounded-lg border border-gray-700 pointer-events-none">
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
                              <span className="text-xs font-medium truncate">{liker.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="absolute left-full top-2 right-3 border-[6px] border-transparent border-l-gray-900"></div>
                      </div>
                    )}
                  </div>
                </div>


                {/* Caption & Content */}
                {/* Full Caption inside Modal View */}
                <div className="flex-grow pb-6">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {selectedPost.caption}
                  </p>
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
                      onClick={() => {setMediaType('text'); setFile(null);}}
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


