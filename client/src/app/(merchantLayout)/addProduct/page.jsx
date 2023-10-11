"use client";
import { Text } from "@/components";
import { Button, Input } from "@/components/ui";
import Loader from "@/components/ui/Loader";
import { apiRoute } from "@/utils/apiRoutes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
   name: z.string({
      required_error: "Name is required",
   }),
   category: z.string({
      required_error: "Category is required",
   }),
   description: z.string({
      required_error: "Description is required",
   }),
   price: z.number({
      required_error: "Price is required",
   }),
   image: z.instanceof(FileList),
});

const page = () => {
   const router = useRouter();
   const [loader, setLoader] = useState(false);
   const { data: session, status, update } = useSession();

   const [previewImage, setPreviewImage] = useState(null);
   const [image, setImage] = useState("");

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(schema) });

   const handleFileChange = (event) => {
      const file = event.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            setImage(reader.result);
            setPreviewImage(reader.result);
         };
         reader.readAsDataURL(file);
      } else {
         setPreviewImage(null);
      }
   };

   const onSubmit = async (data) => {
      if (status === "authenticated") {
         setLoader(true);
         const formData = {
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price,
            base64Image: image,
         };
         const response = await fetch(apiRoute.addProduct, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify(formData),
         });
         const result = await response.json();
         console.log(result);
         if (!result?.success) {
            setLoader(false);
            return toast.error(result?.message || "Failed");
         }
         toast.success("Product Created");
         router.push("/dashboard");
      }
   };
   return (
      <div className='flex justify-center gap-5'>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5 bg-cardLight w-96 p-5 rounded-md shadow-md'
         >
            <Input
               variant='underLine'
               placeholder='Name'
               register={register("name")}
            />
            {errors.name?.message && (
               <Text variant='error' className='ml-2 mt-2'>
                  {errors.name?.message}
               </Text>
            )}
            <select
               {...register("category")}
               className='text-sm border border-secondary rounded-md px-2 outline-none py-2'
            >
               <option value='' disabled defaultValue=''>
                  Choose an option
               </option>
               <option value='Clothes'>Clothes</option>
               <option value='Consumables'>Consumables</option>
               <option value='Jewellery'>Jewellery</option>
               <option value='Home appliance'>Home appliance</option>
            </select>
            {errors.category?.message && (
               <Text variant='error' className='ml-2 mt-2'>
                  {errors.category?.message}
               </Text>
            )}
            <Input
               variant='underLine'
               placeholder='Description'
               register={register("description")}
            />
            {errors.description?.message && (
               <Text variant='error' className='ml-2 mt-2'>
                  {errors.description?.message}
               </Text>
            )}
            <Input
               variant='underLine'
               type='number'
               placeholder='Price in &#8377;'
               register={register("price", { valueAsNumber: true })}
            />
            {errors.price?.message && (
               <Text variant='error' className='ml-2 mt-2'>
                  {errors.price?.message}
               </Text>
            )}
            <Input
               type='file'
               className='px-0'
               onChange={handleFileChange}
               variant='image'
               register={register("image")}
            />
            {errors.image?.message && (
               <Text variant='error' className='ml-2 mt-2'>
                  {errors.image?.message}
               </Text>
            )}
            {previewImage && (
               <Image
                  className='h-16 w-16 object-cover rounded-full'
                  src={previewImage}
                  alt='Current profile photo'
                  width={100}
                  height={100}
               />
            )}
            <div className='flex justify-end'>
               {loader && <Loader />}
               <Button
                  type='submit'
                  disabled={loader}
                  variant='primary'
                  title='Submit'
               />
            </div>
         </form>
      </div>
   );
};

export default page;
