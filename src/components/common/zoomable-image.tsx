import { PhotoProvider, PhotoView } from "react-photo-view";
import React from "react";
import { cn } from "@/lib/utils";

interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    caption?: string;
}

export function ZoomableImage({ src, alt, className, caption, ...props }: ZoomableImageProps) {
    return (
        // figure 是 .prose 的直接子元素,破栏到 640 由 globals.css 统一接管
        <figure className="w-full not-prose">
            {/* 遮罩用 10% 黑 + 2px 磨砂(模糊在 globals.css 里补),不用黑幕 */}
            <PhotoProvider maskOpacity={0.1}>
                <div className="cursor-zoom-in overflow-hidden rounded-md border border-border">
                    <PhotoView src={src}>
                        <img
                            src={src}
                            alt={alt}
                            className={cn("m-0 block h-auto w-full object-cover", className)}
                            style={{ display: 'block', margin: 0 }}
                            {...props}
                        />
                    </PhotoView>
                </div>
            </PhotoProvider>
            {caption && (
                <figcaption className="mt-2 text-center text-caption font-medium text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
