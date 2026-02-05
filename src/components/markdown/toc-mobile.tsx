import {List} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {TableOfContents} from "./table-of-contents";
import {useState} from "react";
import type {Heading} from "@/type/markdown";

export function TocMobile({headings}: { headings: Heading[] }) {
    const [open, setOpen] = useState(false);

    if (headings.length === 0) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed bottom-20 right-4 z-40 size-12 rounded-full shadow-lg border-border/60 bg-background/80 backdrop-blur-sm lg:hidden hover:shadow-xl transition-all"
                >
                    <List className="size-5" />
                    <span className="sr-only">Toggle Table of Contents</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[300px] max-h-[60vh] overflow-y-auto rounded-xl">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-left text-lg font-bold">目录</DialogTitle>
                </DialogHeader>
                <TableOfContents headings={headings} onItemClick={() => setOpen(false)} hideTitle />
            </DialogContent>
        </Dialog>
    );
}
