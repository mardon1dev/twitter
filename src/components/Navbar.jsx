import React, { useContext, useState } from "react";
import Logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Dots, SaveIcon, StatsIcon, GifIcon } from "../assets/Icons";

import UserImg from "../assets/avatar.avif";

import NavbarLink from "./NavbarLink";
import { Context } from "../context/Context";
import Modal from "./Modal/Modal";

import Avatar from "../assets/avatar.avif";

const Navbar = () => {
  const { navlinks, users, token, openModal, setOpenModal } =
    useContext(Context);
  const navigate = useNavigate();

  const { allPosts, setAllPosts } = useContext(Context);
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [body, setBody] = useState("");

  const currentUser = users.find((usr) => usr.tel === token);

  function handleAddPost(e) {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      body: body,
      image: imgPreview,
      username: currentUser.name,
      likes: 0,
      comments: 0,
      reposts: 0,
      imageUrl: Avatar,
    };
    setAllPosts([newPost, ...allPosts]);
    e.target.reset();
    setImg(null);
    setImgPreview(null);
    setOpenModal(false);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(file);
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleLogOut(e) {
    e.preventDefault();
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    window.location.reload();
  }
  const handleOpenModal = () => {
    setOpenModal(!openModal);
    setImg(null);
    setImgPreview(null);
    setBody("")
  };
  const handleCloseModal = () => {
  setOpenModal(false);
  setImg(null);
  setImgPreview(null);
  setBody("")
 }
  return (
    <div className="w-[25%] h-screen sticky top-0">
      <nav className="px-5 relative h-full">
        <Link className="pt-[31px] block" to="/">
          <img src={Logo} alt="Logo" width={40} height={33} />
        </Link>
        <ul className="flex flex-col gap-y-[10px] mt-[49px]">
          {navlinks.map((item, index) => (
            <NavbarLink item={item} key={index} />
          ))}
        </ul>
        <button
          onClick={handleOpenModal}
          className="block max-w-[200px] w-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/70 text-white font-bold py-[18px] text-center rounded-full mt-[30px]"
        >
          Tweet
        </button>
        <div className="flex justify-start gap-[10px] absolute bottom-5">
          <img
            src={currentUser?.imageUrl ?? UserImg}
            alt="User image"
            className="rounded-full object-cover w-[50px] h-[50px]"
            width={50}
            height={50}
          />
          <div className="flex justify-between items-center gap-10">
            <div>
              <p className="text-[#333] text-[16px] font-bold">
                {currentUser.name}
              </p>
              <p className="text-[#666] text-[14px]">{currentUser.tel}</p>
            </div>
            <button onClick={handleLogOut}>
              <Dots />
            </button>
          </div>
        </div>
      </nav>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <button className="absolute top-2 left-2 text-black rotate-45" onClick={handleCloseModal}>
          <svg
            width="30"
            height="30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            fill="currentColor"
          >
            <g mask="url(#mask0_21_345)">
              <path
                d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </button>
        <form className="w-full" onSubmit={handleAddPost}>
          <textarea
            className="w-full resize-none outline-none"
            name="post"
            id="post"
            cols="10"
            rows="4"
            placeholder="What’s happening"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <div className="flex gap-5">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                name="file"
                id="file"
                onChange={handleImageChange}
              />
              <SaveIcon />
            </label>
            <label className="cursor-pointer">
              <GifIcon />
            </label>
            <label className="cursor-pointer">
              <StatsIcon />
            </label>
          </div>
          <div className="w-full flex justify-end">
            <button
              disabled={body.length == 0 ? true : false}
              className={`max-w-[100px] w-full ${
                body.length == 0 ? " bg-[#1DA1F2]/40" : "bg-[#1DA1F2]/70"
              } hover:bg-[#1DA1F2]/50 text-white font-bold py-[18px] text-center rounded-full`}
            >
              Tweet
            </button>
          </div>
          {img && (
            <div className="mt-5 w-full">
              <img
                className="w-full h-[200px] object-cover rounded-lg"
                src={URL.createObjectURL(img)}
                alt="Selected Image"
                width={"100%"}
                height={200}
              />
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default Navbar;
