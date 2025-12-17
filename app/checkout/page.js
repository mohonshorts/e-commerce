import React from 'react'
import CheckoutPage from '../components/Checkout'

const checkout = () => {
  return (
    <div>
      < CheckoutPage/>
    </div>
  )
}

export default checkout

export const metadata = {
  title: "চেকআউট | Shopico",
  description: "আপনার অর্ডারটি সম্পন্ন করতে প্রয়োজনীয় তথ্য প্রদান করুন। Shopico-তে নিরাপদ পেমেন্ট এবং দ্রুত ডেলিভারি নিশ্চিত করুন।",
  
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "অর্ডার সম্পন্ন করুন | Shopico",
    description: "Shopico থেকে আপনার পছন্দের পণ্যটি অর্ডার করতে চেকআউট সম্পন্ন করুন।",
    url: "https://e-commerce-umber-kappa.vercel.app/",
    siteName: "Shopico",
    images: [
      {
        url: "/shopico.png", // একটি পেমেন্ট বা সিকিউরিটি রিলেটেড ব্যানার
        width: 1200,
        height: 630,
        alt: "Secure Checkout Shopico",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
};