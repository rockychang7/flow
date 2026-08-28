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
            className="-m-1 cursor-pointer rounded-sm p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            {/* 两枚图标叠放,只做透明度互换,不做旋转/缩放 */}
            <span className="relative block size-4">
                <Sun className="absolute inset-0 h-full w-full opacity-100 transition-opacity dark:opacity-0"/>
                <Moon className="absolute inset-0 h-full w-full opacity-0 transition-opacity dark:opacity-100"/>
            </span>
        </button>
    );
}
