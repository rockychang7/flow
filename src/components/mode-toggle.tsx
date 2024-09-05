import * as React from "react";
import {Moon, Sun} from "lucide-react";

import {Button} from "@/components/ui/button";

export function ModeToggle() {
    const [theme, setThemeState] = React.useState<
        "theme-light" | "theme-dark">("theme-light");

    React.useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains("theme-dark");
        setThemeState(isDarkMode ? "theme-dark" : "theme-light");
    }, []);

    React.useEffect(() => {
        const isDark =
            theme === "theme-dark";
        document.documentElement.classList[isDark ? "add" : "remove"]("dark");
    }, [theme]);

    return (
        <div className="relative w-6 h-6"
             onClick={() => setThemeState(theme === "theme-dark" ? "theme-light" : "theme-dark")}>
            <Sun
                className="absolute inset-0 h-full w-full transition-all duration-300 rotate-0 scale-100 cursor-pointer dark:-rotate-90 dark:scale-0"/>
            <Moon
                className="absolute inset-0 h-full w-full transition-all duration-300 rotate-90 scale-0 cursor-pointer dark:rotate-0 dark:scale-100"/>
        </div>
    );
}
