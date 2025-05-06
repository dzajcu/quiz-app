interface BackgroundSectionProps {
    color: string;
    position: "left" | "right";
    isEven?: boolean;
}

const BackgroundSection = ({
    color,
    position,
    isEven = true,
}: BackgroundSectionProps) => {
    return (
        <div
            className={`absolute ${color} h-screen w-1/2 max-lg:w-full -z-10 ${
                isEven ? "max-lg:h-2/4" : "max-lg:h-2/5"
            } $] ${position}-0`}
        />
    );
};

export default BackgroundSection;
