import MiniNavbar from "@/components/MiniNavbar";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
   return (
      <div className='container mx-auto'>
         <MiniNavbar />
         <Navbar />
         {children}
      </div>
   );
}
