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
                <DialogContent className="max-w-screen-md">
                    <div className="w-full h-full max-h-[80vh] sm:max-h-[45vh]">
                        <img
                            src={src}
                            alt={alt}
                            className="object-cover"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
