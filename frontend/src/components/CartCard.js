import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AddCartItem } from "../redux/productSlice";

function CartCard({ image, name, price, category, loading, id }) {
  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    dispatch(
      AddCartItem({
        _id: id,
        image: image,
        price: price,
        name: name,
        category: category,
      })
    );
  };
  return (
    <div className='w-40 min-w-[200px] max-w-[200px] bg-white rounded-md hover:shadow-xl shadow-md flex flex-col p-2 items-center whitespace-nowrap overflow-hidden'>
      {image ? (
        <>
          <Link to={`/menu/${id}`}>
            <div className='w-40 h-[70%]  min-h-[200px] max-h-[200px] p-2 flex items-center overflow-hidden'>
              <img
                className=' w-full object-cover'
                src={image}
                alt={name}
              />
            </div>
            <div className='flex flex-col items-center justify-center whitespace-nowrap overflow-hidden'>
              <h3 className='font-semibold capitalize text-slate-600 text-lg'>
                {name}
              </h3>
              <p className=' capitalize text-slate-600 text-lg font-medium'>
                {category}
              </p>
              <p className='font-bold capitalize  text-lg'>
                <span className='text-red-500'>₦</span>
                {price}
              </p>
            </div>
          </Link>
          <button
            className='w-full bg-yellow-500 font-semibold py-1 my-1'
            onClick={handleAddToCart}>
            Add to Cart
          </button>
        </>
      ) : (
        <p className='flex items-center justify-center font-semibold h-full min-h-[150px]'>
          {loading}
        </p>
      )}
    </div>
  );
}

export default CartCard;
