import { cn } from "@/utils/utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(["border", "rounded-md", "max-w-max"], {
   variants: {
      variant: {
         primary: [
            "bg-blue-500",
            "text-white",
            "border-transparent",
            "hover:bg-blue-600",
         ],
         outline: ["bg-transparent", "text-primary", "border-primary"],
      },
      size: {
         small: ["text-sm", "py-1", "px-2"],
         medium: ["text-sm", "py-2", "px-4"],
      },
   },
   defaultVariants: {
      variant: "primary",
      size: "medium",
   },
});

const Button = ({ title, className, size, variant, ...props }) => {
   return (
      <button
         {...props}
         className={cn(buttonVariants({ variant, size, className }))}
      >
         {title}
      </button>
   );
};

export default Button;
