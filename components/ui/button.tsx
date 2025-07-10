import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("font-semibold transition-all font-secondary", {
  variants: {
    variant: {
      default: "bg-accent text-primary hover:bg-accent-hover",
      primary:
        "border rounded-full flex items-center justify-center border-white border-opacity-40 transition-all" +
        " hover:shadow-2xl hover:text-accent hover:border-opacity-100",
      secondary:
        "border rounded-full flex items-center justify-center border-white border-opacity-40 transition-all" +
        " hover:border-transparent hover:text-black shadow-md w-auto",
    },
    size: {
      default: "h-[44px] px-4",
      xl: "h-[55px] w-[200px] lg:h-[90px] lg:w-[280px] text-sm lg:text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "xl",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
