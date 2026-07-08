import {Rss} from "lucide-react";

export default function RssComponent() {
    return (
        <a
            target="_blank"
            href="/rss.xml"
            aria-label="RSS 订阅"
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <Rss className="size-5 text-primary"/>
        </a>
    );
}
