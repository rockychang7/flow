import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Mode = "light" | "dark" | "system";

const NEXT: Record<Mode, Mode> = { light: "dark", dark: "system", system: "light" };
const LABEL: Record<Mode, string> = { light: "浅色", dark: "深色", system: "跟随系统" };

interface Props {
    /** icon = 顶栏图标钮(桌面);row = 移动菜单里的整行条目 */
    variant?: "icon" | "row";
}

/**
 * 主题三态循环:浅色 → 深色 → 跟随系统。
 * localStorage 只存手动选择(light/dark);「跟随系统」= 清掉存储,
 * RootLayout 的内联脚本没读到存储时本就跟随系统并监听系统变化,这里只负责入口。
 */
export function ModeToggle({ variant = "icon" }: Props) {
    const [mode, setMode] = useState<Mode>("system");

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") setMode(stored);
    }, []);

    const cycle = () => {
        const next = NEXT[mode];
        if (next === "system") {
            localStorage.removeItem("theme");
            document.documentElement.classList.toggle(
                "dark",
                window.matchMedia("(prefers-color-scheme: dark)").matches
            );
        } else {
            localStorage.setItem("theme", next);
            document.documentElement.classList.toggle("dark", next === "dark");
        }
        setMode(next);
    };

    /* 三枚图标叠放,只做透明度互换,不做旋转/缩放 */
    const icons = (
        <span className="relative block size-4">
            <Sun className={`absolute inset-0 h-full w-full transition-opacity ${mode === "light" ? "opacity-100" : "opacity-0"}`}/>
            <Moon className={`absolute inset-0 h-full w-full transition-opacity ${mode === "dark" ? "opacity-100" : "opacity-0"}`}/>
            <Monitor className={`absolute inset-0 h-full w-full transition-opacity ${mode === "system" ? "opacity-100" : "opacity-0"}`}/>
        </span>
    );

    if (variant === "row") {
        return (
            <button
                type="button"
                onClick={cycle}
                aria-label={`主题:${LABEL[mode]},点击切换`}
                className="flex w-full cursor-pointer items-center gap-3 py-3 font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <span className="text-muted-foreground">{icons}</span>
                主题
                <span className="ml-auto text-caption font-medium text-muted-foreground">{LABEL[mode]}</span>
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={cycle}
            aria-label={`主题:${LABEL[mode]},点击切换`}
            title={`主题:${LABEL[mode]}`}
            className="-m-1 cursor-pointer rounded-sm p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            {icons}
        </button>
    );
}
