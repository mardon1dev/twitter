import React, { useState } from "react";
import UserLogo from "../assets/bobur.png"
import { LikeIcon, CommentIcon, ReplyIcon, Dots } from "../assets/Icons";

const PostCard = ({ post, handleLike, handleComment, handleRepost }) => {

  return (
    <div className="w-full border-b border-gray-300 px-4 py-2">
      <div className="flex items-center p-4">
        <img
          className="rounded-full"
          src={UserLogo}
          width={60}
          height={60}
          alt="Profile Picture"
        />
        <div className="ml-3 flex items-center gap-2 justify-between w-full">
          <h2 className="text-sm font-medium text-gray-900">{post.username}</h2>
          <button><Dots /></button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700 text-base">{post.body}</p>
      </div>
      <div>
        {
            post.image ? (
                <img src={post.image} alt="post image" className="w-full h-64 object-cover" />
             ) : (
                <></>
             )
        }
      </div>
      <div className="flex justify-evenly items-center px-4 pt-4">
        <button className="flex items-center gap-2" onClick={handleLike}>
          <LikeIcon />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-2" onClick={handleComment}>
          <CommentIcon />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-2" onClick={handleRepost}>
          <ReplyIcon />
          <span>{post.reposts}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
