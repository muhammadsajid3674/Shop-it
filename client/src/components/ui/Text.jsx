import { cn } from "@/utils/utils";
import { cva } from "class-variance-authority";

const description = cva("cursor-pointer", {
   variants: {
      variant: {
         description: ["text-xs"],
         productTitle: ["leading-5"],
         titleXl: ["text-xl", "font-semibold", "tracking-wide"],
         titleSm: ["text-sm", "tracking-wide"],
         price: ["text-xl", "font-medium"],
         infoSm: ["text-sm", "text-secondary"],
         infoXs: ["text-xs", "text-secondary"],
         error: ["text-xs", "text-red-500"],
      },
   },
   defaultVariants: {
      variant: "description",
   },
});

const Text = ({ children, variant, className }) => {
   return (
      <div className={cn(description({ variant, className }))}>{children}</div>
   );
};

export default Text;
