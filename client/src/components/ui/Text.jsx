import React from "react";
import { cn } from "../../../utils/utils";
import { cva } from "class-variance-authority";

const description = cva("cursor-pointer", {
   variants: {
      variant: {
         description: ["text-xs"],
         productTitle: ["leading-5"],
         price: ["text-xl", "font-medium"],
         infoSm: ["text-sm", "text-secondary"],
         infoXs: ["text-xs", "text-secondary"],
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
