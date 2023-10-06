import { cn } from "@/utils/utils";
import { cva } from "class-variance-authority";

const inputVariants = cva(["w-full", "outline-0"], {
   variants: {
      variant: {
         primary: [
            "bg-blue-500",
            "text-white",
            "border-transparent",
            "hover:bg-blue-600",
         ],
         underLine: [
            "bg-transparent",
            "border-b",
            "border-secondary",
            "focus:border-primary",
         ],
      },
      sizes: {
         small: ["text-sm", "py-1", "px-2"],
         medium: ["text-sm", "py-2", "px-4"],
      },
   },
   defaultVariants: {
      variant: "primary",
      sizes: "medium",
   },
});

const Input = ({
   title,
   className,
   sizes,
   variant,
   register,
   name,
   type,
   ...props
}) => {
   return (
      <input
         {...(register ?? {})}
         type={type ?? "text"}
         {...props}
         className={cn(inputVariants({ variant, sizes, className }))}
      >
         {title}
      </input>
   );
};

export default Input;
