"use client";
import { Text } from "@/components";
import CartCard from "@/components/CartCard";
import { useCartContext } from "@/context/cart";
import { apiRoute } from "@/utils/apiRoutes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const page = () => {
   const { data: session, status } = useSession();
   const [products, setProducts] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const { itemCount } = useCartContext();
   useEffect(() => {
      const cartProduct = async () => {
         const response = await fetch(apiRoute.viewCart, {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${session?.user.token}`,
            },
         });
         const result = await response.json();
         const total = result?.cart.reduce((sum, product) => {
            console.log("sum :>> ", sum);
            console.log("product :>> ", product);
            return sum + product.productData[0].price * product.quantity;
         }, 0);
         setProducts(result?.cart);
         setTotalPrice(total);
      };
      if (status == "authenticated") cartProduct();
   }, [status]);
   return (
      <div className='flex'>
         <div className='bg-cardLight flex-1 p-10'>
            <div className='flex justify-between border-b border-primary p-5'>
               <Text variant='titleXl'>Shopping Cart</Text>
               <Text variant='titleXl'>{itemCount} Items</Text>
            </div>
            <div className='flex'>
               <Text variant='price' className='flex-1'>
                  Item
               </Text>
               <Text variant='price' className='flex-1'>
                  Quantity
               </Text>
               <Text variant='price' className='flex-1'>
                  Price
               </Text>
            </div>

            {products &&
               products.map((product) => (
                  <CartCard
                     imageUrl={product.productData[0].imageUrl}
                     price={product.productData[0].price}
                     quantity={product.quantity}
                     productTitle={product.productData[0].name}
                  />
               ))}
         </div>
         <div className='flex flex-col gap-5 w-96 bg-cardPrimary p-10'>
            <div className='p-5 border-b border-primary'>
               <Text variant='titleXl'>Order Summary</Text>
            </div>
            <div className='flex justify-between'>
               <Text variant='price'>Total Price</Text>
               <Text variant='price'>${totalPrice.toLocaleString()}</Text>
            </div>
         </div>
      </div>
   );
};

export default page;
