import { DashboardCard } from "@/components/ui";

const page = () => {
   return (
      <div className='grid grid-cols-4 gap-4 flex-1'>
         <DashboardCard src='/assets/images/controller.png' title='Product 1' />
         <DashboardCard src='/assets/images/controller.png' title='Product 1' />
         <DashboardCard src='/assets/images/controller.png' title='Product 1' />
         <DashboardCard src='/assets/images/controller.png' title='Product 1' />
      </div>
   );
};

export default page;
