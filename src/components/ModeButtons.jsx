import { ModeButton } from "./ModeButton";
import {
    PiCardsFill,
    PiRepeatBold,
    PiNewspaperClippingBold,
    PiChatsBold,
} from "react-icons/pi";

export const ModeButtons = () => {
    const iconSize = "20px";
    const modes = [
        { name: "Fiszki", icon: <PiCardsFill size={iconSize} /> },
        { name: "Ucz się", icon: <PiRepeatBold size={iconSize} /> },
        { name: "Test", icon: <PiNewspaperClippingBold size={iconSize} /> },
        { name: "Dopasowania", icon: <PiChatsBold size={iconSize} /> },
    ];

    return (
        <div className="mode-button-group">
            {modes.map((mode) => (
                <ModeButton key={mode.name} name={mode.name} icon={mode.icon} />
            ))}
        </div>
    );
};
