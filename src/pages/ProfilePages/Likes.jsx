import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import PostCard from '../../components/PostCard';

const Likes = () => {
  const { allPosts } = useContext(Context);
  const userPosts = allPosts.filter((post) => post.isLiked);
  return (
    <div className='w-full p-1'>
      <div className='px-4 py-2 bg-blue-400 rounded-lg'>
        <p>Your likes are private. Only you can see them.</p>
      </div>
      {
        userPosts.length == 0 ? (
          <div className='text-center text-[#000] text-[18px] font-bold mt-[20px]'>
            <p>You do not like any post.</p>
          </div>
        ) : (
          userPosts.map((post, index) => (
            <PostCard  key={index} post={post}/>
          ))
        )
      }
    </div>
  )
}

export default Likes