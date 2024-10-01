import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import { SaveIcon, GifIcon, StatsIcon } from "../assets/Icons";
import PostCard from "../components/PostCard";

import Avatar from "../assets/avatar.avif";
import { Link } from "react-router-dom";

const Home = () => {
  const { allPosts, setAllPosts } = useContext(Context);
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [body, setBody] = useState("");

  const { users, token } = useContext(Context);

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
      imageUrl: currentUser?.imageUrl ?? Avatar
    };
    setAllPosts([newPost, ...allPosts]);
    e.target.reset();
    setImg(null);
    setImgPreview(null);
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

  return (
    <div className="w-full pb-[20px]">
      <div className="border-[1px] border-y-[#000000]/30 flex items-start px-[20px] py-4 gap-3">
        <Link to={"/profile"}>
          <img
            src={currentUser?.imageUrl ?? Avatar}
            className="rounded-full w-[60px] h-[60px] object-cover"
            alt="user Img"
            width={60}
            height={60}
          />
        </Link>
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
            <div className="mt-3 w-full">
              <img
                className="w-full h-[200px] object-contain"
                src={URL.createObjectURL(img)}
                alt="Selected Image"
                width={"100%"}
                height={200}
              />
            </div>
          )}
        </form>
      </div>
      <div>
        {allPosts.map((post, index) => {
          return <PostCard key={index} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Home;
