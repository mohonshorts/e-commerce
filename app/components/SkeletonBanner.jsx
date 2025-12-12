// components/BannerSkeleton.jsx
import React from 'react';

const SkeletonBanner = () => {
  return (
    // 1. বাইরের রেপার: আপনার আসল কোডের centering ঠিক রাখার জন্য
    <div className='flex justify-center text-center md:w-[70vw] mx-auto'>
        
        {/* 2. ব্যানারের আসল স্কেলেটন বক্স */}
        {/* আমরা আসল ব্যানারের ক্লাসগুলো (w-[95vw], h-[17vh], md:h-[45vh], my-7, rounded-xl) হুবহু কপি করেছি */}
        <div className="my-7 w-[95vw] sm:h-[17vh] h-[17vh] md:h-[45vh] rounded-xl shadow-sm bg-gray-300 animate-pulse border border-gray-200 overflow-hidden">
            {/* ভেতরে কোনো কন্টেন্ট লাগবে না, শুধু একটি ধূসর বক্স মিটমিট করবে */}
        </div>
        
    </div>
  );
};

export default SkeletonBanner;