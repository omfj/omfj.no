import React from "react";
import {VariantProps, cva} from "class-variance-authority";
import clsx from "clsx";

const headingVariants = cva(
  "mt-10 scroll-m-20 border-b border-transparent pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  {
    variants: {
      size: {
        h1: "text-4xl",
        h2: "text-3xl",
        h3: "text-2xl",
      },
      underline: {
        true: "border-b border-b-slate-200",
      },
    },
    defaultVariants: {
      size: "h1",
    },
  },
);

export interface HeadingProps
  extends React.ButtonHTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as: "h1" | "h2" | "h3";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({className, as, underline, ...props}, ref) => {
    const size = as;
    const classes = clsx(headingVariants({size, underline, className}));

    if (as === "h1") return <h1 className={classes} ref={ref} {...props} />;
    if (as === "h2") return <h2 className={classes} ref={ref} {...props} />;
    if (as === "h3") return <h3 className={classes} ref={ref} {...props} />;

    // never
    return null;
  },
);
Heading.displayName = "Heading";

export default Heading;
