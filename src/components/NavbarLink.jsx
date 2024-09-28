import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLink = ({item}) => {
  return (
    <li className="nav-item" key={item.id}>
      <NavLink
        className="text-lg font-semibold leading-6 flex items-center gap-4"
        to={item.link}
      >
        {item.icon}
        <span className="ml-2">{item.text}</span>
      </NavLink>
    </li>
  );
};

export default NavbarLink;
