import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
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
