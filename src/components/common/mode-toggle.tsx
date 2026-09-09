import { Monitor, Moon, Sun } from "lucide-react";

type Mode = "light" | "dark" | "system";

const NEXT: Record<Mode, Mode> = { light: "dark", dark: "system", system: "light" };

interface ThemeController {
    getMode: () => Mode;
    setMode: (mode: Mode) => void;
}

interface Props {
    /** icon = 顶栏图标钮(桌面);row = 移动菜单里的整行条目 */
    variant?: "icon" | "row";
}

/**
 * 主题三态循环:浅色 → 深色 → 跟随系统。
 * 未保存选择时跟随系统;主动选择后由 RootLayout 的主题控制器持久化。
 * 图标与文字由 <html data-theme-mode> 的纯 CSS 取态(globals.css 的 .mode-icon/.mode-label):
 * 该属性在首帧前就位,加载不闪、多实例同步,组件里不留状态。
 */
export function ModeToggle({ variant = "icon" }: Props) {
    const cycle = () => {
        const controller = (
            window as typeof window & { __flowTheme?: ThemeController }
        ).__flowTheme;
        const stored =
            controller?.getMode() ??
            document.documentElement.dataset.themeMode;
        const mode: Mode =
            stored === "dark" || stored === "system" ? stored : "light";
        const next = NEXT[mode];

        if (controller) {
            controller.setMode(next);
            return;
        }

        // RootLayout 控制器应始终先于岛屿就绪;保留降级路径避免脚本被拦截时按钮失效。
        const dark =
            next === "dark" ||
            (next === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);
        try {
            localStorage.setItem("flow-theme", next);
        } catch {
            // 仍应用到当前页面。
        }
        document.documentElement.classList.toggle("dark", dark);
        document.documentElement.dataset.themeMode = next;
        document
            .querySelector('meta[name="color-scheme"]')
            ?.setAttribute("content", dark ? "dark" : "light");
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", dark ? "#0c0a09" : "#ffffff");
    };

    /* 三枚图标叠放,只做透明度互换,不做旋转/缩放。
       行内 opacity:0 是兜底:样式表没就位时宁可空白一瞬,也不画错误的图标 */
    const icons = (
        <span className="relative block size-4">
            <Sun data-mode="light" style={{ opacity: 0 }} className="mode-icon absolute inset-0 h-full w-full"/>
            <Moon data-mode="dark" style={{ opacity: 0 }} className="mode-icon absolute inset-0 h-full w-full"/>
            <Monitor data-mode="system" style={{ opacity: 0 }} className="mode-icon absolute inset-0 h-full w-full"/>
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
                    <span className="mode-label" data-mode="light" style={{ display: "none" }}>浅色</span>
                    <span className="mode-label" data-mode="dark" style={{ display: "none" }}>深色</span>
                    <span className="mode-label" data-mode="system" style={{ display: "none" }}>跟随系统</span>
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
