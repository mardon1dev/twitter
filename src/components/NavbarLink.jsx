import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLink = ({item}) => {
  return (
    <li className="nav-item hover:bg-[#333]/10 rounded-lg" key={item.id}>
      <NavLink
        className="w-full text-lg font-semibold leading-6 flex items-center gap-4 p-2"
        to={item.link}
      >
        <span className="">{item.icon}</span>
        <span className="ml-2">{item.text}</span>
      </NavLink>
    </li>
  );
};

export default NavbarLink;
