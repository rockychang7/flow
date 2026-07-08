import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="切换深浅色主题"
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <span className="relative block size-5">
                <Sun className="absolute inset-0 h-full w-full transition-all duration-300 rotate-0 scale-100 text-primary dark:-rotate-90 dark:scale-0"/>
                <Moon className="absolute inset-0 h-full w-full transition-all duration-300 rotate-90 scale-0 text-primary dark:rotate-0 dark:scale-100"/>
            </span>
        </button>
    );
}
