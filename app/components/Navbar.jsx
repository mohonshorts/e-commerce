"use client"
import NavbarDm from './NavbarDm'
import Search from './Search'
import Sidebar from './Sidebar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoMenuOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'


const Navbar = ({ onMenuClick }) => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        const allproduct = async () => {
            try {

                const res = await fetch("/api/add/logo", { cache: "no-cache" });
                if (!res.ok) {
                    console.log("failed")
                    return;
                }
                const data = await res.json()
                if (data.success) {
                    setProduct(data.result)
                }
            } catch (error) {

                console.error("Error:", error)
            }
        }
        allproduct()

    }, [])
    return (
        <nav>
            <div className='bg-slate-800 py-2 flex justify-between items-center text-white'>
                <div className="menuN hover:bg-slate-700 cursor-pointer rounded-full">
                    <button onClick={onMenuClick} className='hover:cursor-pointer'>
                        <IoMenuOutline className='h-7 w-7 m-2 material-symbols-outlined' />
                    </button>
                </div>
                {product.map((item, index) => (
                    <div key={item._id || index} className="logo ">
                        <Link href="/">
                            <span className='text-2xl font-bold select-none cursor-pointer '>{item.logo}</span>
                        </Link>
                    </div>
                ))}
                <div className='mx-auto'>
                    <Search />

                </div>
                <div className="hidden md:block  hover:bg-slate-700 rounded-full cursor-pointer">
                    <Link href="/cart">
                        <MdAddShoppingCart className='h-7 w-7 m-2.5 material-symbols-outlined' />
                    </Link>
                </div>
                <div className="trackD hidden md:block  hover:bg-slate-700 rounded-full cursor-pointer">
                    <Link href="/odertack">
                        <TbTruckDelivery  className='h-7 w-7 m-2.5 material-symbols-outlined' />
                    </Link>
                </div>
                <div className='notifications hidden md:block hover:bg-slate-700 rounded-full cursor-pointer'>
                    <Link href="/notification">
                        <IoMdNotificationsOutline   className='h-7 w-7 m-2.5 material-symbols-outlined' />
                    </Link>
                </div>
                <div className="profile select-none hidden md:block  hover:bg-slate-700 rounded-full cursor-pointer">
                    <SignedOut>
                        <SignInButton>
                            
                                <IoMdLogIn    className='h-7 w-7 m-2.5 material-symbols-outlined' />
                            
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
            <div className=''>
                <NavbarDm />
            </div>
        </nav>
    )
}

export default Navbar
