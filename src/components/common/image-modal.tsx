"use client";

import {useState} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";

interface ImageModalProps {
    src: string;
    alt: string;
}

export default function ImageModal({src, alt}: ImageModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <img
                src={src}
                alt={alt}
                className="block h-full w-full cursor-zoom-in object-cover object-center"
                onClick={() => setIsOpen(true)}
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-full max-w-(--breakpoint-md) overflow-hidden p-0">
                    <img
                        src={src}
                        alt={alt}
                        className="block w-full object-contain"
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
