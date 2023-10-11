"use client";

import Image from "next/image";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Text from "./ui/Text";
import Badge from "./ui/Badge";
import { RightArrow, StarIcon } from "./ui/Icon";

const HeroSection = () => {
   return (
      <div className='flex p-20 gap-10 bg-cardPrimary'>
         <div className='flex flex-col gap-4 flex-1 justify-center'>
            <Heading
               title={"SHOP COMPUTERS & ACCESSORIES"}
               variant={"heading1"}
            />
            <Text variant={"description"} className={"w-2/4"}>
               Shop laptops, desktops, monitors, tablets, PC gaming, hard drive
               and storage, accessories and more
            </Text>
            <div>
               <Button variant='outline' size='medium' title='View more' />
            </div>
         </div>
         <div className='relative flex flex-1 items-end h-72'>
            <Badge
               variant={"round"}
               className={"absolute flex -top-5 right-14 z-10"}
               title={"30%"}
            />
            <Image
               src='/assets/images/real-headphones.png'
               alt=''
               className='absolute w-[35rem] -right-20 -top-16'
               height={300}
               width={300}
            />
            <div className='flex bg-cardLight rounded-lg p-6 w-3/4'>
               <div className='flex flex-col gap-2 flex-1'>
                  <Text variant={"infoXs"}>Computer & Accessories</Text>
                  <Text variant={"productTitle"}>
                     JBL T460BT BLACK Headphones
                  </Text>
                  <div className='flex items-center gap-2 text-secondary text-xs'>
                     <div className='flex items-center'>
                        <StarIcon rating={5} />
                     </div>
                     <Text variant={"infoSx"}>1245 reviews</Text>
                  </div>
                  <Text variant={"price"}> $125.00</Text>
                  <Text variant={"infoSx"} className={"line-through"}>
                     $250.00
                  </Text>

                  <Text variant={"infoXs"}>
                     View more <RightArrow />
                  </Text>
               </div>
               <div className='flex-1'></div>
            </div>
         </div>
      </div>
   );
};

export default HeroSection;
