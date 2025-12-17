"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AddToCartBtn from './AddToCartBtn'
import { AiOutlineProduct } from "react-icons/ai";
import SkeletonCard from './SkeletonCard';


const Allproduct = () => {
    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const allproduct = async () => {
            try {

                const res = await fetch("/api/add", { cache: "no-cache" });
                if (!res.ok) {
                    console.log("failed")
                    return;
                }
                const data = await res.json()
                if (data.success) {
                    setProduct(data.result)
                    setIsLoading(false)
                }
            } catch (error) {

                console.error("Error:", error)
                setIsLoading(false)
            }
        }
        allproduct()

    }, [])
    return (
        <div className="pb-24 md:pb-32">

            <div className='mt-5'>
                <Link href="/allproductlist"><h2 className='select-none text-start text-2xl font-bold text-black flex items-center '><AiOutlineProduct className="material-symbols-outlined " />All Product</h2></Link>
                <div className="allP grid md:grid-cols-3 place-items-center sm:grid-cols-1 grid-cols-1 gap-2">
                    {isLoading ? (
                        [...Array(6)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : (product.map((item, index) => (
                                <Link key={item._id || index} href={"productd/" + item._id}>
                                    <div className="topCon relative h-[170px] w-[350px] md:h-[200px] md:w-[420px] rounded-xl text-black flex items-center justify-center border  border-gray-300 shadow-[0px_10px_30px_0px_rgba(255,182,193,0.3)] ">
                                        <div className=' overflow-hidden imgp text-center flex items-center justify-center bg-white h-full w-1/2 rounded-l-xl' >
                                            <img className='wfull h-full object-cover hover:scale-105 transition duration-300' src={item.img_p} alt="" />
                                        </div>
                                        <div className='pdete bg-white h-full w-1/2 rounded-r-xl flex flex-col p-2'>
                                            <p className='text-black text-xl md:line-clamp-2 line-clamp-1 leading-6'>{item.title}</p>
                                            <div className='flex justify-start gap-2 mt-2 items-center'>
                                                <del><h2 className='md:text-lg font-bold text-gray-500'>৳
                                                    : {item.price_down}</h2></del>
                                                <h2 className='md:text-lg font-bold text-black'>৳
                                                    : {item.price}</h2>
                                            </div>
                                            <div className='flex justify-start gap-2 mt-2 items-center'>
                                                <h2 className='text-sm font-bold  text-black'>Stock : {item.qauntity}</h2>
                                                <AddToCartBtn productId={item._id} />
                                            </div>

                                            <div className='mt-auto flex justify-center items-center bottom-0'>
                                                <button src={"productd/" + item._id} className='flex justify-center items-center cursor-pointer text-center rounded-sm bg-slate-800 h-9 w-full text-white '>অর্ডার করুন</button>
                                            </div>
                                        </div>
                                        <span className=' absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>{item.of} Of</span>
                                    </div>
                                </Link>
                            )))}
                </div>
            </div>
        </div>
    )
}

export default Allproduct
