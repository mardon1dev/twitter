import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import { SaveIcon, GifIcon, StatsIcon } from "../assets/Icons";
import PostCard from "../components/PostCard";

const Home = () => {
  const { allPosts, setAllPosts } = useContext(Context);
  const [img, setImg] = useState(null);

  const {users, token} = useContext(Context);

  const currentUser = users.find(usr => usr.tel === token);

  function handleAddPost(e) {
    e.preventDefault();
    const newPost = {
      id:Date.now(),
      body: e.target.post.value,
      image: img ? URL.createObjectURL(img) : null,
      username: currentUser.name,
      likes: 0,
      comments: 0,
      reposts: 0,
    };
    setAllPosts([newPost, ...allPosts]);
    e.target.reset();
    setImg(null);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  }

  function handleLike(postId) {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  function handleComment(postId) {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  }

  function handleRepost(postId) {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, reposts: post.reposts + 1 } : post
      )
    );
  }

  function randdomImg() {
    return Math.ceil(Math.random() * 100);
  }

  return (
    <div className="w-full pb-[20px]">
      <div className="border-[1px] border-y-[#000000]/30 flex items-start px-[20px] py-4 gap-3">
        <img
          src={`https://picsum.photos/id/${randdomImg()}/300/300`}
          className="rounded-full"
          alt="user Img"
          width={60}
          height={60}
        />
        <form className="w-full" onSubmit={handleAddPost}>
          <textarea
            className="w-full resize-none outline-none"
            name="post"
            id="post"
            cols="10"
            rows="4"
            placeholder="What’s happening"
          ></textarea>
          <div className="flex gap-5">
            <label>
              <input
                type="file"
                className="hidden"
                name="file"
                id="file"
                onChange={handleImageChange}
              />
              <SaveIcon />
            </label>
            <label>
              <GifIcon />
            </label>
            <label>
              <StatsIcon />
            </label>
          </div>
          <div className="w-full flex justify-end">
            <button className="max-w-[100px] w-full bg-[#1DA1F2]/70 hover:bg-[#1DA1F2]/50 text-white font-bold py-[18px] text-center rounded-full">
              Tweet
            </button>
          </div>
          {img && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(img)}
                alt="Selected Image"
                width={100}
                height={100}
              />
            </div>
          )}
        </form>
      </div>
      <div>
        {allPosts.map((post, index) => {
          return (
            <PostCard
              key={index}
              post={post}
              handleLike={() => handleLike(post.id)}
              handleComment={() => handleComment(post.id)}
              handleRepost={() => handleRepost(post.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
