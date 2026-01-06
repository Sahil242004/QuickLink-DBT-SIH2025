import React from "react";
import { assets } from "../assets/assets.js";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = ({ setToken }) => {
  const logout = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/admin/logout",
        {}, // empty body
        { withCredentials: true } // send cookies
      );
      if (response.data.success) {
        setToken(""); // clear global state
        toast.success("Logged out");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Logout failed");
    }
  };
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(13%,80px)]" src={assets.dbtlogo} />
      <button
        onClick={() => {
          logout();
        }}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};
export default Navbar;
