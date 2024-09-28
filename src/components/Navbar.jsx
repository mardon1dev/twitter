import React, { useContext, useState } from "react";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import {
  Dots
} from "../assets/Icons";

import UserImg from "../assets/bobur.png";

import NavbarLink from "./NavbarLink";
import { Context } from "../context/Context";

const Navbar = () => {
    const {navlinks} = useContext(Context)

  const {users, token} = useContext(Context);

  const currentUser = users.find(usr => usr.tel === token);

  function handleLogOut (e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    window.location.reload();
  }

  return (
    <div className="w-[25%] h-screen sticky top-0 left-0">
      <nav className="px-5 relative h-full">
        <Link className="pt-[31px] block" to="/">
          <img src={Logo} alt="Logo" width={40} height={33} />
        </Link>
        <ul className="flex flex-col gap-y-[30px] mt-[49px]">
          {navlinks.map((item, index) => (
            <NavbarLink item={item} key={index} />
          ))}
        </ul>
        <Link
          to={"/tweet"}
          className="block max-w-[200px] bg-[#1DA1F2] hover:bg-[#1DA1F2]/70 text-white font-bold py-[18px] text-center rounded-full mt-[30px]"
        >
          Tweet
        </Link>
        <div className="flex justify-start gap-[10px] absolute bottom-5">
          <img
            src={UserImg}
            alt="User image"
            className="rounded-full"
            width={50}
            height={50}
          />
          <div className="flex justify-between items-center gap-10">
            <div>
              <p className="text-[#333] text-[16px] font-bold">{
                currentUser.name
              }</p>
              <p className="text-[#666] text-[14px]">{
                currentUser.tel
              }</p>
            </div>
            <button onClick={handleLogOut}><Dots /></button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
