import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import PostCard from '../../components/PostCard';

const Tweets = () => {
  const { users, token, allPosts } = useContext(Context);
  const currentUser = users.find((usr) => usr.tel === token);
  const userPosts = allPosts.filter((post) => post.username == currentUser.name)  

  return (
    <div className='w-full px-[20px]'>
      {
        userPosts.length == 0 ? (
          <div className='text-center text-[#000] text-[18px] font-bold mt-[20px]'>
            No posts yet!
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

export default Tweets