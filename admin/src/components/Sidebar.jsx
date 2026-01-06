import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/analytics"
        >
          <img className="w-5 h-5" src={assets.graph} />
          <p className="hidden md:block ">Analytics</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/callqueries"
        >
          <img className="w-5 h-5" src={assets.telephone} />
          <p className="hidden md:block">Call Queries</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/alert"
        >
          <img className="w-5 h-5" src={assets.alert} />
          <p className="hidden md:block">Website alert</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/broadcast"
        >
          <img className="w-5 h-5" src={assets.broadcast} />
          <p className="hidden md:block">broadcast mail</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/resources"
        >
          <img className="w-5 h-5" src={assets.docs} />
          <p className="hidden md:block">Upload circulars</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/resources-video"
        >
          <img className="w-5 h-5" src={assets.docs} />
          <p className="hidden md:block">Upload Video</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
