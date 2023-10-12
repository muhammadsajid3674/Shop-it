import Image from "next/image";
import { DotMenu } from "./ui/Icon";
import { Text } from ".";
import Loader from "./ui/Loader";
import { Button } from "./ui";
import { useState } from "react";

const ProductCard = ({ title, productId, src, addToCart, date, price }) => {
   const [loader, setLoader] = useState(false);
   const handleAddToCart = async (e) => {
      setLoader(true);
      await addToCart(productId);
      setLoader(false);
   };
   return (
      <div className='flex flex-col gap-5 bg-cardLight rounded-md shadow-md p-5'>
         <div className='flex relative justify-end'>
            <div className='group'>
               <DotMenu className=' text-secondary cursor-pointer' />
               <ul className='hidden hoverNavLink group-hover:flex flex-col absolute rounded-md shadow bg-cardLight right-0 z-10'>
                  <li>Add to Whishlist</li>
               </ul>
            </div>
         </div>
         <div className='flex flex-col justify-center items-center'>
            <div className='flex relative justify-center items-center rounded-full h-28 w-28'>
               <Image
                  src={src}
                  alt={title}
                  fill
                  className='object-cover rounded-full'
               />
            </div>
            <Text variant='price' className='mt-5'>
               {title}
            </Text>
            <Text variant='infoXs'>{date}</Text>
         </div>
         <div className='flex items-center justify-between'>
            <Text variant='price'>${price.toLocaleString()}</Text>
            {loader ? (
               <Loader />
            ) : (
               <Button
                  variant='outline'
                  onClick={handleAddToCart}
                  title='Add to Cart'
               />
            )}
         </div>
      </div>
   );
};

export default ProductCard;
