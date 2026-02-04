import {ArrowRight} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface ProjectCardProps {
    projectName: string;
    projectDescription: string;
    projectImageUrl: string;
    projectLink: string;
}

function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
}

export default function ProjectCard({projectName, projectDescription, projectImageUrl, projectLink}: ProjectCardProps) {
    const truncatedDescription = truncateText(projectDescription, 100);

    return (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={projectImageUrl}
                    alt={projectName}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardHeader>
                <CardTitle>{projectName}</CardTitle>
            </CardHeader>


            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{truncatedDescription}</p>
                        </CardContent>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs bg-background/80 backdrop-blur-xs border border-border shadow-xl">
                        <CardContent>
                        <p className="text-sm text-foreground/80">{projectDescription}</p>
                        </CardContent>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <CardFooter>
                <a
                    href={projectLink}
                    target="_blank"
                    className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                    查看项目
                    <ArrowRight className="ml-1 h-4 w-4"/>
                </a>
            </CardFooter>
        </Card>
    );
}
