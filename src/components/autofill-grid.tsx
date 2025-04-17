import * as React from "react";
import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/components/ui/sidebar"


interface GridBreakpoint {
    minWidth: number;
    maxCardWidth: number;
    minCardWidth: number;
    gap: number;
}

const defaultBreakpoints: Record<string, GridBreakpoint> = {
    "2xl": { minWidth: 1536, maxCardWidth: 480, minCardWidth: 380, gap: 24 },
    xl: { minWidth: 1280, maxCardWidth: 400, minCardWidth: 320, gap: 20 },
    lg: { minWidth: 1024, maxCardWidth: 360, minCardWidth: 280, gap: 16 },
    md: { minWidth: 768, maxCardWidth: 320, minCardWidth: 250, gap: 16 },
    sm: { minWidth: 640, maxCardWidth: 280, minCardWidth: 220, gap: 12 },
    xs: { minWidth: 0, maxCardWidth: 260, minCardWidth: 200, gap: 12 },
};

interface AutoFillGridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    breakpoints?: Record<string, GridBreakpoint>;
    autoHeight?: boolean;
}


export const AutoFillGrid = React.forwardRef<HTMLDivElement, AutoFillGridProps>(
    (
        {
            children,
            className,
            breakpoints = defaultBreakpoints,
            autoHeight = true,
            ...props
        },
        ref
    ) => {
        const gridRef = useRef<HTMLDivElement>(null);
        const isMobile = useIsMobile();
        const [columns, setColumns] = useState(1);
        const [currentBreakpoint, setCurrentBreakpoint] = useState<GridBreakpoint>(
            breakpoints.xs
        );
        const childrenArray = React.Children.toArray(children);

        // Funkcja do znajdowania optymalnego układu kart
        const optimizeLayout = (cards: React.ReactNode[], columnsCount: number) => {
            if (columnsCount <= 1) return cards;

            const grid: Array<{ height: number; card: React.ReactNode }[]> =
                Array.from({ length: columnsCount }, () => []);
            const optimizedCards: React.ReactNode[] = [];

            // Przydziel karty do kolumn w sposób minimalizujący różnice wysokości
            cards.forEach((card) => {
                const shortestColumn = grid.reduce((min, col, idx) => {
                    const colHeight = col.reduce(
                        (sum, item) => sum + item.height,
                        0
                    );
                    return colHeight <
                        grid[min].reduce((sum, item) => sum + item.height, 0)
                        ? idx
                        : min;
                }, 0);

                const cardHeight = Math.random() > 0.7 ? 2 : 1;
                grid[shortestColumn].push({ height: cardHeight, card });
            });

            // Spłaszcz grid do jednowymiarowej tablicy
            let maxHeight = 0;
            grid.forEach((column) => {
                column.forEach(({ card }) => optimizedCards.push(card));
                maxHeight = Math.max(
                    maxHeight,
                    column.reduce((sum, item) => sum + item.height, 0)
                );
            });

            return optimizedCards;
        };

        useEffect(() => {
            const updateGridColumns = () => {
                if (!gridRef.current) return;

                const containerWidth = gridRef.current.offsetWidth;

                // Znajdź odpowiedni breakpoint
                const newBreakpoint =
                    Object.values(breakpoints)
                        .reverse()
                        .find((bp) => containerWidth >= bp.minWidth) ||
                    breakpoints.xs;

                setCurrentBreakpoint(newBreakpoint);

                // Oblicz optymalną liczbę kolumn
                const columnsCount = Math.floor(
                    containerWidth / (newBreakpoint.minCardWidth + newBreakpoint.gap)
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
        }, [breakpoints]);

        // Optymalizuj układ kart
        const optimizedChildren = useMemo(() => {
            return optimizeLayout(childrenArray, columns);
        }, [childrenArray, columns]);

        const calculateDimensions = () => {
            if (isMobile) return {};

            const isWide = Math.random() > 0.5;
            const isTall = Math.random() > 0.8;

            const maxSpan = Math.min(columns, 2);
            const columnSpan = isWide && columns > 1 ? maxSpan : 1;
            const rowSpan = isTall ? 2 : 1;

            return {
                gridColumn: `span ${columnSpan}`,
                gridRow: `span ${rowSpan}`,
            };
        };
        
        const { state } = useSidebar();

        return (
            <div
                ref={ref}
                className={cn(
                    "relative w-full transition-all duration-200",
                    autoHeight ? "h-auto" : "h-full",
                    className
                )}
                {...props}
            >
                <div
                    ref={gridRef}
                    className={cn("grid w-full", "auto-rows-[minmax(200px,auto)]")}
                    style={{
                        gap: `${currentBreakpoint.gap}px`,
                        gridTemplateColumns: `repeat(${columns}, minmax(${currentBreakpoint.minCardWidth}px, ${currentBreakpoint.maxCardWidth}px))`,
                    }}
                >
                    {optimizedChildren.map((child, index) => (
                        <div
                            key={index}
                            style={calculateDimensions()}
                            className="transition-all duration-300 ease-in-out"
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);
