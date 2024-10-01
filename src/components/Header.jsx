import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { BackIcon } from "../assets/Icons";

const Header = () => {
  const { users, token, allPosts } = useContext(Context);
  const currentUser = users.find((usr) => usr.tel === token);
  const userPosts = allPosts.filter((post) => post.username == currentUser.name).length;

  const navigate = useNavigate();

  const location = useLocation();
  const { navlinks } = useContext(Context);
  function formatRoute(route) {
    if (route.includes("profile")) {
      return currentUser.name;
    }
    else{
      const pathName = navlinks.find((item) => item.link === route).text ?? "";
      return pathName;
    } 
  }

  function handleNavigate() {
    navigate(-1);
  }
  return (
    <div className="w-full py-[20px] sticky top-0 left-0 right-0 bg-white border-[1px] border-b-[#000000]/40 px-[20px] -z-0">
      <div>
        {
          formatRoute(location.pathname) == currentUser.name ? 
          
            (
              <div className="flex justify-start gap-[40px] items-center w-full">
                <button className="p-2" onClick={handleNavigate}><BackIcon /></button>
                <div>
                  <h1 className="text-[24px] font-bold">{currentUser.name}</h1>
                  <p className="text-[16px] text-gray-500">{userPosts} posts</p>
                </div>
              </div>
            )
           : 
          (
            <h1 className="text-[24px] font-bold">
            {formatRoute(location.pathname)}
          </h1>
          )
        }
      </div>
    </div>
  );
};

export default Header;
