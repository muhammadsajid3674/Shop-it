"use client";
import SignUpForm from "@/components/SignUpForm";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignUp = () => {
   const router = useRouter();
   const onSubmit = async (data) => {
      const response = await fetch(
         `${process.env.BASE_URL}/api/auth/register`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${process.env.NEXT_PUBLIC_APIAUTH}`,
            },
            body: JSON.stringify(data),
         }
      );
      const result = await response.json();
      console.log("result :>> ", result);
      if (!result?.success) {
         return toast.error(result?.message);
      }
      toast.success("Success");
      router.push("/login");
   };
   return <SignUpForm onSubmitReady={onSubmit} />;
};

export default SignUp;
