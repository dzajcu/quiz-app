import { IoIosArrowDown } from "react-icons/io";

export const Header = () => {
    return (
        <header>
            <h1>Quizlet2.0</h1>
            <div className="header-content">
                <button>Stwórz zestaw</button>
                <button>
                    Twoje zasoby
                    <span>
                        <IoIosArrowDown size={18}/>
                    </span>
                </button>
            </div>
        </header>
    );
};
