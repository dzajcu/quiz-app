import * as React from "react";

import { cn } from "@/lib/utils";

const InputQuiz = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-9 w-full rounded-none border-0 border-b bg-transparent px-3 py-1 text-base shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-primary-button border-muted disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
InputQuiz.displayName = "InputQuiz";

export { InputQuiz };
