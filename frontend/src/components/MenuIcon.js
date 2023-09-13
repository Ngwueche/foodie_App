import React from "react";
import { GiKnifeFork } from "react-icons/gi";

const MenuIcon = ({ category, onClick, isActive }) => {
  return (
    <div
      className='cursor-pointer'
      onClick={onClick}>
      <div
        className={`text-3xl p-5 rounded-full ${
          isActive ? "bg-yellow-300" : "bg-yellow-500 "
        }`}>
        <GiKnifeFork />
      </div>
      <p className='font-medium text-center capitalize py-1'>{category}</p>
    </div>
  );
};

export default MenuIcon;
