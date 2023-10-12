"use client";
import { Text } from "@/components";
import { Button, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
   email: z.string().email({ message: "Please enter a valid Email" }),
   password: z.string(),
});

const Login = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(schema) });

   const onSubmit = async (data) => {
      await signIn("credentials", {
         email: data.email,
         password: data.password,
         callbackUrl: "/home",
      });
   };
   return (
      <div className='flex flex-col gap-4 items-center bg-cardSecondary rounded-md shadow-lg w-96 p-10'>
         <Text variant='price' className='inline-block max-w-max'>
            Sign In
         </Text>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex w-full flex-col gap-5'
         >
            <div>
               <Input
                  variant='underLine'
                  placeholder='Email'
                  register={register("email")}
               />
               {errors.email?.message && (
                  <Text variant='error' className='ml-2 mt-2'>
                     {errors.email?.message}
                  </Text>
               )}
            </div>

            <div>
               <Input
                  variant='underLine'
                  type='password'
                  placeholder='Password'
                  register={register("password")}
               />
               {errors.password?.message && (
                  <Text variant='error' className='ml-2 mt-2'>
                     {errors.password?.message}
                  </Text>
               )}
            </div>

            <div className='flex justify-between'>
               <Text
                  variant='description'
                  className='flex cursor-default gap-2 items-center'
               >
                  <input type='checkbox' id='rememberMe'></input>
                  <label htmlFor='rememberMe'>Remember me?</label>
               </Text>
               <Button type='submit' variant='primary' title='Sign In' />
            </div>
         </form>
      </div>
   );
};

export default Login;
