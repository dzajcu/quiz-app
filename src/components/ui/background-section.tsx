interface BackgroundSectionProps {
    color: string;
    position: "left" | "right";
}

const BackgroundSection = ({ color, position }: BackgroundSectionProps) => {
    return (
        <div
            className={`absolute ${color} h-screen w-1/2 max-lg:w-full -z-10 max-lg:h-2/5 ${position}-0`}
        />
    );
};

export default BackgroundSection;
