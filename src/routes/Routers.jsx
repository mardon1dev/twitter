import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import {
  Explore,
  Bookmarks,
  Home,
  Messages,
  More,
  Notifications,
  Profile,
} from "../pages";
import Header from "../components/Header";
import { TweetsAndReplies, Likes, Media, Tweets } from "../pages/ProfilePages";
import { Context } from "../context/Context";

const Routers = () => {
  const { openModal, openModalEdit } = useContext(Context);
  function findModal() {
    if (openModal) return openModal;
    if (openModalEdit) return !openModalEdit;
  }
  return (
    <div className="flex justify-between">
      <Navbar />
      <div
        className={`w-[60%] border-[1px] border-x-[#000000]/40 relative ${
          findModal()
            ? "-z-[2] h-screen overflow-hidden"
            : `z-1 ${openModalEdit ? "h-screen overflow-hidden" : ""} `
        } `}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<Tweets />} />{" "}
            <Route path="tweets-replies" element={<TweetsAndReplies />} />
            <Route path="media" element={<Media />} />
            <Route path="likes" element={<Likes />} />
          </Route>
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/more" element={<More />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
      <SideBar />
    </div>
  );
};

export default Routers;
