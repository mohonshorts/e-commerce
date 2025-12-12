import Link from 'next/link'
import React, { useEffect, useReducer, useState } from 'react'
import { useRouter } from "next/navigation"
import { CiSearch } from "react-icons/ci";

const Search = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchProducts = async () => {
            if (query.length > 0) {
                try {
                    const res = await fetch(`/api/add/search?query=${query}`)
                    const data = await res.json()
                    setResults(data)
                } catch (error) {
                    console.error("Search error:", error)
                }
            } else {
                setResults([])
            }
        }
        const timer = setTimeout(() => {
            fetchProducts()
        }, 300);

        return () => clearTimeout(timer)

    }, [query])

    const handleSearchSubmit = () => {
        if (query.trim()) {
            router.push(`/search?query=${query}`);
            setResults([])
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchSubmit();
        }
    };

    return (
        <div className='relative w-fit mx-auto z-50'>
            <div className="search flex justify-center items-center bg-slate-400  mx-auto rounded-sm hover:border">
                <input
                    className='search bg-slate-400 text-black outline-none h-9 w-[26vw] rounded-lg font-semibold placeholder:text-center ' type="text" placeholder='Search product for you'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearchSubmit} className='flex justify-center items-center cursor-pointer bg-slate-600 h-9 border-r-slate-600 border-r-15 border-l-slate-600 border-l-15 rounded-r-sm'>
                    <CiSearch />
                </button>
            </div>
            {results.length > 0 && query.length > 0 && (
                <div className='absolute top-10 left-0 w-full max-h-[300px] overflow-y-auto border border-gray-200 bg-slate-800'>
                    {results.map((item) => (
                        <Link href={"productd/" + item._id} key={item._id} className='flex items-center gap-3 p-2 hover:bg-slate-700 transition-colors border-b last:border-none'>
                            <div className='h-10 w-10 shrink-0'>
                                <img
                                    src={item.img_p}
                                    alt={item.title}
                                    className='h-full w-full object-cover rounded-sm'
                                />
                            </div>
                            <div className='flex flex-col text-left'>
                                <span className='font-semibold text-sm line-clamp-1' title={item.title}>
                                    {item.title}
                                </span>
                                <span className=' text-xs text-white font-bold'>
                                    price: {item.price}
                                </span>
                            </div>
                        </Link>
                    ))}

                </div>
            )}
        </div>
    )
}

export default Search
