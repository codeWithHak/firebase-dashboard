import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  FileText,
  Settings,
  LogOut,
  Edit,
  Trash,
  Plus,
} from "lucide-react";
import { auth, db } from "./auth";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Dashboard() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("posts");

  // State to track if the mobile sidebar is open
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State to track if the popup is open
  const [showPopup, setShowPopup] = useState(false);

  // State to store the title and content of a post
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // State to store all user posts
  const [userPosts, setUserPosts] = useState([]);

  // State to track if the popup is in edit mode
  const [isEdit, setIsEdit] = useState(false);

  // State to store the post being edited
  const [editingPost, setEditingPost] = useState(null);

  const user = auth.currentUser;

  // Toggle the sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Toggle the popup
  const togglePopup = () => {
    setContent("");
    setTitle("");
    setShowPopup(!showPopup);
    if (!showPopup) {
      setIsEdit(false); // Reset edit mode when opening the popup
      setEditingPost(null); // Reset editing post
    }
  };

  // Open the popup in edit mode and set the post data
  const toggleEditPopup = (post) => {
    setShowPopup(true);
    setContent(post.content);
    setTitle(post.title);
    setIsEdit(true);
    setEditingPost(post); // Store the post being edited
  };

  // Handle publishing a new post
  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Posts"), {
        author: user.displayName,
        title: title,
        content: content,
        createdAt: new Date(),
        uid: user.uid,
      });
      setContent("");
      setTitle("");
      setShowPopup(false);
      await fetchPosts(); // Refresh the posts list
    } catch (err) {
      alert("Error publishing post:", err);
    }
  };

  // Handle updating an existing post
  const handlePublishEditedDoc = async (e) => {
    e.preventDefault();
    if (!editingPost) return; // Ensure editingPost is defined

    try {
      const postRef = doc(db, "Posts", editingPost.id); // Use editingPost.id
      await updateDoc(postRef, {
        title: title,
        content: content,
      });
      setShowPopup(false);
      setIsEdit(false);
      setEditingPost(null); // Reset editing post
      await fetchPosts(); // Refresh the posts list
    } catch (err) {
      alert("Error updating post:", err);
    }
  };

  // Handle deleting a post
  const handleDeleteDoc = async (postId) => {
    try {
      await deleteDoc(doc(db, "Posts", postId));
      setUserPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
    } catch (err) {
      alert("Error deleting post:", err);
    }
  };

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      const fetchData = await getDocs(collection(db, "Posts"));
      const showData = fetchData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toLocaleString(), // Convert Timestamp to readable format
      }));
      setUserPosts(showData);
    } catch (err) {
      alert("Error fetching posts:", err);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-purple-600 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-gradient-to-b from-purple-500 to-indigo-600 text-white fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
        </div>
        <nav className="mt-8">
          <a
            href="#"
            className={`flex items-center py-2 px-4 ${
              activeTab === "posts" ? "bg-white bg-opacity-10" : ""
            }`}
            onClick={() => {
              setActiveTab("posts");
              setIsSidebarOpen(false);
            }}
          >
            <FileText className="mr-3 h-5 w-5" />
            Posts
          </a>
          <a
            href="#"
            className={`flex items-center py-2 px-4 hover:bg-white hover:bg-opacity-10 ${
              activeTab === "settings" ? "bg-white bg-opacity-10" : ""
            }`}
            onClick={() => {
              setActiveTab("settings");
              setIsSidebarOpen(false);
            }}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </a>
          <a
            href="#"
            className={`flex items-center py-2 px-4 hover:bg-white hover:bg-opacity-10 ${
              activeTab === "logout" ? "bg-white bg-opacity-10" : ""
            }`}
            onClick={() => {
              setActiveTab("logout");
              setIsSidebarOpen(false);
            }}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-0">
              Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-lg md:text-xl">
                Hello, {user.displayName.split(" ")[0]}
              </p>
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {activeTab === "posts" && (
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0">
                  Your Posts
                </h2>
                <button
                  className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 w-full md:w-auto"
                  onClick={togglePopup}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  New Post
                </button>
              </div>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {userPosts.length > 0 ? (
                    userPosts.map((post) => (
                      <li key={post.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-purple-600 truncate">
                              {post.title}
                            </h3>
                            <div className="ml-2 flex-shrink-0 flex">
                              <button
                                onClick={() => toggleEditPopup(post)}
                                className="mr-2 p-1 rounded-full text-purple-600 hover:bg-purple-100"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteDoc(post.id)}
                                className="p-1 rounded-full text-red-600 hover:bg-red-100"
                              >
                                <Trash className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {post.content}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">
                            Published on {post.createdAt}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className="p-2">
                      <p className="text-xl pb-1 font-semibold">No Posts Yet</p>
                      <p>
                        Click on{" "}
                        <span
                          className="text-purple-600  cursor-pointer"
                          onClick={togglePopup}
                        >
                          New Post
                        </span>
                        , to create your first post
                      </p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="text-xl">Under Development....</div>
          )}
          {/* {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        placeholder="John Doe"
                        defaultValue={user.displayName}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        placeholder="john@example.com"
                        defaultValue={user.email}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </main>
      </div>

      {/* New Post Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600">
              <h2 className="text-2xl font-bold text-white">
                {isEdit ? "Edit Post" : "Create New Post"}
              </h2>
            </div>
            <div className="p-4">
              <form
                className="space-y-4"
                onSubmit={isEdit ? handlePublishEditedDoc : handlePublish}
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    name="content"
                    id="content"
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Write your post content here..."
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={togglePopup}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {isEdit ? "Save" : "Publish"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
