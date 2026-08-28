import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// text-caption 是自定义字号档,不注册的话 tailwind-merge 会把它当成文字颜色,
// 跟同一次 cn() 里的 text-muted-foreground 判为冲突后直接丢掉
const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            "font-size": [{ text: ["caption"] }],
        },
    },
})

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** JS 里的平滑滚动绕过了 CSS 的 scroll-behavior,得自己守卫 reduced-motion */
export function scrollBehavior(): ScrollBehavior {
    if (typeof window === "undefined") return "auto";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function getWordCount(content: string): number {
    if (!content) return 0;
    // count Chinese characters
    const cnCount = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
    // count English words (replace CJK with space, then split)
    const enCount = content.replace(/[\u4e00-\u9fa5]/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
    return cnCount + enCount;
}

export function getReadingTime(content: string): number {
    if (!content) return 0;
    const words = getWordCount(content);
    // Average reading speed: 200-300 words per minute for mixed content
    return Math.ceil(words / 200);
}
