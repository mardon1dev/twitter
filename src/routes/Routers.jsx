import React from "react";
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
  Tweets,
} from "../pages";
import Header from "../components/Header";

const Routers = () => {
  return (
    <div className="flex justify-between">
      <Navbar />
      <div className="w-[60%] border-[1px] border-x-[#000000]/40 relative">
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/more" element={<More />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/tweets" element={<Tweets />} />
          </Routes>
      </div>
      <SideBar />
    </div>
  );
};

export default Routers;
