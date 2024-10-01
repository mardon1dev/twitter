import { createContext, useEffect, useState } from "react";
import {
  HomeIcon,
  ExploreIcon,
  NotificationIcon,
  MessageIcon,
  BookmarksIcon,
  ProfileIcon,
  MoreIcon,
} from "../assets/Icons";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const navlinks = [
    {
      id: 1,
      icon: <HomeIcon />,
      link: "/",
      text: "Home",
    },
    {
      id: 2,
      icon: <ExploreIcon />,
      link: "/explore",
      text: "Explore",
    },
    {
      id: 3,
      icon: <NotificationIcon />,
      link: "/notifications",
      text: "Notifications",
    },
    {
      id: 4,
      icon: <MessageIcon />,
      link: "/messages",
      text: "Messages",
    },
    {
      id: 5,
      icon: <BookmarksIcon />,
      link: "/bookmarks",
      text: "Bookmarks",
    },
    {
      id: 6,
      icon: <ProfileIcon />,
      link: "/profile",
      text: "Profile",
    },
    {
      id: 7,
      icon: <MoreIcon />,
      link: "/more",
      text: "More",
    },
  ];

  const posts = [
    {
      id: 1,
      title: "His mother had always taught him",
      body: "His mother had always taught him not to ever think of himself as better than others...",
      userId: 9,
      username: "john_doe",
      likes: 10,
      views: 200,
      comments: 5,
      reposts: 2,
      tags: ["history", "american", "crime"],
      reactions: 2,
      isLiked: false,
      isReposted: false,
      isCommented: false,
      isBookmarked: false,
      imageUrl: "https://picsum.photos/id/1/300/300"
    },
    {
      id: 2,
      title: "He was an expert but not in a discipline",
      body: "He was an expert but not in a discipline that anyone could fully appreciate...",
      userId: 13,
      username: "jane_smith",
      likes: 15,
      views: 300,
      comments: 8,
      reposts: 1,
      tags: ["french", "fiction", "english"],
      reactions: 2,
      isLiked: false,
      isReposted: false,
      isCommented: false,
      isBookmarked: false,
      imageUrl: "https://picsum.photos/id/1/300/300"
    },
    {
      id: 3,
      title: "Dave watched as the forest burned up on the hill.",
      body: "Dave watched as the forest burned up on the hill, only a few miles from his house...",
      userId: 32,
      username: "nature_lover",
      likes: 25,
      views: 150,
      comments: 10,
      reposts: 3,
      tags: ["magical", "history", "french"],
      reactions: 5,
      isLiked: false,
      isReposted: false,
      isCommented: false,
      isBookmarked: false,
      imageUrl: "https://picsum.photos/id/1/300/300"
    }
  ];

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  localStorage.setItem("users", JSON.stringify(users));

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  localStorage.setItem("token", token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [allPosts, setAllPosts] = useState(() => {
    const savedPosts = localStorage.getItem("allPosts");
    return savedPosts ? JSON.parse(savedPosts) : posts;
  });

  useEffect(() => {
    localStorage.setItem("allPosts", JSON.stringify(allPosts));
  }, [allPosts]);

  const updatePost = (id, updatedData) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, ...updatedData } : post
      )
    );
  };

  // Umumiy modal uchun
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  return (
    <Context.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        token,
        setToken,
        loading,
        setLoading,
        error,
        setError,
        isAdmin,
        setIsAdmin,
        navlinks,
        allPosts,
        setAllPosts,
        updatePost,
        openModal,
        setOpenModal,
        openModalEdit,
        setOpenModalEdit,
      }}
    >
      {children}
    </Context.Provider>
  );
};
