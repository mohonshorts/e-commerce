// components/CategorySkeleton.jsx
import React from 'react';

const SkeletonTop = () => {
  return (
    <div className="relative h-[150px] w-full md:h-[200px] md:w-[215px] rounded-xl border border-gray-200 overflow-hidden animate-pulse bg-gray-300 shadow-sm">
      
      <div className="h-full w-full bg-gray-300"></div>

      <div className="absolute top-[60px] md:top-20 left-20 h-10 w-2/3 bg-slate-600 rounded-md opacity-80">
      
      </div>

    </div>
  );
};

export default SkeletonTop;