import * as React from "react";
import {VariantProps, cva} from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  clsx(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:scale-95",
    "data-[state=open]:bg-slate-100",
  ),
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-700",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "bg-transparent border border-slate-200 hover:bg-slate-100",
        subtle: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "bg-transparent hover:bg-slate-100 data-[state=open]:bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-slate-900 hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, fullWidth, ...props}, ref) => {
    return (
      <button
        className={clsx(buttonVariants({variant, size, fullWidth, className}))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;