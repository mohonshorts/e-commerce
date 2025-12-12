import AddToCartBtn from "@/app/components/AddToCartBtn";
import Navbar from "@/app/components/Navbar";
import { db_uri } from "@/app/lib/db";
import { call } from "@/app/lib/model/callction"; 
import mongoose from "mongoose";
import Link from "next/link";
import { MdOutlineCategory } from "react-icons/md";


export default async function CategoryPage({ params }) {
    const { slug } = await params;
    const categoryName = decodeURIComponent(slug);

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(db_uri);
    }

    const product = await call.find({ categoris: categoryName });

    return (
        <div>
            <Navbar/>
        <div className="container mx-auto p-4">
            
            <div className='mt-5'>
                <div className="flex justify-between items-center mb-6">
                    <h2 className='select-none text-start text-2xl font-bold text-black flex items-center capitalize'>
                        <MdOutlineCategory className="material-symbols-outlined " />
                        {categoryName} Collection
                    </h2>
                    <Link href="/allproductlist" className="text-blue-600 font-bold hover:underline">
                        View All Products
                    </Link>
                </div>

                {product.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <h2 className="text-xl text-gray-500">No products found in "{categoryName}" category.</h2>
                    </div>
                ) : (
                    <div className="allP grid md:grid-cols-3 place-items-center sm:grid-cols-1 grid-cols-1 gap-6">
                        {product.map((item, index) => (
                            <Link key={item._id || index} href={`/productd/${item._id}`}>
                                <div className="topCon relative h-[170px] w-[350px] md:h-[200px] md:w-[420px] rounded-xl text-black flex items-center justify-center border  hover:shadow-lg transition bg-white border-gray-300 shadow-[0px_10px_30px_0px_rgba(255,182,193,0.3)]">
                                    
                                    <div className='overflow-hidden imgp text-center flex items-center justify-center bg-white h-full w-full rounded-l-xl'>
                                        <img className='w-full h-full object-cover hover:scale-105 transition duration-300' src={item.img_p} alt={item.title} />
                                    </div>

                                    <div className='pdete bg-white h-full w-full rounded-r-xl flex flex-col p-3 justify-between'>
                                        <div>
                                            <p className='text-black text-lg font-semibold md:line-clamp-2 line-clamp-1 leading-5 mb-1'>
                                                {item.title}
                                            </p>
                                            
                                            <div className='flex justify-start gap-2 items-center'>
                                                {item.price_down && (
                                                    <del className='text-sm font-bold text-gray-400'>৳ {item.price_down}</del>
                                                )}
                                                <h2 className='text-lg font-bold text-black'>৳ {item.price}</h2>
                                            </div>

                                            <div className='flex justify-start gap-2 text-xs text-gray-600 mt-1'>
                                                <span>Stock: {item.qauntity || "Available"}</span>
                                                <AddToCartBtn product={JSON.parse(JSON.stringify(item))} />
                                            </div>
                                        </div>

                                        <div className='mt-2'>
                                            <div className='flex justify-center items-center cursor-pointer text-center rounded bg-slate-800 py-1.5 w-full text-white text-sm hover:bg-black transition'>
                                                অর্ডার করুন
                                            </div>
                                        </div>
                                    </div>

                                    {item.of && (
                                        <span className='absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded'>
                                            {item.of} Off
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            
        </div>
        </div>
    );
}