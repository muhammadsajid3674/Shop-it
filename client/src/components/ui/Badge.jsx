import { cn } from "@/utils/utils";
import { cva } from "class-variance-authority";

const badgeVariant = cva(
   [
      "bg-orange-400",
      "rounded-md",
      "items-center",
      "justify-center",
      "text-white",
   ],
   {
      variants: {
         variant: {
            round: ["h-16 w-16", "rounded-full"],
            button: ["rounded-md"],
         },
         badgeSize: {
            small: ["text-sm", "py-1", "px-2"],
            medium: ["text-base", "py-2", "px-4"],
         },
      },
      defaultVariants: {
         variant: "button",
         badgeSize: "small",
      },
   }
);

const Badge = ({ title, className, badgeSize, variant, ...props }) => {
   return (
      <div
         {...props}
         className={cn(badgeVariant({ variant, badgeSize, className }))}
      >
         {title}
      </div>
   );
};

export default Badge;
