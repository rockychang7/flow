import {projectInfo} from "@/data/project-info";
import {useId} from "react";
import ProjectCard from "@/components/project-card";

export function ProjectList() {
    const id = useId();
    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold pb-2">个人项目</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectInfo.map((item, index) => {
                    return <ProjectCard key={`${id}-${index}`} {...item}/>;
                })}
            </div>
        </div>
    )
}