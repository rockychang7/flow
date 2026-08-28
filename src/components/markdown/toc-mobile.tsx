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
                    className="fixed bottom-20 right-6 z-40 size-12 cursor-pointer rounded-full border-border bg-background/50 backdrop-blur-[16px] transition-colors md:right-8 xl:hidden"
                >
                    <List className="size-5" />
                    <span className="sr-only">Toggle Table of Contents</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[60vh] w-[80vw] max-w-xs overflow-y-auto">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-left text-sm font-medium text-muted-foreground">目录</DialogTitle>
                </DialogHeader>
                <TableOfContents headings={headings} onItemClick={() => setOpen(false)} hideTitle />
            </DialogContent>
        </Dialog>
    );
}
