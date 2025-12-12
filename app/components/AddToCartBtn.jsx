"use client";
import React from "react";
import { useCart } from "@/app/context/CartContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSolidCartAdd } from "react-icons/bi";

const AddToCartBtn = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    console.log("Adding Product:", product);

    if (product) {
      addToCart(product);
    } else {
      toast.error('Product Data Missing!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        className="flex justify-center items-center cursor-pointer text-center rounded bg-slate-800 font-bold p-1 text-white text-sm hover:bg-black transition"
      >
        <BiSolidCartAdd  className="material-symbols-outlined " />
      </button>
    </div>
  );
};

export default AddToCartBtn;