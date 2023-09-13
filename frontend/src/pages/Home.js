import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import CartCard from "../components/CartCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import MenuIcon from "../components/MenuIcon";

function Home() {
  const productList = useSelector((state) => state.product.productList);
  const slicedProductList = productList.slice(12, 16);
  const filterVeges = productList.filter(
    ((e) => e.category === "Veges") || ((e) => e.category === "veges"),
    []
  );
  const getCategory = [...new Set(productList.map((e) => e.category))];
  const isLoadingArray = new Array(4).fill(null);
  const loadingArray = new Array(10).fill(null);

  const slideProductRef = useRef();
  const handlePrevious = () => {
    slideProductRef.current.scrollLeft -= 200;
  };
  const handleNext = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const [dataFilter, setDataFilter] = useState([productList]);

  useEffect(() => {
    setDataFilter(productList);
  }, []);

  const filterByCategory = (category) => {
    const filter = productList.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };
  const random = Math.random(0, 1);

  return (
    <div className='p-2 md:p-4  mx-auto'>
      <div className='md:flex md:h-[70vh] '>
        <div className='md:w-1/2 '>
          <div className=' flex rounded-full font-medium text-white bg-red-400 h-6 items-center px-4 py-1 gap-2 w-48'>
            <p>Delivery in a Flash</p>
            <img
              className='h-full'
              src='https://cdn-icons-png.flaticon.com/128/11528/11528908.png'
              alt=''
            />
          </div>
          <div className='flex gap-4 font-bold text-4xl md:8xl mt-20'>
            <h2>
              More than a Home Made Food.{" "}
              <span className='text-red-500'>Fresh and Tasty</span>
            </h2>
          </div>
          <p className='py-3 text-base mt-8'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aut,
            consequatur quam neque quia id, tempora illum impedit optio hic ut
            voluptatibus quibusdam corrupti ea a eligendi velit explicabo ex
            vitae, nostrum voluptatum deleniti consequuntur? Expedita ut
            corrupti repudiandae tempora?
          </p>
          <button className='font-bold py-2 mt-4 px-4 bg-red-500 text-white rounded-md hover:bg-red-600'>
            Order Now
          </button>
        </div>
        <div className='md:w-1/2 xl:w-2/3 flex flex-wrap p-4 justify-center gap-4 mt-20 scroll-smooth transition-all'>
          {slicedProductList[0]
            ? slicedProductList.map((e) => {
                return (
                  <HomeCard
                    key={e._id}
                    image={e.image}
                    name={e.name}
                    price={e.price}
                    category={e.category}
                  />
                );
              })
            : isLoadingArray.map((e, index) => {
                return (
                  <HomeCard
                    key={index + random}
                    loading={"Loading..."}
                  />
                );
              })}
        </div>
      </div>
      <div className='relative w-full mt-4'>
        <h2 className='text-3xl font-bold'>Fresh Vegetables</h2>
        <div
          className='flex py-6 justify-start gap-3 overflow-x-scroll scrollbar-none scroll-smooth transition-all'
          ref={slideProductRef}>
          {filterVeges[0]
            ? filterVeges.map((e) => {
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
              })
            : loadingArray.map((e, index) => {
                return (
                  <CartCard
                    key={index}
                    loading={"Loading..."}
                  />
                );
              })}
        </div>
        <div className='absolute top-48 flex justify-between w-full'>
          <button
            onClick={handlePrevious}
            className='bg-slate-300 p-3 rounded-md'>
            <GrPrevious />
          </button>

          <button
            onClick={handleNext}
            className='bg-slate-300 p-3 rounded-md'>
            <GrNext />
          </button>
        </div>
      </div>
      <div className='mt-4'>
        <h2 className='text-3xl font-bold mb-4'>Our Specials</h2>
        <div className='flex gap-4 items-center justify-center overflow-scroll scrollbar-none scroll-smooth'>
          {getCategory[0] &&
            getCategory.map((e) => {
              return (
                <MenuIcon
                  onClick={() => filterByCategory(e)}
                  key={e._id}
                  category={e}
                />
              );
            })}
        </div>
      </div>
      <div className='flex flex-wrap items-center justify-center mt-4 gap-4'>
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

export default Home;
