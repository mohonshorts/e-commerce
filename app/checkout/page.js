"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoArrowBackCircle } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";




const CheckoutPage = () => {
  const { cart } = useCart();
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [paymentS, setPaymentS] = useState([])
  const deliveryCharge = paymentS.length > 0 ? Number(paymentS[0].cost) : 0;
  const [isOrdering, setIsOrdering] = useState(false);
  const grandTotal = total + deliveryCharge;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    upazila: "",
    address: "",
    payment: "cash",
    senderNumber: "",
    trxID: "",
  });

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => {
      const priceString = item.price ? String(item.price).replace(/[^0-9.]/g, "") : "0";
      const priceNumber = parseFloat(priceString) || 0;
      return acc + (priceNumber * (item.qty || 1));
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {
    const paymentM = async () => {
      try {

        const res = await fetch("/api/add/navtext", { cache: "no-cache" });
        if (!res.ok) {
          console.log("failed")
          return;
        }
        const data = await res.json()
        console.log(typeof (product))
        if (data.success) {
          setPaymentS(data.result)

        }
      } catch (error) {

        console.error("Error:", error)
      }
    }
    paymentM()

  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

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
    }
    if (isOrdering) return;
    setIsOrdering(true);
    if ((formData.payment === 'bkash' || formData.payment === 'nagad') && (!formData.senderNumber || !formData.trxID)) {
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

    const formattedProducts = cart.map(item => ({
      productId: item._id,
      productName: item.title,
      productImage: item.img_p,
      price: parseFloat(String(item.price).replace(/[^0-9.]/g, "")),
      quantity: item.qty || 1,
      subtotal: parseFloat(String(item.price).replace(/[^0-9.]/g, "")) * (item.qty || 1)
    }));

    const orderData = {
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      district: formData.upazila,
      upazila: formData.upazila,
      fullAddress: `${formData.address}, ${formData.upazila}`,

      products: formattedProducts,

      deliveryCost: deliveryCharge,
      totalPrice: grandTotal,

      paymentMethod: formData.payment,
      senderNumber: formData.senderNumber,
      transactionId: formData.trxID,

      status: "pending"
    };

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Order place successfully', {
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
        // localStorage.removeItem("shopico_cart");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error('Order faild try again!', {
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
        console.error(data);
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error('Something went wrong!', {
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
      setIsOrdering(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-gray-500 mb-4">Your cart is empty.</h2>
        <Link href="/allproductlist" className="bg-blue-600 text-white px-6 py-2 rounded">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5 bg-gray-50 min-h-screen">
      <div>
        <Link href="/cart"><IoArrowBackCircle className="material-symbols-outlined " /></Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center pt-5">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="flex flex-col md:flex-row gap-8 pb-10">

        <div className="md:w-2/3 space-y-6">

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className='flex items-center gap-2 mb-4 border-b pb-2'>
              <MdAccountCircle className="material-symbols-outlined " />
              <h2 className="text-xl font-bold">Billing Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold mb-1">Full Name</label>
                <input required name="name" onChange={handleChange} type="text" className="w-full border p-2 rounded outline-blue-500" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Phone Number</label>
                <input required name="phone" onChange={handleChange} type="text" className="w-full border p-2 rounded outline-blue-500" placeholder="017xxxxxxxx" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">Email Address</label>
              <input required name="email" onChange={handleChange} type="email" className="w-full border p-2 rounded outline-blue-500" placeholder="example@gmail.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Upazila / City</label>
                <input required name="upazila" onChange={handleChange} type="text" className="w-full border p-2 rounded outline-blue-500" placeholder="Dhaka" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Full Address</label>
                <input required name="address" onChange={handleChange} type="text" className="w-full border p-2 rounded outline-blue-500" placeholder="House/Road/Village" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className='flex items-center gap-2 mb-4 border-b pb-2'>
              <MdOutlinePayments className="material-symbols-outlined " />
              <h2 className="text-xl font-bold">Select Payment Method</h2>
            </div>

            <div className='flex flex-col gap-3'>
              <label className={`cursor-pointer border p-4 rounded flex items-center gap-3 transition ${formData.payment === "cash" ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="payment" value="cash" checked={formData.payment === "cash"} onChange={handleChange} className="accent-blue-600 w-5 h-5" />
                <span className="font-bold">Cash on Delivery</span>
              </label>

              <div className={`border rounded transition ${formData.payment === "bkash" ? 'border-pink-500 bg-pink-50' : ''}`}>
                <label className="cursor-pointer p-4 flex items-center gap-3">
                  <input type="radio" name="payment" value="bkash" checked={formData.payment === "bkash"} onChange={handleChange} className="accent-pink-600 w-5 h-5" />
                  <img src="/bkash.svg" width={60} alt="Bkash" />
                </label>

                {formData.payment === 'bkash' && (
                  <div className="p-4 pt-0 border-t border-pink-200 mt-2">
                    <p className="text-sm text-gray-700 mb-2">আপনার বিকাশ অ্যাপ থেকে <strong>"Payment"</strong> করুন নিচের নাম্বারে:</p>
                    {paymentS.map((item, idx) => (
                      <h3 key={idx} className="text-xl font-bold text-pink-600 text-center bg-white p-2 rounded border border-pink-200 mb-3">{item.bkash_payment}</h3>
                    ))}
                    <div className="space-y-2">
                      <input required name="senderNumber" onChange={handleChange} placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন" className="w-full p-2 border rounded outline-pink-500" />
                      <input required name="trxID" onChange={handleChange} placeholder="Transaction ID (TrxID)" className="w-full p-2 border rounded outline-pink-500" />
                    </div>
                  </div>
                )}
              </div>

              <div className={`border rounded transition ${formData.payment === "nagad" ? 'border-orange-500 bg-orange-50' : ''}`}>
                <label className="cursor-pointer p-4 flex items-center gap-3">
                  <input type="radio" name="payment" value="nagad" checked={formData.payment === "nagad"} onChange={handleChange} className="accent-orange-600 w-5 h-5" />
                  <img src="/nagad.svg" width={60} alt="Nagad" />
                </label>

                {formData.payment === 'nagad' && (
                  <div className="p-4 pt-0 border-t border-orange-200 mt-2">
                    <p className="text-sm text-gray-700 mb-2">আপনার নগদ অ্যাপ থেকে <strong>"Send Money"</strong> করুন নিচের নাম্বারে:</p>
                    {paymentS.map((item, idx) => (
                      <h3 key={idx} className="text-xl font-bold text-orange-600 text-center bg-white p-2 rounded border border-orange-200 mb-3">{item.nagad_personal}</h3>
                    ))}
                    <div className="space-y-2">
                      <input required name="senderNumber" onChange={handleChange} placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন" className="w-full p-2 border rounded outline-orange-500" />
                      <input required name="trxID" onChange={handleChange} placeholder="Transaction ID (TrxID)" className="w-full p-2 border rounded outline-orange-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-5">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, index) => (
                <div key={item._id || index} className="flex gap-3 items-center border-b pb-3 last:border-0">
                  <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden shrink-0">
                    <img src={item.img_p} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-bold line-clamp-2">{item.title}</p>
                    <p className="text-gray-500 mt-1">{item.qty} x ৳{item.price}</p>
                  </div>
                  <div className="font-bold text-gray-800">
                    ৳{(parseFloat(String(item.price).replace(/[^0-9.]/g, "")) * (item.qty || 1)).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">৳{total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                {paymentS.map((item, index) => (
                  <span key={item._id || index} className="font-bold">৳{item.cost}</span>
                ))}
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl border-t mt-4 pt-4 text-black">
              <span>Total</span>
              {paymentS.map((item, index) => (
                <span key={item._id || index}>৳{grandTotal.toLocaleString()}</span>
              ))}
            </div>

            <button
              type="submit"
              disabled={isOrdering}
              className={`w-full bg-slate-800 text-white py-4 rounded-lg mt-6 font-bold text-lg hover:bg-slate-700 transition shadow-lg
                                                ${isOrdering
                  ? "bg-slate-700 cursor-wait"
                  : "bg-slate-700 hover:bg-slate-700"
                }`}
            >
              Place Order
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
              By placing this order, you agree to our Terms and Conditions.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
};

export default CheckoutPage;