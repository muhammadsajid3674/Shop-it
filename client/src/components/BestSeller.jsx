import { lastViewed } from "@/data/lastViewed";
import Card from "./ui/Card";
import Text from "./ui/Text";

const BestSeller = () => {
   return (
      <section>
         <Text variant='productTitle' className='mb-6'>
            Amazon Top Sellers
         </Text>
         <div className='flex gap-4'>
            {lastViewed.map((data) => (
               <Card
                  key={data.id}
                  src={data.src}
                  title={data.title}
                  miniTitle={data.miniTitle}
                  rating={data.rating}
                  reviewCount={data.reviewCount}
                  price={data.price}
               />
            ))}
         </div>
      </section>
   );
};

export default BestSeller;
