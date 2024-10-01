import React, { useContext } from "react";
import UserLogo from "../assets/bobur.png"
import { LikeIcon, LikedIcon, CommentIcon, ReplyIcon, Dots } from "../assets/Icons";
import { Context } from "../context/Context";

import "./postcard.css"

const PostCard = ({ post }) => {

  const {setAllPosts} = useContext(Context);
  function handleLike() {
    const updatedPost = {
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    };
    setAllPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
    );
  }
  function handleComment(){
    const updatedPost = {
      ...post,
      isCommented: !post.isCommented,
      comments: post.isCommented ? post.comments - 1 : post.comments + 1,
    };
    setAllPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
    );
  }
  function handleRepost(){
    const updatedPost = {
      ...post,
      isReposted: !post.isReposted,
      reposts: post.isReposted ? post.reposts - 1 : post.reposts +1
      };
    setAllPosts((prevPosts) =>
    prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
    );
  }

  return (
    <div className="w-full border-b border-gray-300 px-4 py-2">
      <div className="flex items-center p-4">
        <img
          className="rounded-full w-[60px] h-[60px] object-cover"
          src={post.imageUrl}
          width={60}
          height={60}
          alt="Profile Picture"
        />
        <div className="ml-3 flex items-center gap-2 justify-between w-full">
          <h2 className="text-sm font-medium text-gray-900">{post.username}</h2>
          <button className="p-2" ><Dots /></button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700 text-base">{post.body}</p>
      </div>
      <div>
        {
            post.image ? (
                <img src={post.image} alt="post image" className="w-full h-64 object-cover rounded-lg" />
             ) : (
                <></>
             )
        }
      </div>
      <div className="flex justify-start gap-[100px] items-center px-4 pt-4">
        <button className={`flex items-center gap-2 ${post.isLiked ? "text-red-500": ""} post-liked `} onClick={handleLike}>
          <div className="post-liked-img p-[5px]">
          {
            post.isLiked ? <LikedIcon/> : <LikeIcon/>
          }
          </div>
          <span>{post.likes}</span>
        </button>
        <button className={`flex items-center gap-2 hover:text-blue-300 ${post.isCommented ? "text-blue-500": ""}`} onClick={handleComment}>
          <CommentIcon />
          <span>{post.comments}</span>
        </button>
        <button className={`flex items-center gap-2 hover:text-green-300 ${post.isReposted ? "text-green-500" : ""}`} onClick={handleRepost}>
          <ReplyIcon />
          <span>{post.reposts}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
