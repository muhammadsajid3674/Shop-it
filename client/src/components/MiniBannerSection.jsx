"use client";
import MiniBanner from "./MiniBanner";

const MiniBannerSection = () => {
   return (
      <section className='flex gap-4'>
         <MiniBanner
            title='Amazon Basic'
            src='/assets/images/controller.png'
            desc="Shop Today's Deals, Lightning Deals, and limited-time discounts"
         />
         <MiniBanner
            title='Deals & Promotions'
            src='/assets/images/clock.png'
            desc="Shop Today's Deals, Lightning Deals, and limited-time discounts"
         />
      </section>
   );
};

export default MiniBannerSection;
