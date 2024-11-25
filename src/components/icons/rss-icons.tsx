import {Rss} from "lucide-react";

export default function RssComponent() {
    return <a target="_blank" href="/rss.xml">
        <Rss className="size-6 text-primary"/>
    </a>;
}