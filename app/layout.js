import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from "./components/context/CartContext";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Shopico - Best Online Shopping Platform | Shop Electronics, Fashion & More',
  description: 'Experience the best online shopping with Shopico. Buy high-quality electronics, fashion, and home essentials at unbeatable prices. Fast shipping & secure checkout.',
  keywords: ['Shopico', 'Online Shopping', 'Ecommerce', 'Buy Online', 'Best Deals', 'Fashion', 'Electronics'],
  openGraph: {
    title: 'Shopico - Best Online Shopping Platform',
    description: 'Experience the best online shopping with Shopico. Great deals and fast shipping.',
    url: 'https://shopico.com',
    siteName: 'Shopico',
    images: [
      {
        url: '/shopico.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/shopico.png', // public ফোল্ডারে থাকা আইকন
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
          <CartProvider>
            {children}
          </CartProvider>
          <div className='md:hidden z-1'>
            <Footer />
          </div>

        </body>
      </html>
    </ClerkProvider>
  );
}


