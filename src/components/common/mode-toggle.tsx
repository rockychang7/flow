import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
    };

    return (
        <div className="relative size-6 md:block cursor-pointer" onClick={toggleTheme}>
            <Sun
                className="absolute inset-0 h-full w-full transition-all duration-300 rotate-0 scale-100 text-primary dark:-rotate-90 dark:scale-0"/>
            <Moon
                className="absolute inset-0 h-full w-full transition-all duration-300 rotate-90 scale-0 text-primary dark:rotate-0 dark:scale-100"/>
        </div>
    );
}

