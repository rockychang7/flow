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
        <figure className="w-full not-prose">
            <PhotoProvider maskOpacity={0.95}>
                <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl cursor-zoom-in">
                    <PhotoView src={src}>
                        <img
                            src={src}
                            alt={alt}
                            className={cn("w-full h-auto object-cover block m-0", className)}
                            style={{ display: 'block', margin: 0 }}
                            {...props}
                        />
                    </PhotoView>
                </div>
            </PhotoProvider>
            {caption && (
                <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
