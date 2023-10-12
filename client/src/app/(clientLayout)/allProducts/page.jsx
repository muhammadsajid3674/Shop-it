"use client";
import ProductCard from "@/components/ProductCard";
import { dateFormat } from "@/utils/date";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
   const { data: session, status } = useSession();
   const [products, setProducts] = useState();

   const addToCart = async (productId) => {
      await fetch(apiRoute.addToCart, {
         method: "POST",
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
         },
         body: JSON.stringify({ productId, quantity: 1 }),
      });
      toast.success("Product Added to cart");
   };
   useEffect(() => {
      const getProducts = async () => {
         const response = await fetch(apiRoute.getPorducts, {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${session?.user.token}`,
            },
         });
         const result = await response.json();
         setProducts(result);
      };
      if (status == "authenticated") getProducts();
   }, [status]);
   console.log(products);
   return (
      <div className='grid grid-cols-4 gap-4 flex-1'>
         {products &&
            products.map((product) => (
               <ProductCard
                  key={product._id}
                  productId={product._id}
                  src={product.imageUrl}
                  title={product.name}
                  date={dateFormat(product.createdAt)}
                  addToCart={addToCart}
                  price={product.price}
               />
            ))}
      </div>
   );
};

export default page;
