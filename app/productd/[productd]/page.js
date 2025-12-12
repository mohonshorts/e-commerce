"use client"
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineProduct } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";


const Allproduct = ({ params }) => {
    const unnrap = use(params)
    const productid = unnrap.productd
    const [product, setProduct] = useState([])
    const [paymentMe, setpaymentMe] = useState([])
    const [allprice, setAllprice] = useState("")
    const [sePrice, setsePrice] = useState("")
    const [howMeny, setHowMeny] = useState(1)
    const entPrice = parseInt(sePrice) * parseInt(howMeny)
    const totalp = parseInt(allprice) + entPrice
    const [footerTab, setfooterTab] = useState(1)
    const [isOrdering, setIsOrdering] = useState(false);

    const stock = parseInt(product.qauntity || "0");
    const isOutOfStock = stock <= 0;

    const inc = () => {
        setHowMeny(howMeny + 1)
    }
    const dec = () => {
        setHowMeny(howMeny - 1)
    }


    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        district: "",
        upazila: "",
        address: "",
        payment: "cash",
        trxID: "",
        senderNumber: ""
    });


    useEffect(() => {
        const allproduct = async () => {
            try {

                const res = await fetch("/api/add/" + productid, { cache: "no-cache" });
                if (!res.ok) {
                    console.log("failed")
                    return;
                }
                const data = await res.json()
                if (data.success) {
                    setProduct(data.result)
                    const price = parseInt(data.result.price)
                    setsePrice(price)
                    const cost = parseInt(data.result.cost)
                    setAllprice(cost)
                }
            } catch (error) {

                console.error("Error:", error)
            }
        }
        allproduct()
    }, [productid])
    useEffect(() => {
        const paymentM = async () => {
            try {

                const res = await fetch("/api/add/navtext", { cache: "no-cache" });
                if (!res.ok) {
                    console.log("failed")
                    return;
                }
                const data = await res.json()
                if (data.success) {
                    setpaymentMe(data.result)
                }
            } catch (error) {

                console.error("Error:", error)
            }
        }
        paymentM()

    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleOrder = async () => {
        if (!formData.name || !formData.phone || !formData.address) {
            toast.error('Please fill the form!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        };
        if (isOutOfStock || isOrdering) return;
        setIsOrdering(true);
        if ((formData.payment === "bkash" || formData.payment === "nagad") && (!formData.trxID || !formData.senderNumber)) {
            toast.error('Please fill the payments!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }


        const orderData = {


            products: [
                {
                    productId: product._id,
                    productName: product.title,
                    productImage: product.img_p,
                    price: parseFloat(product.price),
                    quantity: parseInt(howMeny),
                    subtotal: parseFloat(product.price) * parseInt(howMeny)
                }
            ],

            customerName: formData.name,
            customerPhone: formData.phone,
            customerEmail: formData.email,
            district: formData.district,
            upazila: formData.upazila,
            fullAddress: formData.address,

            deliveryCost: parseInt(product.cost),
            totalPrice: totalp,

            paymentMethod: formData.payment,
            transactionId: formData.trxID,
            senderNumber: formData.senderNumber,

            status: "pending"
        }

        try {
            const res = await fetch("/api/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();

            if (data.success) {
                toast.success('Oder placed Successfully!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                alert("Order Failed");
                console.log(data);
            }

        } catch (error) {
            console.error(error)
        }

    }





    return (
        <div className=' bg-gray-50'>
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className='mt-5 m-2'>

                <h2 className='select-none text-center text-2xl font-bold text-black flex items-center  '><AiOutlineProduct className="material-symbols-outlined " />Buy Product</h2>
                <div className="allP grid md:grid-cols-1 place-items-center sm:grid-cols-1 grid-cols-1 gap-2">

                    <div className="topCon relative md:h-[250px] md:w-[420px] h-[200px] w-[350px] rounded-xl text-black flex items-center justify-center border border-gray-900 ">
                        <div className=' overflow-hidden imgp rounded-xl text-center flex items-center justify-center bg-white h-full w-full rounded-l-xl' >
                            <img className='w-full h-full object-cover' src={product.img_p} alt="" />
                        </div>

                        <span className=' absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10'>{product.of} Of</span>
                    </div>
                    <div className='md:md:w-2/3 w-full mb-50 '>
                        <div>
                            <p className='text-black text-xl leading-6 font-bold'>{product.title}</p>
                        </div>
                        <div className='mt-3'>
                            <p className={`text-sm ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                                {isOutOfStock ? "Stock Out" : `In Stock: ${stock}`}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2 rounded-sm mt-4 '>
                            <div className='flex flex-col border rounded p-3 bg-white shadow shadow-black'>

                                <div className='text-xl font-bold flex justify-center items-center gap-2'><MdAccountCircle className="material-symbols-outlined " />Billing Details</div>
                                <div className='bg-black h-px'></div>
                                <label className='font-bold text-sm '>Full Name</label>
                                <input required name="name" onChange={handleChange} className='rounded-sm h-10 text-sm  text-center  border m-1 outline-none text-black' type="text" placeholder='Your Name' />
                                <label className='font-bold text-sm '>Phone Number</label>
                                <input required name="phone" onChange={handleChange} className='rounded-sm h-10 text-sm  text-center  border m-1 outline-none text-black' type="text" placeholder='Phone number 01XXXXXXXXX' />
                                <label className='font-bold text-sm '>Email Address</label>
                                <input required name="email" onChange={handleChange} className='rounded-sm h-10 text-sm  text-center  border m-1 outline-none text-black' type="text" placeholder='example@gmail.com' />
                                <label className='font-bold text-sm '>District</label>
                                <input required name="district" onChange={handleChange} className='rounded-sm h-10 text-sm  text-center  border m-1 outline-none text-black' type="text" placeholder='District' />
                                <label className='font-bold text-sm '>Upazila</label>
                                <input required name="upazila" onChange={handleChange} className='rounded-sm h-10 text-sm  text-center  border m-1 outline-none text-black' type="text" placeholder='Upazila' />
                                <label className='font-bold text-sm '>Full Address</label>
                                <input required name="address" onChange={handleChange} className='rounded-sm h-10 text-sm  text-center  border m-1 outline-none text-black' type="text" placeholder='full address' />
                            </div>
                            <div className='flex flex-col border rounded mt-4 gap-3 pb-2 p-3 bg-white shadow shadow-black'>


                                <p className='text-xl font-bold flex justify-center items-center gap-2'><MdOutlinePayments className="material-symbols-outlined " />Order Summary</p>
                                <div className='bg-black h-px'></div>
                                <input value={`Product: ${product.title}`} readOnly onChange={(item) => item.target.value} className='rounded-sm h-10 text-sm font-bold bg-blue-100  text-center  border m-1 outline-none text-black' type="text" />
                                <input value={`Porduct Price: ${product.price}`} readOnly onChange={(item) => item.target.value} className='rounded-sm bg-blue-100  h-10 font-bold text-sm  text-center  border m-1 outline-none text-black' type="text" />
                                <div className='flex text-center justify-center items-center text-sm font-bold gap-3'>
                                    <button onClick={dec} className='bg-slate-800 hover:bg-slate-700 text-white w-8 flex justify-center items-center text-xl  h-8'>-</button>
                                    <input min="1" max={product.cauntity} value={howMeny} onChange={(i) => setHowMeny(i.target.value)} type="number" className='h-10 w-auto text-center' />
                                    <button onClick={inc} className='bg-slate-800 hover:bg-slate-700 text-white w-8 flex justify-center items-center text-xl  h-8'>+</button>
                                </div>
                                <input value={`Price: ${entPrice} + Cost: ${product.cost}`} readOnly onChange={(item) => item.target.value} className='rounded-sm bg-blue-100  h-10 font-bold text-sm  text-center  border m-1 outline-none text-black' type="text" />
                                <input value={`Total: ${totalp}`} onChange={(item) => item.target.value} readOnly className='rounded-sm h-10 text-sm bg-blue-100   border m-1 outline-none text-black text-center font-bold' type="text" />
                                <div className='grid gap-3 justify-center items-center rounded text-center grid-cols-1'>
                                    <label htmlFor="cash" className={`cursor-pointer flex justify-center items-center text-sm  font-bold border mt-1 mb-1 p-3 rounded ${formData.payment === "cash" ? 'bg-blue-50 border-blue-500' : ''}`}>
                                        <input value="cash" onChange={handleChange} name='payment' className='accent-blue-500 cursor-pointer' defaultChecked id='cash' type="radio" />
                                        <label name='payment' className='cursor-pointer' htmlFor="cash">Cash on delivery</label>
                                    </label>
                                    <div className='flex justify-center items-center gap-3'>
                                        <div>
                                            <label htmlFor="bkash" className={`cursor-pointer flex justify-center items-center text-sm  font-bold border mt-1 mb-1 p-3 rounded ${formData.payment === "bkash" ? 'bg-pink-50 border-pink-500' : ''}`}>
                                                <input value="bkash" onChange={handleChange} name='payment' className='accent-pink-500 cursor-pointer' id='bkash' type="radio" />
                                                <label name='payment' className='cursor-pointer' htmlFor="bkash">
                                                    <img src="/bkash.svg" width={60} alt="Bkash" />
                                                </label>
                                            </label>
                                            {formData.payment === 'bkash' && (
                                                <div className='bg-pink-50 p-4 rounded border border-pink-200 mb-4 shadow-sm'>
                                                    <div className='flex items-center gap-2 mb-2'>
                                                        <span className="material-symbols-outlined text-pink-600">storefront</span>
                                                        <p className='text-sm font-bold text-black'>বিকাশ মার্চেন্ট পেমেন্ট</p>
                                                    </div>

                                                    <p className='text-sm text-gray-700'>
                                                        আপনার বিকাশ অ্যাপ এর <strong>"Payment"</strong> অপশনে যান এবং নিচের নাম্বারে পেমেন্ট করুন:
                                                    </p>
                                                    {paymentMe.map((item, index) => (

                                                        <h3 key={item._id || index} className='text-2xl font-bold text-pink-600 my-2 text-center select-all'>{item.bkash_payment}</h3>
                                                    ))}

                                                    <div className='bg-white p-2 rounded border border-pink-100'>
                                                        <p className='text-xs text-gray-500 mb-1'>পেমেন্ট করার পর তথ্য দিন:</p>
                                                        <input
                                                            required
                                                            name="senderNumber"
                                                            onChange={handleChange}
                                                            className='w-full border p-2 rounded text-sm outline-pink-500 text-black mb-2'
                                                            placeholder='যে নম্বর থেকে পেমেন্ট করেছেন'
                                                        />
                                                        <input
                                                            required
                                                            name="trxID"
                                                            onChange={handleChange}
                                                            className='w-full border p-2 rounded text-sm outline-pink-500 text-black'
                                                            placeholder='Transaction ID (TrxID)'
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="nagad" className={`cursor-pointer flex justify-center items-center text-sm  font-bold border mt-1 mb-1 p-3 rounded ${formData.payment === "nagad" ? 'bg-orange-50 border-orange-500' : ''}`}>
                                                <input value="nagad" onChange={handleChange} name='payment' className='accent-orange-500 cursor-pointer' id='nagad' type="radio" />
                                                <label name='payment' className='cursor-pointer' htmlFor="nagad">
                                                    <img src="/nagad.svg" width={60} alt="Nagad" />
                                                </label>
                                            </label>
                                            {
                                                formData.payment === 'nagad' && (
                                                    <div className='bg-orange-50 p-4 rounded border border-orange-200 mb-4 shadow-sm'>
                                                        <div className='flex items-center gap-2 mb-2'>
                                                            <span className="material-symbols-outlined text-orange-600">send_money</span>
                                                            <p className='text-sm font-bold text-black'>নগদ সেন্ড মানি (Personal)</p>
                                                        </div>

                                                        <p className='text-sm text-gray-700'>
                                                            আপনার নগদ অ্যাপ এর <strong>"Send Money"</strong> অপশনে যান এবং নিচের নাম্বারে টাকা পাঠান:
                                                        </p>
                                                        {paymentMe.map((item, index) => (

                                                            <h3 key={item._id || index} className='text-2xl font-bold text-orange-600 my-2 text-center select-all'>{item.nagad_personal}</h3>
                                                        ))}

                                                        <div className='bg-white p-2 rounded border border-orange-100'>
                                                            <p className='text-xs text-gray-500 mb-1'>টাকা পাঠানোর পর তথ্য দিন:</p>
                                                            <input
                                                                required
                                                                name="senderNumber"
                                                                onChange={handleChange}
                                                                className='w-full border p-2 rounded text-sm outline-orange-500 text-black mb-2'
                                                                placeholder='যে নম্বর থেকে টাকা পাঠিয়েছেন'
                                                            />
                                                            <input
                                                                required
                                                                name="trxID"
                                                                onChange={handleChange}
                                                                className='w-full border p-2 rounded text-sm outline-orange-500 text-black'
                                                                placeholder='Transaction ID (TrxID)'
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-auto flex justify-center items-center bottom-0'>
                                    <button
                                        onClick={handleOrder}
                                        disabled={isOutOfStock || isOrdering}
                                        className={`flex justify-center font-bold  items-center cursor-pointer text-center rounded-sm  bg-slate-800 h-10 w-full text-white
                                                ${isOutOfStock
                                                ? "bg-slate-600 cursor-not-allowed"
                                                : isOrdering
                                                    ? "bg-slate-700 cursor-wait"
                                                    : "bg-slate-700 hover:bg-slate-700"
                                            }`}
                                    >অর্ডার করুন</button>
                                </div>

                                <div className='flex justify-center items-center gap-10'>
                                    {paymentMe.map((item, index) => (
                                        <div key={index} className="contents">
                                            <Link target='_blank' href={item.whatsapp}><h3 className='flex justify-center font-bold items-center cursor-pointer text-center rounded-sm bg-slate-800 p-2 px-7 w-full text-white'>WhatsApp</h3></Link>
                                            <Link target='_blank' href={item.telegram}><h3 className='flex justify-center font-bold items-center cursor-pointer text-center rounded-sm bg-slate-800 p-2 px-7 w-full text-white'>Telegram</h3></Link>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                        <div className='border rounded-sm mt-4 bg-white shadow shadow-black'>
                            <div className=' flex gap-3 m-1 mb-2'>
                                <button onClick={() => setfooterTab(1)}
                                    className={`rounded cursor-pointer font-bold text-sm p-1 ${footerTab === 1 ? "bg-red-600 text-white" : "bg-amber-600 text-white hover:bg-amber-500"}`}
                                >
                                    Description
                                </button>

                                <button onClick={() => setfooterTab(2)}
                                    className={`rounded cursor-pointer font-bold text-sm p-1 ${footerTab === 2 ? "bg-red-600 text-white" : "bg-amber-600 text-white hover:bg-amber-500"}`}
                                >
                                    Order policy
                                </button>

                            </div>
                            <div>
                                {footerTab === 1 && (
                                    <div>
                                        <p>{product.dsce}</p>
                                    </div>
                                )}
                                {footerTab === 2 && (
                                    <div>
                                        {paymentMe.map((item, index) => (
                                            <p key={item._id || index}>{item.policy}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Allproduct







