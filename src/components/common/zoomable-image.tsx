import React from "react";
import { cn } from "@/lib/utils";

interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    caption?: string;
}

export function ZoomableImage({ src, alt, className, caption, ...props }: ZoomableImageProps) {
    return (
        // 仅输出正文语义与排版,交互由详情页唯一的灯箱控制器接管。
        <figure className="w-full not-prose">
            <div className="overflow-hidden rounded-md border border-border">
                <img
                    src={src}
                    alt={alt}
                    className={cn("m-0 block h-auto w-full object-cover", className)}
                    style={{ display: "block", margin: 0 }}
                    {...props}
                />
            </div>
            {caption && (
                <figcaption className="mt-2 text-center text-caption font-medium text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
