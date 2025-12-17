import React from 'react'
import Footer from '../components/Footer'
import SettingFotter from '../components/SettingFotter'



const setting = () => {
  return (
    <div className='h-[71vh]  w-full flex flex-col items-center'>
      <h1>Working Progress</h1>
      <SettingFotter />
      
    </div>
  )
}

export default setting



export const metadata = {
  title: "Settings | Shopico",
  description: "Manage your Shopico account settings, update profile information, and change preferences.",
  
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  openGraph: {
    title: "Account Settings - Shopico",
    robots: "noindex",
  },
};