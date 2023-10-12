"use client";
import { Card, Text } from "./ui";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { apiRoute } from "@/utils/apiRoutes";

const BestSeller = () => {
   const { data: session, status } = useSession();
   const [products, setProducts] = useState([]);
   useEffect(() => {
      const getProducts = async () => {
         const response = await fetch(apiRoute.getAllProducts, {
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
      <section>
         <Text variant='productTitle' className='mb-6'>
            Amazon Top Sellers
         </Text>
         <div className='flex gap-4'>
            {products &&
               products.map((data) => (
                  <Card
                     key={data._id}
                     src={data.imageUrl}
                     title={data.name}
                     miniTitle={data.description}
                     rating={5}
                     reviewCount={342}
                     price={data.price}
                  />
               ))}
         </div>
      </section>
   );
};

export default BestSeller;
