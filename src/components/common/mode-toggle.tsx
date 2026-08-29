import { Monitor, Moon, Sun } from "lucide-react";

type Mode = "light" | "dark" | "system";

const NEXT: Record<Mode, Mode> = { light: "dark", dark: "system", system: "light" };

interface Props {
    /** icon = 顶栏图标钮(桌面);row = 移动菜单里的整行条目 */
    variant?: "icon" | "row";
}

/**
 * 主题三态循环:浅色 → 深色 → 跟随系统。
 * localStorage 只存手动选择(light/dark);「跟随系统」= 清掉存储,
 * RootLayout 的内联脚本没读到存储时本就跟随系统并监听系统变化。
 * 图标与文字由 <html data-theme-mode> 的纯 CSS 取态(globals.css 的 .mode-icon/.mode-label):
 * 该属性在首帧前就位,加载不闪、多实例同步,组件里不留状态。
 */
export function ModeToggle({ variant = "icon" }: Props) {
    const cycle = () => {
        const stored = document.documentElement.dataset.themeMode;
        const mode: Mode = stored === "light" || stored === "dark" ? stored : "system";
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
        document.documentElement.dataset.themeMode = next;
    };

    /* 三枚图标叠放,只做透明度互换,不做旋转/缩放 */
    const icons = (
        <span className="relative block size-4">
            <Sun data-mode="light" className="mode-icon absolute inset-0 h-full w-full"/>
            <Moon data-mode="dark" className="mode-icon absolute inset-0 h-full w-full"/>
            <Monitor data-mode="system" className="mode-icon absolute inset-0 h-full w-full"/>
        </span>
    );

    if (variant === "row") {
        return (
            <button
                type="button"
                onClick={cycle}
                aria-label="切换主题(浅色/深色/跟随系统循环)"
                className="flex w-full cursor-pointer items-center gap-3 py-3 font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <span className="text-muted-foreground">{icons}</span>
                主题
                <span className="ml-auto text-caption font-medium text-muted-foreground">
                    <span className="mode-label" data-mode="light">浅色</span>
                    <span className="mode-label" data-mode="dark">深色</span>
                    <span className="mode-label" data-mode="system">跟随系统</span>
                </span>
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={cycle}
            aria-label="切换主题(浅色/深色/跟随系统循环)"
            title="切换主题"
            className="-m-1 cursor-pointer rounded-sm p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            {icons}
        </button>
    );
}
