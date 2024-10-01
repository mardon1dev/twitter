import React, { useContext } from "react";
import { SearchIcon } from "../assets/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { navlinks } = useContext(Context);

  const pathName = location.pathname.includes("profile");

  const trends = [
    { title: "Revolution", tweets: "50.4K Tweets" },
    { title: "Revolution", tweets: "50.4K Tweets" },
    { title: "Revolution", tweets: "50.4K Tweets" },
  ];

  const recommendations = [
    { name: "Mushtariy", handle: "@Mushtar565266" },
    { name: "Shuhratbek", handle: "@mrshukhrat" },
  ];
  return (
    <div className="w-[25%] sticky top-0 right-0 h-screen px-[20px] -z-[1]">
      <div className="relative w-full">
        <span className="absolute top-0 bottom-0 my-auto left-2 flex items-center justify-center w-5 h-5">
          <SearchIcon />
        </span>
        <input
          type="text"
          className="my-[20px] bg-[#F7F9F9] w-full py-2 pl-10 outline-none rounded-full text-[#5C6C79]"
          placeholder="Search Twitter"
        />
      </div>
      <div className={`flex ${pathName ? "flex-col-reverse": "flex-col" } gap-3` }>
        <div className="mb-6 bg-[#F7F9F9] rounded-lg px-2">
          <h2 className="text-lg font-bold">Trends for you</h2>
          {trends.map((trend, index) => (
            <div key={index} className="flex justify-between items-center my-2">
              <div>
                <p className="text-sm font-semibold">{trend.title}</p>
                <p className="text-xs text-gray-500">{trend.tweets}</p>
              </div>
              <button className="text-gray-500">•••</button>
            </div>
          ))}
          <button className="text-blue-500 text-sm">Show more</button>
        </div>

        <div className="bg-[#F7F9F9] rounded-lg p-2">
          <h2 className="text-lg font-bold mb-2">You might like</h2>
          {recommendations.map((user, index) => (
            <div key={index} className="flex justify-between items-center my-2">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.handle}</p>
              </div>
              <button className="bg-gray-600 text-white font-bold px-4 py-1 rounded-full">
                Follow
              </button>
            </div>
          ))}
          <button className="text-blue-500 text-sm">Show more</button>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
        <p>Ads Info</p>
        <p>More</p>
        <p>© 2021 Twitter, Inc.</p>
      </div>
    </div>
  );
};

export default SideBar;
