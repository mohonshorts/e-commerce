import React from 'react'
import Link from 'next/link'
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
const Footer = () => {
    return (
        <div className='bg-slate-800 fixed bottom-0 w-full text-white flex justify-center items-center'>
            <ul className='flex gap-8 justify-center items-center mx-5'>
                <Link href="/setting"><li className='fbtn flex flex-col justify-center items-center'>
                    <IoSettingsOutline className="material-symbols-outlined " />
                    Settings</li></Link>
                <Link href="/top"><li className='fbtn flex flex-col justify-center items-center'><MdOutlineCategory className="material-symbols-outlined " />Top</li></Link>

                <Link href="/"><li className='fbtn items-center relative bottom-5 text-[13px] bg-slate-800 p-4 px-5 border border-white rounded-[50%] shadow-md shadow-blue-500/50  '><IoMdHome className="material-symbols-outlined " />Home</li></Link>
                <Link href="/cart"><li className='fbtn flex flex-col justify-center items-center'><MdAddShoppingCart className="material-symbols-outlined " />Cart</li></Link>
                <Link href="/"><li className='fbtn flex flex-col justify-center items-center'>
                    <SignedOut>
                        <SignInButton>
                            <button className='flex flex-col cursor-pointer'>
                                <IoMdLogIn className="material-symbols-outlined " />Login</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </li></Link>
            </ul>
        </div>
    )
}

export default Footer
