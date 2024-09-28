import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../context/Context";

const Header = () => {
  const location = useLocation();
  const { navlinks } = useContext(Context);
  function formatRoute(route) {
    console.log(route);
    return navlinks.find((item) => item.link === route).text ?? "";
  }
  return (
    <div className="w-full py-[20px] sticky top-0 left-0 right-0 bg-white border-[1px] border-b-[#000000]/40 px-[20px]">
      <div>
        <h1 className="text-[24px] font-bold">
          {formatRoute(location.pathname)}
        </h1>
      </div>
    </div>
  );
};

export default Header;
