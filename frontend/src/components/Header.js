import React, { useState } from "react";
import logo from "../assets/mazaltov_logo.png";
import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ReduxLogOut } from "../redux/userSlice";

function Header() {
  const [open, setOpen] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleShowMenu = () => {
    setOpen((prev) => !prev);
  };
  const handleLogOut = () => {
    dispatch(ReduxLogOut());
  };
  const cartItemNumber = useSelector((state) => state.product.cartItem);
  return (
    <header className='fixed w-full bg-white h-16 shadow-md z-50 md:px-4'>
      <nav className='flex items-center justify-between px-4 h-full m-auto'>
        <Link to='/'>
          <div className='h-10'>
            <img
              className='h-full '
              src={logo}
              alt=''
            />
          </div>
        </Link>
        <div className='flex gap-6'>
          <div className='hidden md:flex justify-center items-center gap-5 font-bold'>
            <NavLink to={"home"}>Home</NavLink>
            <NavLink to={"menu"}>Menu</NavLink>
            <NavLink to={"about"}>About</NavLink>
            <NavLink to={"contact"}>Contact</NavLink>
          </div>
          <div className='relative'>
            <Link to={"/cart"}>
              <FaShoppingCart className=' text-2xl cursor-pointer text-gray-700 h-full hover:text-[#2f86c3]' />

              <div className='absolute h-5 w-5 p-2 -top-2 left-3 flex bg-red-500 rounded-[50%] justify-center items-center'>
                <p className='text-white text-sm'>{cartItemNumber.length}</p>
              </div>
            </Link>
          </div>
          <div
            className=' relative'
            onClick={handleShowMenu}>
            <div className='h-9 '>
              {userData.image ? (
                <img
                  alt=''
                  src={userData.image}
                  className='w-full h-full rounded-full cursor-pointer '
                />
              ) : (
                <FaRegUserCircle className=' text-2xl cursor-pointer text-gray-700 h-full hover:text-[#2f86c3]' />
              )}
            </div>
            {open && (
              <div className=' text-sm absolute justify-between drop-shadow-sm shadow-md  rounded-md bg-white text-slate-500 -left-16 top-12'>
                <ul className='flex flex-col'>
                  {userData.email === "admin@gmail.com" ? (
                    <Link
                      to={"newproduct"}
                      className='white whitespace-nowrap hover:bg-slate-700 hover:text-white rounded py-2 px-4 hover:w-full'>
                      New Products
                    </Link>
                  ) : (
                    <Link
                      to={"profile"}
                      className='white whitespace-nowrap hover:bg-slate-700 hover:text-white rounded py-2 px-4 hover:w-full'>
                      View Profile
                    </Link>
                  )}
                  {userData.image ? (
                    <p
                      onClick={handleLogOut}
                      className='hover:bg-red-400 whitespace-nowrap hover:text-white rounded py-2 px-4 hover:w-full'>
                      Log Out
                    </p>
                  ) : (
                    <Link
                      to={"login"}
                      className='hover:bg-slate-700 whitespace-nowrap hover:text-white rounded py-2 px-4 hover:w-full'>
                      Login
                    </Link>
                  )}
                  <div className='flex flex-col md:hidden '>
                    <NavLink
                      className='hover:bg-slate-700 whitespace-nowrap hover:text-white rounded py-2 px-4 hover:w-full'
                      to={"home"}>
                      Home
                    </NavLink>
                    <NavLink
                      className='hover:bg-slate-700 whitespace-nowrap hover:text-white rounded py-2 px-4 hover:w-full'
                      to={"menu"}>
                      Menu
                    </NavLink>
                    <NavLink
                      className='hover:bg-slate-700 whitespace-nowrap hover:text-white rounded py-2 px-4 hover:w-full'
                      to={"about"}>
                      About
                    </NavLink>
                    <NavLink
                      className='hover:bg-slate-700 whitespace-nowrap hover:text-white rounded py-2 px-4 hover:w-full'
                      to={"contact"}>
                      Contact
                    </NavLink>
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
