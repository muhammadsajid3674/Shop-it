"use client";
import { baseUrl } from "@/app/page";
import SignUpForm from "@/components/SignUpForm";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignUp = () => {
   const router = useRouter();
   const onSubmit = async (data) => {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${process.env.NEXT_PUBLIC_APIAUTH}`,
         },
         body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result?.success) {
         return toast.error("Failed", {
            position: toast.POSITION.TOP_CENTER,
         });
      }
      router.push("/login");
   };
   return <SignUpForm onSubmitReady={onSubmit} />;
};

export default SignUp;
