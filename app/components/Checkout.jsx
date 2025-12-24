"use client"
import { useState, useEffect } from "react"
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useCart } from "./context/CartContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CheckoutPage() {
    const router = useRouter()
    const { checkoutData } = useCart()
    const [cost, setCost] = useState(0)
    const [paymentBkash, setPaymentBkash] = useState()
    const [paymentNagad, setPaymentNagad] = useState()
    const [isOrdering, setIsOrdering] = useState(false);
    const [formData, setFormData] = useState({
        name: "", phone: "", email: "", district: "",
        upazila: "", address: "", payment: "cash",
        senderNumber: "", trxID: ""
    })
    useEffect(() => {
        const fetchCost = async () => {
            try {
                const res = await fetch("/api/add/navtext");
                const data = await res.json();
                if (data.result && data.result.length > 0) {
                    setCost(Number(data.result[0].cost) || 0);
                    setPaymentBkash(Number(data.result[0].bkash_payment) || 0);
                    setPaymentNagad(Number(data.result[0].nagad_personal) || 0);

                }
            } catch (err) {
                console.log("Cost fetch error:", err);
            }
        };
        fetchCost();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const subTotal = checkoutData.reduce((acc, item) => acc + (Number(item.price) * item.quay), 0)
    const totalPrice = subTotal + cost

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (checkoutData.length === 0) {
            alert("No product in her")
            return
        }
        if (isOrdering) return;
        setIsOrdering(true);
        const orderPayload = {
            customerName: formData.name,
            customerPhone: formData.phone,
            customerEmail: formData.email,
            distruct: formData.district,
            upazila: formData.upazila,
            fullAddress: formData.address,
            products: checkoutData.map(item => ({
                productId: item._id,
                productName: item.title,
                productImage: item.img_p,
                price: Number(item.price),
                quantity: item.quay,
                subtotal: Number(item.price) * item.quay
            })),
            deliveryCost: cost,
            totalPrice: totalPrice,
            paymentMethod: formData.payment,
            transactionId: formData.trxID || "",
            senderNumber: formData.senderNumber || "",
            status: "pending"
        }
        try {
            const res = await fetch("/api/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload)
            })
            
            fetch("https://my-n8n-server-rjkz.onrender.com/webhook/order-notification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "cors",
                body: JSON.stringify(orderPayload)
            })

            const data = await res.json()
            if (data.success) {
                toast.success('Your Oder Placed successfully!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                localStorage.removeItem("cart")
                setTimeout(() => {
                    router.push("/")
                }, 2000);
            }
        } catch (error) {
            setIsOrdering(false);
            toast.error('try againg leter!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }

    }




    return (
        <div className="max-w-6xl mx-auto p-4 md:mt-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 mb-25">


                <div className='flex flex-col border rounded p-5 bg-white shadow-lg'>
                    <div className='text-xl font-bold flex justify-center items-center gap-2 mb-2'>
                        <MdAccountCircle className="text-2xl" /> Billing Details
                    </div>
                    <div className='bg-black h-px mb-4'></div>

                    <label className='font-bold text-sm'>Full Name</label>
                    <input required name="name" onChange={handleChange} className='rounded-sm h-10 text-sm border p-2 m-1 outline-none text-black' type="text" placeholder='Your Name' />

                    <label className='font-bold text-sm mt-2'>Phone Number</label>
                    <input required name="phone" onChange={handleChange} className='rounded-sm h-10 text-sm border p-2 m-1 outline-none text-black' type="text" placeholder='01XXXXXXXXX' />

                    <label className='font-bold text-sm mt-2'>Email Address</label>
                    <input required name="email" onChange={handleChange} className='rounded-sm h-10 text-sm border p-2 m-1 outline-none text-black' type="email" placeholder='example@gmail.com' />

                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                            <label className='font-bold text-sm'>District</label>
                            <input required name="district" onChange={handleChange} className='w-full rounded-sm h-10 text-sm border p-2 outline-none text-black' type="text" placeholder='District' />
                        </div>
                        <div>
                            <label className='font-bold text-sm'>Upazila</label>
                            <input required name="upazila" onChange={handleChange} className='w-full rounded-sm h-10 text-sm border p-2 outline-none text-black' type="text" placeholder='Upazila' />
                        </div>
                    </div>

                    <label className='font-bold text-sm mt-3'>Full Address</label>
                    <input required name="address" onChange={handleChange} className='rounded-sm h-10 text-sm border p-2 m-1 outline-none text-black' type="text" placeholder='Full address (Village, Road, House)' />
                </div>

                <div className="flex flex-col gap-5">
                    <div className='grid gap-3 justify-center items-center rounded text-center grid-cols-1 border p-5 bg-white shadow-lg'>
                        <h3 className="text-xl font-bold mb-2">Payment Method</h3>

                        <label htmlFor="cash" className={`cursor-pointer flex justify-center items-center text-sm font-bold border p-3 rounded w-full ${formData.payment === "cash" ? 'bg-blue-50 border-blue-500' : ''}`}>
                            <input value="cash" onChange={handleChange} name='payment' className='accent-blue-500 cursor-pointer' defaultChecked id='cash' type="radio" />
                            <span className="ml-2">Cash on delivery</span>
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


                                        <h3 className='text-2xl font-bold text-pink-600 my-2 text-center select-all'>+880 {paymentBkash}</h3>


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


                                            <h3 className='text-2xl font-bold text-orange-600 my-2 text-center select-all'>+880 {paymentNagad}</h3>


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
                    <div className="border p-5 rounded bg-slate-50 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 border-b pb-2">Final Summary</h3>
                        <div className="flex justify-between font-medium mb-1">
                            <span>Total Items:</span>
                            <span>{checkoutData.length}</span>
                        </div>
                        <div className="flex justify-between font-medium mb-1">
                            <span>Subtotal:</span>
                            <span>৳{subTotal}</span>
                        </div>
                        <div className="flex justify-between font-bold text-blue-600 mb-2">
                            <span>Delivery:</span>
                            <span>৳{cost}</span>
                        </div>
                        <div className='h-px bg-gray-300 my-2'></div>
                        <div className="flex justify-between font-bold text-2xl">
                            <span>Grand Total:</span>
                            <span>৳{totalPrice}</span>
                        </div>
                        <button
                            disabled={isOrdering}
                            type="submit"
                            className="w-full bg-slate-800 text-white font-bold py-4 rounded-md mt-6 hover:bg-black transition-all shadow-md">
                            CONFIRM ORDER
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )



}