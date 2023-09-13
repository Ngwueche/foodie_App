import React, { useState } from "react";
import signImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { imageToBAse64 } from "../utility/imageToBAse64";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [showConfirmPassword, showSetConfirmPassword] = useState(false);
  const handleConfirmPassword = () => {
    showSetConfirmPassword((prev) => !prev);
  };
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleProfileImageUpload = async (e) => {
    const data = await imageToBAse64(e.target.files[0]);
    setData((prev) => {
      return { ...prev, image: data };
    });
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = data;
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch("http://localhost:7111/signup", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const dataRes = await fetchData.json();
        console.log(dataRes);
        if (dataRes.alert) {
          toast(dataRes.message);
          return navigate("/login");
        } else {
          toast(dataRes.message);
          return;
        }
      } else {
        toast("password do not match.");
      }
    } else {
      toast("Please fill the required fields.");
    }
  };

  return (
    <div className='flex p-3 md:p-4'>
      <div className='flex flex-col w-full m-auto items-center justify-center max-w-sm bg-white p-4 shadow-md drop-shadow-md rounded-md'>
        <div className='w-20 h-20 object-fit border-2 border-[#ab3838] overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
          <img
            className=''
            src={data.image ? data.image : signImage}
            alt=''
            value={data.image}
          />

          {data.image ? (
            data.image
          ) : (
            <label htmlFor='profileImage'>
              <div className='absolute bottom-0 h-1/3 w-full bg-gray-400 text-center'>
                <p className='text-white p-1 text-sm'>upload</p>
              </div>
              <input
                type='file'
                id='profileImage'
                className='hidden'
                accept='image/*'
                onChange={handleProfileImageUpload}
              />
            </label>
          )}
        </div>
        <form
          action='GET'
          className='w-full p-4'
          onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input
            className='w-full mb-3 bg-slate-200 caret-white rounded px-2 py-1 focus-within:outline-blue-300'
            placeholder='Your First Name'
            name='firstName'
            type='text'
            id='firstName'
            value={data.firstName}
            onChange={handleChange}
          />
          <label htmlFor='lastName'>Last Name</label>
          <input
            className='w-full mb-3 bg-slate-200 caret-white rounded px-2 py-1 focus-within:outline-blue-300'
            placeholder='Your Last Name'
            name='lastName'
            type='text'
            id='lastName'
            value={data.lastName}
            onChange={handleChange}
          />
          <label htmlFor='email'>E-mail</label>
          <input
            className='w-full mb-3 bg-slate-200 caret-white rounded px-2 py-1 focus-within:outline-blue-300'
            placeholder='Your Email Address'
            name='email'
            type='email'
            id='email'
            value={data.email}
            onChange={handleChange}
          />
          <label htmlFor='password'>Password</label>
          <div className='flex mb-3 bg-slate-200 px-2 py-1 focus-within:outline focus-within:outline-blue-300 rounded placeholder:bg-none border'>
            <input
              className=' border-none bg-slate-200 outline-none w-full'
              placeholder='Your Password'
              name='password'
              type={showPassword ? "text" : "password"}
              id='password'
              value={data.password}
              onChange={handleChange}
            />{" "}
            <span
              onClick={handleShowPassword}
              className='flex items-center'>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <label htmlFor='password'>Confirm Password</label>
          <div className='flex mb-3 bg-slate-200 px-2 py-1 focus-within:outline focus-within:outline-blue-300 rounded placeholder:bg-none border'>
            <input
              className=' border-none bg-slate-200 outline-none w-full'
              placeholder='Confirm Password'
              name='confirmPassword'
              type={showConfirmPassword ? "text" : "password"}
              id='confirmPassword'
              value={data.confirmPassword}
              onChange={handleChange}
            />{" "}
            <span
              onClick={handleConfirmPassword}
              className='flex items-center'>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className='w-full text-center my-3 bg-[#ab3838]  hover:bg-[#b44949]  rounded py-2 font-bold text-white'>
            Sign Up
          </button>
        </form>
        <p className='text-md -mt-3'>
          Already have an Account?{" "}
          <span className='underline'>
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
