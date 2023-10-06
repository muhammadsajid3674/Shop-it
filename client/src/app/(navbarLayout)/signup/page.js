"use client";
import { Text } from "@/components";
import { Button, Input } from "@/components/ui";
import { LeftArrow } from "@/components/ui/Icon";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { baseUrl } from "@/app/page";

const Signup = () => {
   // const [formData, setFormData] = useState({
   //    name: "",
   //    email: "",
   //    password: "",
   // });

   // const handleChange = (e) => {
   //    const { name, value } = e.target;
   //    setFormData((prev) => ({
   //       ...prev,
   //       [name]: value,
   //    }));
   // };

   // const [errors, setError] = useState({ name: "", email: "", password: "" });
   // const { name, email, password } = formData;
   // const validateData = () => {
   //    let errors = {};
   //    if (!name) errors.name = "Name is required";
   //    if (!validator.isEmail(email)) errors.email = "Email not valid";
   //    if (!password) errors.password = "Password is required";
   //    return errors;
   // };

   // const handleSubmit = (e) => {
   //    e.preventDefault();
   //    const errors = validateData();
   //    if (Object.keys(errors).length) {
   //       setError(errors);
   //       return;
   //    }
   //    setError({});
   //    console.log("Success");
   // };

   const schema = z
      .object({
         name: z.string().min(1, { message: "Name is required" }),
         email: z.string().email({ message: "Please enter a valid email" }),
         password: z.string().min(8),
         confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
         message: "Passwords don't match",
         path: ["confirmPassword"],
      });

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(schema) });

   const onSubmit = (data) => {
      console.log("data :>> ", data);
      console.log(
         " process.env.NEXT_PUBLIC_APIAUTH :>> ",
         process.env.NEXT_PUBLIC_APIAUTH
      );
      fetch(`${baseUrl}/api/auth/register`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${process.env.NEXT_PUBLIC_APIAUTH}`,
         },
         body: JSON.stringify(data),
      })
         .then((response) => response.json())
         .then((result) => {
            console.log("result :>> ", result);
            if (!result?.success) {
               return toast("Failed");
            }
            toast(result?.message);
         })
         .catch((error) => {
            console.log("Catch :>> ", error);
         });
   };

   return (
      <div className='flex flex-col items-center justify-between bg-primary w-screen h-screen p-10'>
         <div className='flex justify-between container'>
            <Text variant='titleSm' className='flex flex-1 items-center'>
               <Link href='/home'>
                  <LeftArrow />
                  Back to store
               </Link>
            </Text>
            <div>Logo</div>
            <div className='flex flex-1 items-center justify-end gap-5'>
               <Text variant='titleSm'>Not a member? </Text>
               <Button variant='outline' title='Sign In' />
            </div>
         </div>
         <div className='flex flex-col gap-4 items-center bg-cardSecondary rounded-md shadow-lg w-96 p-10'>
            <Text variant='price' className='inline-block max-w-max'>
               Sign Up
            </Text>
            <form
               action=''
               className='flex w-full flex-col gap-5'
               onSubmit={handleSubmit(onSubmit)}
            >
               <div>
                  <Input
                     variant='underLine'
                     placeholder='Name'
                     register={register("name")}
                  />
                  {errors?.name?.message && (
                     <Text variant='error' className='ml-2 mt-2'>
                        {errors?.name?.message}
                     </Text>
                  )}
               </div>
               <div>
                  <Input
                     variant='underLine'
                     placeholder='Email'
                     register={register("email")}
                  />
                  {errors?.email?.message && (
                     <Text variant='error' className='ml-2 mt-2'>
                        {errors?.email?.message}
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
                  {errors?.password?.message && (
                     <Text variant='error' className='ml-2 mt-2'>
                        {errors?.password?.message}
                     </Text>
                  )}
               </div>
               <div>
                  <Input
                     variant='underLine'
                     type='password'
                     placeholder='Confirm Password'
                     register={register("confirmPassword")}
                  />
                  {errors?.confirmPassword?.message && (
                     <Text variant='error' className='ml-2 mt-2'>
                        {errors?.confirmPassword?.message}
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
                  <Button type='submit' variant='primary' title='Sign Up' />
               </div>
            </form>
         </div>
         <ToastContainer />
         <Text variant='titleSm' className='flex'>
            Forgot your Password?
         </Text>
      </div>
   );
};

export default Signup;
