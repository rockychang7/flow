import * as React from "react";
import {Moon, Sun} from "lucide-react";

export function ModeToggle() {
    const [theme, setThemeState] = React.useState<
        "light" | "dark">("light");

    React.useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains("dark");
        setThemeState(isDarkMode ? "dark" : "light");
    }, []);

    React.useEffect(() => {
        const isDark =
            theme === "dark";
        document.documentElement.classList[isDark ? "add" : "remove"]("dark");
    }, [theme]);

    return (
        <div className="relative size-6 md:block"
             onClick={() => setThemeState(theme === "dark" ? "light" : "dark")}>
            <Sun
                className="absolute inset-0 h-full w-full transition-all duration-300 rotate-0 scale-100 cursor-pointer text-primary dark:-rotate-90 dark:scale-0"/>
            <Moon
                className="absolute inset-0 h-full w-full transition-all duration-300 rotate-90 scale-0 cursor-pointer text-primary dark:rotate-0 dark:scale-100"/>
        </div>
    );
}
