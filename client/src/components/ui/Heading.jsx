import { cn } from "@/utils/utils";
import { cva } from "class-variance-authority";

const headingVariant = cva("", {
   variants: {
      variant: {
         heading1: ["text-4xl", "font-extrabold", "tracking-[0.2rem"],
         heading2: [],
         heading3: [],
         heading4: [],
         heading5: [],
         heading6: [],
      },
   },
});

const Heading = ({ variant, title, className }) => {
   return (
      <div className={cn(headingVariant({ variant, className }))}>{title}</div>
   );
};

export default Heading;
