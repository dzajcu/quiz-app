import * as React from "react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

interface LogoProps {
    short?: boolean;
    maxH?: string;
    hover?: boolean;
    className?: string;
}

export default function Logo({
    short = false,
    maxH = "45px",
    hover = false,
    className,
}: LogoProps) {
    const { theme } = useTheme();

    const logo1Src =
        theme === "dark"
            ? "/src/assets/logo1-dark.png"
            : "/src/assets/logo1-light.png";

    const logo2Src =
        theme === "dark"
            ? "/src/assets/logo2-dark.png"
            : "/src/assets/logo2-light.png";

    const baseClasses = cn(
        `max-h-[${maxH}]`,
        hover && "transition-all duration-500",
        className
    );

    const logo1Classes = cn(
        baseClasses,
        hover &&
            "ease-logo group-hover/logo:rotate-45 group-hover/logo:brightness-[80%]"
    );

    const logo2Classes = cn(
        baseClasses,
        hover && "group-hover/logo:brightness-[80%]"
    );

    const containerClasses = cn("flex", hover && "group/logo hover:cursor-pointer");

    if (short) {
        return (
            <div className={containerClasses}>
                <img
                    src={logo1Src}
                    alt="Logo"
                    className={logo1Classes}
                />
            </div>
        );
    }

    return (
        <div className={containerClasses}>
            <img
                src={logo1Src}
                alt="Logo"
                className={logo1Classes}
            />
            <img
                src={logo2Src}
                alt="Logo"
                className={logo2Classes}
            />
        </div>
    );
}
