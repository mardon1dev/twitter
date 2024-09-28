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
    },
    {
      id: 4,
      title: "The paper was blank.",
      body: "The paper was blank. There was absolutely nothing on it, not even a watermark...",
      userId: 1,
      username: "writer_gal",
      likes: 5,
      views: 100,
      comments: 2,
      reposts: 0,
      tags: ["fiction", "magical", "english"],
      reactions: 1,
    },
    {
      id: 5,
      title: "They rushed out the door.",
      body: "They rushed out the door. Their parents yelled at them to stop and come back...",
      userId: 6,
      username: "adventure_time",
      likes: 20,
      views: 250,
      comments: 6,
      reposts: 4,
      tags: ["fiction", "english", "classic"],
      reactions: 2,
    },
    {
      id: 6,
      title: "Standing out in a crowd",
      body: "Standing out in a crowd is not something one should aspire to do...",
      userId: 29,
      username: "unique_perspective",
      likes: 8,
      views: 80,
      comments: 1,
      reposts: 1,
      tags: ["fiction", "classic", "literature"],
      reactions: 0,
    },
    {
      id: 7,
      title: "She wanted rainbow hair",
      body: "She wanted rainbow hair. She had wanted it for so long that it seemed as if it would be...",
      userId: 19,
      username: "colorful_world",
      likes: 12,
      views: 120,
      comments: 3,
      reposts: 2,
      tags: ["literature", "english", "american"],
      reactions: 1,
    },
    {
      id: 8,
      title: "The book is in front of the table",
      body: "The book is in front of the table. He was curious about why it was there...",
      userId: 4,
      username: "curious_reader",
      likes: 17,
      views: 220,
      comments: 7,
      reposts: 3,
      tags: ["magical", "crime", "history"],
      reactions: 3,
    },
    {
      id: 9,
      title: "A mysterious lady in white",
      body: "She was a mysterious lady in white. There was something about her that everyone...",
      userId: 23,
      username: "mystery_scribe",
      likes: 14,
      views: 180,
      comments: 4,
      reposts: 0,
      tags: ["american", "classic", "magical"],
      reactions: 1,
    },
    {
      id: 10,
      title: "He looked at the stars",
      body: "He looked at the stars. They were so bright and beautiful...",
      userId: 33,
      username: "star_gazer",
      likes: 30,
      views: 500,
      comments: 12,
      reposts: 5,
      tags: ["history", "literature", "american"],
      reactions: 4,
    },
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
        updatePost
      }}
    >
      {children}
    </Context.Provider>
  );
};
