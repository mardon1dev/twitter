import React, { useContext, useState } from "react";
import BackgroundImage from "../assets/background-image.avif";
import Avatar from "../assets/avatar.avif";
import { Context } from "../context/Context";
import {
  BirthdayIcon,
  JoinedIcon,
  LinkIcon,
  LocationIcon,
} from "../assets/Icons";
import { Link, Outlet } from "react-router-dom";
import Modal from "../components/Modal/Modal";

const Profile = () => {
  const { users,setUsers, token,setToken, allPosts, openModalEdit, setOpenModalEdit } = useContext(Context);
  const currentUser = users.find((usr) => usr.tel === token);
  const userPosts = allPosts.filter((post) => post.username === currentUser.name)

  const [currentPage, setCurrentPage] = useState("tweets");
  const [backgroundImageEdit, setBackgroundImageEdit] = useState(
    currentUser?.backgroundImage ?? BackgroundImage
  );
  const [avatarEdit, setAvatarEdit] = useState(currentUser?.imageUrl ?? Avatar);
  const [name, setName] = useState(currentUser?.name ?? "");
  const [tel, setTel] = useState(currentUser?.tel ?? "");
  const [location, setLocation] = useState(currentUser?.location ?? "");
  const [birthday, setBirthday] = useState(currentUser?.birthday ?? "");
  const [bio, setBio] = useState(currentUser?.bio ?? "Student at Najot Ta'lim");
  const [link, setLink] = useState(currentUser?.link ?? "");

  const handleOpenModal = () => {
    setOpenModalEdit(true);
  };

  function handleChangeBackgroundImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBackgroundImageEdit(reader.result);
    };
    reader.onerror = () => {
      console.error("An error occurred reading the file");
    };
    reader.readAsDataURL(file);
  }

  function handleChangeAvatar(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarEdit(reader.result);
    };
    reader.onerror = () => {
      console.error("An error occurred reading the file");
    };
    reader.readAsDataURL(file);
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    if (!name || !tel || !bio) {
      alert("Please complete all the required fields.");
      return;
    }
    const updatedUser = {
      ...currentUser,
      backgroundImage: backgroundImageEdit,
      imageUrl: avatarEdit,
      name: name,
      tel: tel,
      location: location,
      birthday: birthday,
      bio: bio,
      link: link,
    };
    const updatedUsers = users.map(user =>
      user.tel === currentUser.tel ? updatedUser : user
    );
    setUsers(updatedUsers);
    userPosts.map((post)=>post.username = name);
    setOpenModalEdit(false);
    e.target.reset();
    setToken(tel)
  }

  function handleCLearModal(e) {
    e.preventDefault();
    setOpenModalEdit(false);  
    setAvatarEdit(currentUser?.imageUrl ?? Avatar);
    setBackgroundImageEdit(currentUser?.backgroundImage ?? BackgroundImage);
    setName(currentUser?.name ?? "");
    setTel(currentUser?.tel ?? "");
    setLocation(currentUser?.location ?? "");
    setBirthday(currentUser?.birthday ?? "");
    setBio(currentUser?.bio ?? "");
    setLink(currentUser?.link ?? "");
  }

  return (
    <div className="w-full pb-[20px] -z-[3]">
      <div className="w-full -z-10">
        <img
          className="w-full h-[280px]"
          src={currentUser?.backgroundImage ?? BackgroundImage}
          alt="Background iamge"
          width={"100%"}
          height={280}
        />
      </div>
      <div className="w-full px-[20px] flex items-end justify-between -mt-[75px]">
        <div className="flex items-center justify-center p-2 bg-white rounded-full">
          <img
            className="rounded-full w-[150px] h-[150px] object-cover"
            src={currentUser?.imageUrl ?? Avatar}
            alt="user image"
            width={150}
            height={150}
          />
        </div>
        <button
          onClick={handleOpenModal}
          className="py-[10px] px-[15px] rounded-[50px] border-[2px] border-[#000000]/60 font-semibold text-lg mb-[11px]"
        >
          Edit profile
        </button>
      </div>
      <div className="w-full px-[20px] mt-[10px] flex flex-col gap-[15px]">
        <h1 className="text-[24px] font-bold text-[#000000]">
          {currentUser?.name}
        </h1>
        <p className="text-[16px] font-semibold text-[#000000]">
          {currentUser?.tel ? currentUser?.tel : "Your phone number"}
        </p>
        <p className="text-[16px] font-semibold text-[#000000]">
          {currentUser?.bio ? currentUser?.bio : "Student at Najot Ta'lim"}
        </p>
        <ul className="flex items-center justify-between">
          {currentUser?.location && (
            <li className="flex items-center gap-[5px]">
              <LocationIcon className="w-[20px] h-[20px]" />
              {currentUser?.location}
            </li>
          )}
          {currentUser?.link && (
            <li className="flex items-center justify-start min-w-[20%] gap-2">
              <span>{<LinkIcon />}</span>
              <Link to="https://t.me/mardonbekdusbekov" target="_blank">
                <span className="text-blue-500">
                  {currentUser?.link ?? "https://t.me/mardonbekdusbekov"}
                </span>
              </Link>
            </li>
          )}
          {currentUser?.birthday && (
            <li className="flex items-center justify-start min-w-[20%] gap-2">
              <span>{<BirthdayIcon />}</span>
              <span>{currentUser?.birthday ?? "January 1 2003"}</span>
            </li>
          )}
          {currentUser?.registrationTime && (
            <li className="flex items-center justify-start min-w-[20%] gap-2">
              <span>{<JoinedIcon />}</span>
              <span>{currentUser?.registrationTime}</span>
            </li>
          )}
        </ul>
        <ul className="flex items-center justify-start gap-5">
          <li className="flex items-center gap-1">
            <span className="font-bold">
              {currentUser?.following ? currentUser?.following : "0"}
            </span>
            <span>Following</span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-bold">
              {currentUser?.followers ? currentUser?.followers : "0"}
            </span>
            <span>Followers</span>
          </li>
        </ul>
      </div>
      <ul className="w-full flex items-center justify-between mt-[40px] border-b-[1px] border-[#000]/50">
        <li className="hover:bg-gray-200 w-[25%] flex items-center justify-center">
          <Link
            id="tweets"
            onClick={(e) => setCurrentPage(e.target.id)}
            to={"/profile"}
            className="w-full flex items-center justify-center"
          >
            <span
              id="tweets"
              onClick={(e) => setCurrentPage(e.target.id)}
              className={`block font-normal text-[#000] text-lg leading-[23px] pb-[16px] pt-1 relative after:absolute after:w-full after:h-[5px] after:bg-[#1DA1F2] after:bottom-0  overflow-hidden after:rounded ${
                currentPage == "tweets" ? "after:left-0" : "after:-left-[100%]"
              }`}
            >
              Tweets
            </span>
          </Link>
        </li>
        <li className="hover:bg-gray-200 w-[25%] flex items-center justify-center">
          <Link
            id="tweets-replies"
            onClick={(e) => setCurrentPage(e.target.id)}
            to={"tweets-replies"}
            className="w-full flex items-center justify-center"
          >
            <span
              id="tweets-replies"
              onClick={(e) => setCurrentPage(e.target.id)}
              className={`block font-normal text-[#000] text-lg leading-[23px] pb-[16px] pt-1 relative after:absolute after:w-full after:h-[5px] after:bg-[#1DA1F2] after:bottom-0  overflow-hidden after:rounded ${
                currentPage == "tweets-replies"
                  ? "after:left-0"
                  : "after:-left-[100%]"
              }`}
            >
              Tweets & replies
            </span>
          </Link>
        </li>
        <li className="hover:bg-gray-200 w-[25%] flex items-center justify-center">
          <Link
            id="media"
            onClick={(e) => setCurrentPage(e.target.id)}
            to={"media"}
            className="w-full flex items-center justify-center"
          >
            <span
              id="media"
              onClick={(e) => setCurrentPage(e.target.id)}
              className={`block font-normal text-[#000] text-lg leading-[23px] pb-[16px] pt-1 relative after:absolute after:w-full after:h-[5px] after:bg-[#1DA1F2] after:bottom-0  overflow-hidden after:rounded ${
                currentPage == "media" ? "after:left-0" : "after:-left-[100%]"
              }`}
            >
              Media
            </span>
          </Link>
        </li>
        <li className="hover:bg-gray-200 w-[25%] flex items-center justify-center">
          <Link
            id="likes"
            onClick={(e) => setCurrentPage(e.target.id)}
            to={"likes"}
            className="w-full flex items-center justify-center"
          >
            <span
              id="likes"
              onClick={(e) => setCurrentPage(e.target.id)}
              className={`block font-normal text-[#000] text-lg leading-[23px] pb-[16px] pt-1 relative after:absolute after:w-full after:h-[5px] after:bg-[#1DA1F2] after:bottom-0  overflow-hidden after:rounded ${
                currentPage == "likes" ? "after:left-0" : "after:-left-[100%]"
              }`}
            >
              Likes
            </span>
          </Link>
        </li>
      </ul>
      <Outlet />

      <Modal openModal={openModalEdit} setOpenModal={setOpenModalEdit}>
        <form
          className="w-full h-[80vh] overflow-y-scroll relative form-update"
          autoComplete="off"
          onSubmit={handleSubmitEdit}
        >
          <div className="w-full flex items-center justify-between sticky bg-white top-0 left-0 py-2">
            <button
              type="button"
              onClick={handleCLearModal}
              className="py-2 px-4 text-[16px] text-red-500  hover:bg-red-700 rounded border-[1px] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 text-[16px] text-blue-600 hover:bg-blue-700 rounded border-[1px] hover:text-white"
            >
              Save
            </button>
          </div>
          <div className="w-full">
            <label htmlFor="file">
              <input
                type="file"
                id="file"
                name="file"
                className="hidden"
                onChange={handleChangeBackgroundImage}
              />
              <img
                className="w-full h-[180px]"
                src={backgroundImageEdit}
                alt="Background image"
                width={"100%"}
                height={180}
              />
            </label>
          </div>
          <div className="w-full px-[20px] flex items-end justify-between -mt-[50px]">
            <div className="flex items-center justify-center p-1 bg-white rounded-full">
              <label htmlFor="avatar">
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  className="hidden"
                  onChange={handleChangeAvatar}
                />
                <img
                  className="rounded-full w-[100px] h-[100px] object-cover"
                  src={avatarEdit}
                  alt="user image"
                  width={100}
                  height={100}
                />
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="name" className="w-full flex flex-col mt-2">
              <span className="text-[16px] font-semibold mb-1">Name</span>
              <input
                className="outline-none shadow border-[1px] border-[#000]/30 py-2 px-3 rounded"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="phone" className="w-full flex flex-col mt-2">
              <span className="text-[16px] font-semibold mb-1">Phone</span>
              <input
                className="outline-none shadow border-[1px] border-[#000]/30 py-2 px-3 rounded"
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </label>
            <label htmlFor="bio" className="w-full flex flex-col mt-2">
              <span className="text-[16px] font-semibold mb-1">Bio</span>
              <textarea
                className="outline-none shadow border-[1px] border-[#000]/30 py-2 px-3 rounded resize-none"
                type="text"
                name="bio"
                id="bio"
                placeholder="About you"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </label>
            <label htmlFor="location" className="w-full flex flex-col mt-2">
              <span className="text-[16px] font-semibold mb-1">Location</span>
              <input
                className="outline-none shadow border-[1px] border-[#000]/30 py-2 px-3 rounded"
                type="text"
                name="location"
                id="location"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <label htmlFor="link" className="w-full flex flex-col mt-2">
              <span className="text-[16px] font-semibold mb-1">Link</span>
              <input
                className="outline-none shadow border-[1px] border-[#000]/30 py-2 px-3 rounded"
                type="text"
                name="link"
                id="link"
                placeholder="Any social link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </label>
            <label htmlFor="birthday" className="w-full flex flex-col mt-2">
              <span className="text-[16px] font-semibold mb-1">Birthday</span>
              <input
                className="outline-none shadow border-[1px] border-[#000]/30 py-2 px-3 rounded"
                type="date"
                name="birthday"
                id="birthday"
                placeholder="Enter your birthday date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
