"use client";
import { apiRoute } from "@/utils/apiRoutes";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext({
   itemCount: 0,
   updateCartCount: (count) => {},
});

export const CartProvider = ({ children }) => {
   const { data: session, status } = useSession();
   const [itemCount, setItemCount] = useState(0);
   const updateCartCount = (count) => {
      setItemCount(count);
   };
   useEffect(() => {
      if (status == "authenticated") {
         const getCartCount = async () => {
            const response = await fetch(apiRoute.cartCount, {
               headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${session?.user.token}`,
               },
            });
            const result = await response.json();
            setItemCount(result?.count);
         };
      }
   }, []);
   return (
      <CartContext.Provider value={{ itemCount, updateCartCount }}>
         {children}
      </CartContext.Provider>
   );
};

export const useCartContext = () => useContext(CartContext);
