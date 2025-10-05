import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Button } from "antd";


const ThemeToggle: React.FC = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)

    return (
        <Button onClick={toggleTheme}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}

        </Button>
    )

}

export default ThemeToggle;