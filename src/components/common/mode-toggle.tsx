import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const toggleTheme = () => {
        const next = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        setIsDark(next);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="切换深浅色主题"
            aria-pressed={isDark}
            className="p-2 -m-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
            <span className="relative block size-4">
                <Sun className="absolute inset-0 h-full w-full transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0"/>
                <Moon className="absolute inset-0 h-full w-full transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100"/>
            </span>
        </button>
    );
}
