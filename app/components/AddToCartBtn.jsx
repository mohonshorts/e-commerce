"use client";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCartArrowDown } from "react-icons/fa";

export default function AddToCart({ productId }) {
  const handleAddToCart = (e) => {

    e.stopPropagation(); 
    e.preventDefault();

    const excart = JSON.parse(localStorage.getItem("cart")) || []
    const itemId = excart.findIndex((item) => item.id === productId)
    if (itemId > -1) {
      toast.error('Product Is Alredy In Cart!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      }else {
        excart.push({ id: productId })
       toast.success('Product Added In Cart!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      }
    localStorage.setItem("cart", JSON.stringify(excart))
  }


    return (
      <div>
       
        <button
          onClick={handleAddToCart}
          className='bg-slate-800 text-white p-4 py-2 rounded'
        >
          <FaCartArrowDown />
        </button>
      </div>
    )
  }


 