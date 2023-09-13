import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { imageToBAse64 } from "../utility/imageToBAse64";
import { toast } from "react-hot-toast";

export default function NewProduct() {
  // Drag and Drop const [image, setImage] = useState(null);

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const file = e.dataTransfer.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const uploadImage = async (e) => {
    const data = await imageToBAse64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };
  const clearInput = () => {
    setData(() => {
      return {
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, image, price } = data;
    if (name && category && image && price) {
      const sendData = await fetch("http://localhost:7111/newproduct", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const response = await sendData.json();

      response ? toast(response.message) : toast(response.error);
      clearInput();
    } else {
      toast("Filled the required fileds");
    }
  };
  return (
    <div className=' p-4 '>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col bg-white drop-shadow-md w-full rounded-md max-w-md m-auto mt-4 p-4 justify-between'
        htmlFor=''
        action=''>
        <label
          htmlFor='name'
          className='my-1'>
          Name
        </label>
        <input
          onChange={handleOnchange}
          value={data.name}
          className='bg-slate-200 p-1 my-1 rounded-md'
          type='text'
          name='name'
        />

        <label
          htmlFor='category'
          className='my-1'>
          Category
        </label>
        <select
          onChange={handleOnchange}
          value={data.category}
          className='bg-slate-200 p-1 my-1 rounded-md'
          name='category'
          id='category'>
          <option>Select Item</option>
          <option>Fruits</option>
          <option>Veges</option>
          <option>Ice Cream</option>
          <option>Cakes</option>
          <option>Burger</option>
          <option>Pizza</option>
          <option>Rice</option>
          <option>Biryani</option>
          <option>Chicken</option>
          <option>Dosa</option>
          <option>Fast Food</option>
          <option>Paneer</option>
          <option>Tubers</option>
          <option>Sandwish</option>
        </select>

        <div className='h-40 w-full bg-slate-200 flex rounded-md my-1 justify-center items-center'>
          {data.image ? (
            <img
              className='h-[90%]'
              src={data.image}
              alt={data.image}
            />
          ) : (
            <span className='text-6xl relative cursor-pointer'>
              <FaCloudUploadAlt
                className=' cursor-pointer'
                onClick={uploadImage}
              />
            </span>
          )}

          <input
            accept='image/*'
            onChange={uploadImage}
            type='file'
            className='absolute opacity-0'
          />
        </div>

        <label
          htmlFor='price'
          className='my-1'>
          Price
        </label>
        <input
          onChange={handleOnchange}
          value={data.price}
          className='bg-slate-200 p-1 my-1 rounded-md'
          type='text'
          name='price'
        />

        <label
          htmlFor='description'
          className='my-1'>
          Description
        </label>
        <textarea
          onChange={handleOnchange}
          value={data.description}
          className='h-20 text-[12px] bg-slate-200 p-1 my-1 truncate
          overflow-visible whitespace-normal focus:top-0 left-0 text-overflow:
          ellipsis'
          type='text'
          name='description'></textarea>

        <button className='w-full bg-red-400 mt-2 text-center text-white font-medium hover:bg-red-500 hover:text-black rounded-md cursor-pointer py-1'>
          Save
        </button>
      </form>
    </div>
  );
}
