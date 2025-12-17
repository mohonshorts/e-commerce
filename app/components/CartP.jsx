"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MdDeleteOutline } from "react-icons/md";
import { useCart } from "./context/CartContext";
import { useRouter } from "next/navigation";


export default function CartPage() {
  const [cart, setCart] = useState([])
  const [cartProduct, setCartProduct] = useState([])
  const {setCheckoutData} = useCart()
  const router = useRouter()

  const handleProceed = () => {
    setCheckoutData(cartProduct)
    router.push("/checkout")
  }
  


  const fetchCartDataFromDb = async (allIds) => {
    try {
      const res = await fetch("api/add/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: allIds }),
      })
      const data = await res.json()
      console.log(data)
      const productsQty = data.map((product) => ({
        ...product,
        quay: 1,
      }))
      setCartProduct(productsQty)
    } catch (error) {
      console.log(error)
    }
  }

  const handleQuantity = (id, type) => {
    setCartProduct((prevItem) =>
      prevItem.map((item) => {
        if (item._id === id) {
          if (type === "inc") {
            return { ...item, quay: item.quay + 1}
          }
          else if (type === "dec" && item.quay > 1) {
            return { ...item, quay: item.quay - 1 }
          }
        }
        return item
      })
    )
  }

  const deleteItem = (id) => {
    const filtered = cartProduct.filter((item) => item._id !== id)
    setCartProduct(filtered)

    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    const updatedCart = savedCart.filter((item) => item.id !== id)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCart(updatedCart);
  }




  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCart(savedCart)
    if (savedCart.length > 0) {
      const onlyIds = savedCart.map((item) => item.id)
      fetchCartDataFromDb(onlyIds)
    }
  }, [])


  const totalPrice = cartProduct.reduce((acc, item) => acc + (Number(item.price) * item.quay), 0);


  return (
    <div >
      <h3 className="mt-3 text-2xl font-bold ml-2 ">Your Cart -</h3>
      <div>
        {cartProduct.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <p>No product in Cart</p>
            <Link href="/allproductlist" className="p-3 text-white bg-slate-800 rounded">Add Product</Link>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center ">
            {cartProduct.map((item) => (
              <div key={item._id} className="border flex m-2 rounded md:w-3/7 w-3/4 relative bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]">
                <div className="h-23 md:h-35 w-26 md:w-40">
                <img src={item.img_p} alt="" className="w-full h-full md:w-40 rounded" />
                </div>
                <div className="flex flex-col  ">
                  <p className="line-clamp-1 md:line-clamp-4">{item.title}</p>
                  <div className="flex justify-between">
                    <p className="absolute bottom-0 text-sm font-bold">Price: {item.price}</p>
                    <div className="absolute bottom-0 right-0 m-3">
                      <button onClick={() => handleQuantity(item._id, "dec")} className="bg-slate-800 text-white px-2 py-1 mx-2 rounded hover:bg-slate-700">-</button>
                      <span>{item.quay}</span>
                      <button onClick={() => handleQuantity(item._id, "inc")} className="bg-slate-800 text-white px-2 py-1 mx-2 rounded hover:bg-slate-700">+</button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button className="absolute top-0 right-0 " onClick={() => deleteItem(item._id)}><MdDeleteOutline className="material-symbols-outlined cursor-pointer " /></button>
                </div>
              </div>
            ))}
            <div className="border mt-3 h-35 w-3/4 md:w-3/7 rounded bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]">
              <h3 className="text-xl m-1">Order Summary</h3>
              <div className='w-full h-px bg-slate-800 '></div>
              <div className="flex justify-between m-2 font-bold">
                Total:
                <span>৳{totalPrice}</span>
              </div>
              <div className="flex justify-center items-center">
                <button onClick={handleProceed} className="p-3 rounded text-white px-8 bg-slate-800">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}