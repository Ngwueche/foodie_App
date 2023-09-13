import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import empty from "../../src/assets/empty.gif";

const Cart = () => {
  const reduxCartItem = useSelector((state) => state.product.cartItem);
  const totalPrice = reduxCartItem.reduce(
    (prev, curr) => prev + parseInt(curr.total),
    0
  );
  const totalQty = reduxCartItem.reduce(
    (prev, curr) => prev + parseInt(curr.qty),
    0
  );
  return (
    <>
      <div className='p-2 md:p-4'>
        <h2 className='text-lg md:text-2xl font-bold text-slate-600'>
          Your Cart Items
        </h2>

        {reduxCartItem[0] ? (
          <div className='md:flex gap-4'>
            {/* display cart items */}
            <div className='my-4 mx-auto flex'>
              <div className='w-full max-w-3xl  '>
                {reduxCartItem.map((e) => {
                  return (
                    <CartProduct
                      key={e._id}
                      id={e._id}
                      image={e.image}
                      name={e.name}
                      price={e.price}
                      category={e.category}
                      qty={e.qty}
                      total={e.total}
                    />
                  );
                })}
              </div>
            </div>
            {/* display cart Item */}

            <div className='flex flex-col w-full max-w-sm mx-auto'>
              <h3 className='bg-blue-500 text-white px-4 py-2 font-bold md:text-2xl'>
                Cart Summary
              </h3>
              <div className='flex w-full mt-4 font-semibold border-b'>
                <p className=''>Total Quantity:</p>
                <p className='ml-auto font-bold'>{totalQty}</p>
              </div>
              <div className='flex w-full mt-4 font-semibold border-b-2'>
                <p className=''>Total Price:</p>
                <p className='ml-auto font-bold'>{totalPrice}</p>
              </div>
              <buttom className='bg-red-500 hover:bg-red-600 cursor-pointer  w-full text-center p-2 text-white font-bold'>
                Payment
              </buttom>
            </div>
          </div>
        ) : (
          <>
            <div className='flex flex-col items-center justify-center'>
              <img
                src={empty}
                alt=''
              />
              <h2 className='text-2xl font-bold mt-2'>Empty Cart</h2>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
