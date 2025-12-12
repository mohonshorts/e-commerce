"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import SkeletonBanner from './SkeletonBanner'


const Banner = () => {
    const [bannerData, setBannerData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fbanner = async () => {
            try {

                const res = await fetch("/api/add/banner", { cache: "no-cache" });
                if (!res.ok) {
                    console.log("failed")
                    return;
                }
                const data = await res.json()
                if (data.success) {
                    setBannerData(data.result)
                    setIsLoading(false)
                }
            } catch (error) {

                console.error("Error:", error)
                setIsLoading(false)

            }
        }
        fbanner()

    }, [])
    return (
        <div>
            {isLoading ? (
                [...Array(1)].map((_, index) => (
                    <SkeletonBanner key={index} />
                ))
            ) : (bannerData.map((item, index) => (
                    <div key={item._id || index}>
                        <Link href={item.link}><div className=' flex justify-center text-center md:w-[70vw] '>
                            <div className="banner overflow-hidden my-7 w-[95vw]  sm:h-[17vh] h-[17vh] md:h-[45vh] rounded-xl shadow-sm shadow-black">
                                <img className='w-full h-full object-fill' src={item.banner_img} alt='Loding banner...' />

                            </div>
                        </div></Link>
                    </div>
                )))}
        </div>
    )



}

export default Banner
