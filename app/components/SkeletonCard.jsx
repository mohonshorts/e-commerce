import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="relative h-[170px] w-[350px] md:h-[200px] md:w-[420px] rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center animate-pulse overflow-hidden">
=
            <div className="h-full w-1/2 bg-gray-300 rounded-l-xl"></div>
=
            <div className="h-full w-1/2 p-3 flex flex-col justify-center">

                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>

                <div className="flex gap-2 mb-3">
                    <div className="h-5 bg-gray-300 rounded w-12"></div>
                    <div className="h-5 bg-gray-300 rounded w-16"></div>
                </div>

                <div className="flex gap-2 mb-auto">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>

                <div className="mt-auto h-9 w-full bg-slate-700 rounded-sm opacity-50"></div>
            </div>

        </div>
    );
};

export default SkeletonCard;