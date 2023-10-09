"use client";
import { Text } from ".";
import Link from "next/link";
import { LeftArrow } from "./ui/Icon";
import { Button } from "./ui";
import { usePathname } from "next/navigation";

const AuthNav = () => {
   const pathname = usePathname();
   return (
      <>
         <Text variant='titleSm' className='flex flex-1 items-center'>
            <Link href='/home'>
               <LeftArrow />
               Back to store
            </Link>
         </Text>
         <div>Logo</div>
         <div className='flex flex-1 items-center justify-end'>
            <Link
               className='flex gap-5 items-center '
               href={pathname == "/login" ? "/signup" : "/login"}
            >
               <Text variant='titleSm'>
                  {pathname == "/login"
                     ? "Not a member ?"
                     : "Already a member ?"}
               </Text>
               <Button
                  variant='outline'
                  title={pathname == "/login" ? "Sign In" : "Sign Up"}
               />
            </Link>
         </div>
      </>
   );
};

export default AuthNav;
