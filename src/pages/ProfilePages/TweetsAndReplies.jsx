import React from "react";

import "./profilepages.css"

const TweetsAndReplies = () => {
  return (
    <div className="w-full flex items-center justify-center h-[400px] relative">
      <div className="loader z-0 opacity-15">
        <div className="box">
          <div className="logo">
            
          </div>
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
      <div className="absolute z-10 w-full h-full bg-[#fff]/01 px-[20px]">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-[50%] mx-auto text-center">
          <h1 className="text-[#333] text-[20px] font-bold mb-[10px]">Tweets and replies</h1>
          <p className="text-[#333] text-[16px] font-normal mb-[10px]">We are so sorry for misconnection. As soon as possible this page will be loaded and you can see your tweets and replies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetsAndReplies;
