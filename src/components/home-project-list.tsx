import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {projectInfo} from "@/data/project-info";
import {useId} from "react";

export function ProjectList() {
    const id = useId();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectInfo.map((item, index) => {
                return <ProjectCard key={`${id}-${index}`} {...item}/>;
            })}
        </div>

    )
}

function ProjectCard({...props}) {
    return (
        <Card className="hover:shadow-xl overflow-hidden">
            <img className="w-full h-1/2 hover:scale-105  transition-transform duration-300"
                 src={props.projectImageUrl}
                 alt="flow"/>

            <CardHeader>
                <CardTitle>{props.projectName}</CardTitle>
                <CardDescription>{props.projectDescription}</CardDescription>
            </CardHeader>
            <CardContent className="py-0">
                <a href={props.projectLink}
                   className="underline hover:text-primary">项目链接</a>
            </CardContent>
        </Card>
    )
}
