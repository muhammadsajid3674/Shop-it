import Image from "next/image";
import { Button, Text } from "./ui";
import { RightArrow } from "./ui/Icon";

const MiniBanner = ({ title, desc, src, actionButton }) => {
   return (
      <div className='flex flex-1 bg-cardSecondary'>
         <div className='flex flex-1 flex-col gap-3 p-5'>
            <Text variant='productTitle'>{title}</Text>
            <Text variant='description'>{desc}</Text>
            <div>
               {actionButton ? (
                  <Button variant='outline' />
               ) : (
                  <Text variant='infoXs'>
                     See more <RightArrow />
                  </Text>
               )}
            </div>
         </div>
         <div className='flex relative flex-1 justify-end'>
            {src && title && (
               <Image src={src} className='object-cover' alt={title} fill />
            )}
         </div>
      </div>
   );
};

export default MiniBanner;
