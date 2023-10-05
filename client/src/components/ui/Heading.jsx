import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";

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
