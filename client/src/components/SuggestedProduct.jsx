"use client";
import { Card, Text } from "./ui";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiRoute } from "@/utils/apiRoutes";

const SuggestedProduct = () => {
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
            Tomas, must have for you
         </Text>
         <div className='flex gap-4'>
            {products.map((data) => (
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

export default SuggestedProduct;
