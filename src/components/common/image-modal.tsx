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
                className="object-cover w-full h-full object-center cursor-pointer"
                onClick={() => setIsOpen(true)}
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-full max-w-(--breakpoint-md) rounded-md p-0">
                    <div className="w-full p-1">
                        <img
                            src={src}
                            alt={alt}
                            className="w-full object-contain"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
