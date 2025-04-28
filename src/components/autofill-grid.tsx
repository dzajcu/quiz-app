import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface AutoFillGridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    minChildWidth?: number;
    gap?: number;
    autoHeight?: boolean;
}

export const AutoFillGrid = React.forwardRef<HTMLDivElement, AutoFillGridProps>(
    (
        {
            children,
            className,
            minChildWidth = 20,
            gap = 16,
            autoHeight = true,
            ...props
        },
        ref
    ) => {
        const gridRef = useRef<HTMLDivElement>(null);
        const isMobile = useIsMobile();
        const [columns, setColumns] = useState(1);
        const childrenArray = React.Children.toArray(children);

        useEffect(() => {
            const updateGridColumns = () => {
                if (!gridRef.current) return;

                const containerWidth = gridRef.current.offsetWidth;
                const columnsCount = Math.floor(
                    containerWidth / (minChildWidth + gap)
                );
                setColumns(Math.max(1, columnsCount));
            };

            const resizeObserver = new ResizeObserver(updateGridColumns);
            if (gridRef.current) {
                resizeObserver.observe(gridRef.current);
            }

            updateGridColumns();

            return () => {
                resizeObserver.disconnect();
            };
        }, [minChildWidth, gap]);

        const calculateDimensions = () => {
            if (isMobile) return {};

            const columnSpan = Math.floor(Math.random() * 10) + 5;
            const rowSpan = Math.floor(Math.random() * 5) + 5;

            return {
                gridColumn: `span ${columnSpan}`,
                gridRow: `span ${rowSpan}`,
            };
        };

        return (
            <div className="min-h-screen w-full p-4 md:p-8 bg-background items-center flex flex-col justify-center">
                <div
                    ref={ref}
                    className={cn(
                        "relative w-full",
                        autoHeight ? "h-auto" : "h-full",
                        className
                    )}
                    {...props}
                >
                    <div
                        ref={gridRef}
                        className={cn(
                            "grid w-full", 
                            "auto-rows-[20px]",
                            "place-items-center",
                            // "place-content-center"
                        )}
                        style={{
                            gap: `${gap}px`,
                            gridTemplateColumns: `repeat(${columns}, minmax(0px, 1fr))`,
                        }}
                    >
                        {childrenArray.map((child, index) => (
                            <div
                                key={index}
                                style={calculateDimensions()}
                                className="h-4/5 transition-all duration-300 ease-in-out"
                            >
                                {child}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);
