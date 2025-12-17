import React from 'react'
import Allproduct from '../components/Allproduct'
import Navbar from '../components/Navbar'

const allprouct = () => {
  return (
    <div>
      <Navbar/>
      <Allproduct/>
    </div>
  )
}

export default allprouct


export const metadata = {
  title: "সব পণ্য | Shopico",
  description: "আমাদের কালেকশনে থাকা সব উন্নতমানের পণ্যগুলো একসাথে দেখুন। সাশ্রয়ী মূল্যে সেরা পণ্য কিনুন আমাদের অনলাইন শপ থেকে।",
  keywords: ["online shopping", "ecommerce", "best products", "সাশ্রয়ী পণ্য", "অনলাইন শপিং"],
  openGraph: {
    title: "Shopping Product",
    description: "You have items waiting in your cart. Shop now!",
    url: "https://e-commerce-umber-kappa.vercel.app/",
    siteName: "Shopico",
    images: [
      {
        url: "/shopico.png", // একটি কার্ট আইকন বা শপের লোগো ইমেজ পাথ
        width: 800,
        height: 600,
      },
    ],
  }
};
