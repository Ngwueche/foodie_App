import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  RemoveCartItem,
  IncreaseQty,
  DecreaseQty,
} from "../redux/productSlice";
import { useDispatch } from "react-redux";

function CartProduct({ id, image, name, price, category, qty, total }) {
  const dispatch = useDispatch();

  return (
    <div className='py-4  mt-4 bg-white w-full max-w-3xl'>
      <div className='flex gap-4 h-32'>
        <img
          className='h-full rounded-md p-1'
          src={image}
          alt=''
        />

        <div className='flex flex-col px-4 w-full'>
          <div className='flex justify-between w-full '>
            <div className='flex flex-col'>
              <h3 className='font-semibold capitalize text-slate-800 text-lg'>
                {name}
              </h3>
              <p className=' capitalize text-slate-600 text-xl font-medium'>
                {category}
              </p>
              <p className='font-bold capitalize  md:text-xl'>
                <span className=''>₦</span>
                {price}
              </p>
            </div>
            <button
              className='text-2xl '
              onClick={() => dispatch(RemoveCartItem(id))}>
              {" "}
              <RiDeleteBin5Line className='hover:text-red-600' />
            </button>
          </div>
          <div className='flex justify-between mt-4 w-full'>
            <div className='flex gap-3'>
              <button
                onClick={() => dispatch(IncreaseQty(id))}
                className='py-2 px-4 bg-slate-400 hover:bg-slate-500 rounded-md font-semibold'>
                <FaPlus />
              </button>
              <p className=' flex items-center font-semibold'>{qty}</p>
              <button
                className='py-2 px-4 bg-slate-400 hover:bg-slate-500 rounded-md font-semibold'
                onClick={() => dispatch(DecreaseQty(id))}>
                <FaMinus />
              </button>
            </div>
            <div className='flex items-center gap-2 font-bold'>
              <p>Total:</p>
              <p>
                <span className='mr-1'>₦</span>
                {total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
