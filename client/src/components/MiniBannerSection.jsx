'use client';
import Banner from "./ui/Banner";

const MiniBannerSection = () => {
   return (
      <section className='flex gap-4'>
         <Banner
            title='Amazon Basic'
            src='/assets/images/controller.png'
            desc="Shop Today's Deals, Lightning Deals, and limited-time discounts"
         />
         <Banner
            title='Deals & Promotions'
            src='/assets/images/clock.png'
            desc="Shop Today's Deals, Lightning Deals, and limited-time discounts"
         />
      </section>
   );
};

export default MiniBannerSection;
