"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MdOutlineCategory } from "react-icons/md";


const Topcata = () => {
    const [categores, setCategores] = useState([])
    useEffect(() => {
        const fbanner = async () => {
            try {

                const res = await fetch("/api/add/category", { cache: "no-cache" });
                if (!res.ok) {
                    console.log("failed")
                    return;
                }
                const data = await res.json()
                if (data.categories) {
                    setCategores(data.categories)
                }
            } catch (error) {

                console.error("Error:", error)
            }
        }
        fbanner()

    }, [])
    return (
        <div>
            <div className='mt-5'>
                
                
                <Link href="/top"><h2 className='text-start text-2xl font-bold text-black flex items-center select-none'><MdOutlineCategory className="material-symbols-outlined " />Top Categoris</h2></Link>
                
                <div className='Top  grid grid-cols-2 md:grid-cols-5 place-items-center gap-6 m-3'>
                    {categores.map((item, index)=>(
                    <div key={item._id || index} className="topCon  bg-white relative text-black md:h-[200px] md:w-[215px] rounded-xl border overflow-hidden border-gray-300 shadow-[0px_10px_30px_0px_rgba(255,182,193,0.3)]">
                        <Link href={`/category/${item.slug}`}><img className=' w-full h-full blur-[1px] object-cover  hover:scale-105 transition duration-300' src={item.image} alt="" />
                        <span className=' absolute top-15 md:top-20 left-20 bg-slate-800  text-white text-lg font-bold p-2 w-full  rounded z-10'> {item.name}</span></Link>
                    </div>
                ))}
                </div>
                
            </div>
        </div>
    )
}

export default Topcata
