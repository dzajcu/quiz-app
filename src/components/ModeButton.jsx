export const ModeButton = ({ name, icon }) => {
    return (
        <button className="mode-button">
            <span>{icon}</span>
            {name}
        </button>
    );
};
