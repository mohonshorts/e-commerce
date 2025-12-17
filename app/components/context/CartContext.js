"use client"

import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({children}) {
    const [checkoutData, setCheckoutData] = useState([])

    return(
        <CartContext.Provider value={{ checkoutData, setCheckoutData}}>
        {children}
        </CartContext.Provider>
    )
}

export const useCart = ()=> useContext((CartContext))