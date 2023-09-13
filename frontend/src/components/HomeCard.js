import React from "react";
import { Link } from "react-router-dom";

function HomeCard({ image, name, price, category, loading, id }) {
  return (
    <div className='w-40 h-[250px] bg-white hover:shadow-lg shadow-md flex flex-col p-2 items-center'>
      {name ? (
        <>
          <Link to={`/menu/${id}`}>
            <div className='w-40 h-[60%] min-h-[150px] p-2 flex items-center overflow-hidden'>
              <img
                className='w-full object-cover'
                src={image}
                alt=''
              />
            </div>
            <h3 className='font-semibold capitalize text-slate-800 text-lg'>
              {name}
            </h3>
            <p className=' capitalize text-slate-600 text-lg font-medium'>
              {category}
            </p>
            <p className='font-bold capitalize  text-lg'>
              <span className='text-red-500'>₦</span>
              {price}
            </p>
          </Link>
        </>
      ) : (
        <p className='flex items-center justify-center font-semibold h-full'>
          {loading}
        </p>
      )}
    </div>
  );
}

export default HomeCard;
