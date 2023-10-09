"use client";
import {
   Banner,
   BestSeller,
   Card,
   Footer,
   FooterMenu,
   HeroSection,
   LastViewed,
   MiniBanner,
   ProductBanner,
   SliderItem,
   SuggestedProduct,
   Text,
} from "@/components";
import { category, miniBanner1, slider1 } from "@/utils/data";
import { useSession } from "next-auth/react";

const Home = () => {
   const { data: session, status } = useSession();
   return (
      <div className='flex flex-col gap-4'>
         <HeroSection />
         <section className='flex gap-5 bg-cardSecondary p-6'>
            {slider1.map((data) => (
               <SliderItem
                  key={data.id}
                  imageSrc={data.src}
                  title={data.title}
                  miniDesc={data.desc}
               />
            ))}
         </section>
         <section>
            <Text variant={"productTitle"}>Shop by categories</Text>
            <div className='flex gap-4 mt-6'>
               {category.map((data) => (
                  <Card
                     key={data.id}
                     src={data.src}
                     title={data.title}
                     type='category'
                  />
               ))}
            </div>
         </section>
         <section>
            <div className='flex gap-4'>
               {miniBanner1.map((data) => (
                  <MiniBanner
                     key={data.id}
                     title={data.title}
                     src={data.src}
                     desc={data.desc}
                  />
               ))}
            </div>
         </section>
         <Banner
            title='AMAZON DELIVERS TO YOU'
            desc='Worldwide shipping. We ship to over 100 countries and regions, right at your doorstep.'
            src='/assets/images/orderBox.png'
         />
         <LastViewed />
         <BestSeller />
         <section className='flex gap-4'>
            <ProductBanner />
            <ProductBanner />
         </section>
         <SuggestedProduct />
         <section className='flex gap-4 bg-cardSecondary p-6'>
            {slider1.map((data) => (
               <SliderItem
                  key={data.id}
                  imageSrc={data.src}
                  title={data.title}
                  miniDesc={data.desc}
               />
            ))}
         </section>
         <Banner
            title='AMAZON DELIVERS TO YOU'
            desc='Worldwide shipping. We ship to over 100 countries and
                    regions, right at your doorstep.'
            src='/assets/images/orderBox.png'
         />

         <FooterMenu />
         <Footer />
      </div>
   );
};

export default Home;
