import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReduxLogin } from "../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
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
  const userData = useSelector((state) => state);
  console.log(userData);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch("http://localhost:7111/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataRes = await fetchData.json();
      if (dataRes.alert) {
        toast(userData.user.firstName + dataRes.message);
        dispatch(ReduxLogin(dataRes));
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast(dataRes.error);
      }
    }
  };
  return (
    <div className='flex p-3 md:p-4 '>
      <div className='flex translate-y-[50%]  flex-col m-auto items-center justify-center max-w-sm bg-white p-4 shadow-md drop-shadow-md rounded-md'>
        <form
          action='GET'
          className='w-full p-4'
          onSubmit={handleSubmit}>
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
          <button className='w-full text-center my-3 bg-[#ab3838]  hover:bg-[#b44949]  rounded py-2 font-bold text-white'>
            Sign in
          </button>
        </form>
        <p className='text-md -mt-3'>
          Don't have an Account?{" "}
          <span className='underline'>
            <Link to={"/signup"}>Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
