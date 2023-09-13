import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MenuIcon from "../components/MenuIcon";
import CartCard from "../components/CartCard";
import { AddCartItem } from "../redux/productSlice";

function Menu() {
  const [filterBy, setFilterBy] = useState("");
  const { filter } = useParams();
  const productList = useSelector((state) => state.product.productList);

  const [dataFilter, setDataFilter] = useState([productList]);
  const getProduct = productList.filter((e) => e._id === filter)[0];
  console.log(getProduct);

  const getCategory = [...new Set(productList.map((e) => e.category))];

  const filterByCategory = (category) => {
    const filter = productList.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
    setFilterBy(category);
    setDataFilter(() => {
      return [...filter];
    });
  };
  const handleAddToCart = (e) => {
    dispatch(AddCartItem(getProduct));
  };
  const dispatch = useDispatch();
  return (
    <div className='p-2 md:p-4'>
      <div className='flex md:flex-row bg-white items-center justify-center gap-4 mx-auto'>
        <div className='w-1/2 flex items-center justify-center'>
          <img
            className='h-full '
            src={getProduct.image}
            alt=''
          />
        </div>
        <div className='flex flex-col py-4  mt-4'>
          <h3 className='font-semibold capitalize text-slate-800 text-lg'>
            {getProduct.name}
          </h3>
          <p className=' capitalize text-slate-600 text-xl font-medium'>
            {getProduct.category}
          </p>
          <p className='font-bold capitalize  md:text-xl'>
            <span className='text-red-500'>₦</span>
            {getProduct.price}
          </p>
          <h3 className='mt-4'>
            Description:{" "}
            {getProduct.description
              ? getProduct.description
              : `This is the best grade of ${getProduct.name}`}
          </h3>
          <div className='flex gap-4 mt-4'>
            <button
              className='py-2 px-4 bg-yellow-500 rounded-md font-semibold'
              onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className='py-2 px-4 bg-yellow-500 rounded-md font-semibold'>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div></div>
      <div className='mt-4'>
        <h2 className='text-3xl font-bold mb-4'>Our Specials</h2>
        <div className='flex gap-4 items-center justify-center overflow-scroll scrollbar-none scroll-smooth'>
          {getCategory[0] &&
            getCategory.map((e) => {
              return (
                <MenuIcon
                  onClick={() => filterByCategory(e)}
                  key={e}
                  category={e}
                  isActive={e.toLowerCase() === filterBy.toLowerCase()}
                />
              );
            })}
        </div>
      </div>
      <div
        className='flex flex-wrap items-center justify-center mt-4 gap-4'
        onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
        {dataFilter.map((e) => {
          return (
            <CartCard
              key={e._id}
              id={e._id}
              image={e.image}
              name={e.name}
              price={e.price}
              category={e.category}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
