import Text from "./Text";
import Heading from "./Heading";
import Button from "./Button";
import Image from "next/image";

const Banner = ({ title, src, desc }) => {
   return (
      <section className='flex bg-cardPrimary'>
         <div className='flex flex-1 flex-col gap-5  p-16 pr-0'>
            <Text variant='infoXs'>Discover Amazon</Text>
            <Heading variant='heading1' className='w-3/4' title={title} />
            <Text variant='description' className='w-2/4'>
               {desc}
            </Text>
            <Button variant='outline' title='View more' />
         </div>
         <div className='flex-1 relative pr-16 overflow-hidden'>
            {src && title && (
               <Image
                  src={src}
                  alt={title}
                  className='object-cover -mb-10'
                  height={0}
                  width={500}
               />
            )}
         </div>
      </section>
   );
};

export default Banner;
