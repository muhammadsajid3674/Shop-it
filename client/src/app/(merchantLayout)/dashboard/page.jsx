"use client";
import { DashboardCard } from "@/components/ui";
import { apiRoute } from "@/utils/apiRoutes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const page = () => {
   const { data: session, status } = useSession();
   const [products, setProducts] = useState();
   const removeProduct = async (productId) => {
      await fetch(apiRoute.deleteProduct, {
         method: "DELETE",
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
         },
         body: JSON.stringify({ productId }),
      });
      setProducts((prev) => prev?.filter((list) => list.id !== productId));
   };
   useEffect(() => {
      const getProducts = async () => {
         const response = await fetch(apiRoute.getProduct, {
            method: "GET",
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${session?.user.token}`,
            },
         });
         const result = await response.json();
         setProducts(result?.products);
      };
      if (status == "authenticated") getProducts();
   }, [status]);

   return (
      <div className='grid grid-cols-4 gap-4 flex-1'>
         {products &&
            products.map((product) => (
               <DashboardCard
                  key={product._id}
                  productId={product._id}
                  removeProducts={removeProduct}
                  src={product.imageUrl}
                  title={product.name}
               />
            ))}
      </div>
   );
};

export default page;
