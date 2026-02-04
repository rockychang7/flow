import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Component, Frame, Server } from 'lucide-react'

const technologies = [
    { name: "Astro.js", description: "Javascript框架，用于编写本网站的主框架", icon: Server },
    { name: "React", description: "用于构建用户界面的JavaScript库", icon: Component },
    { name: "Tailwind CSS", description: "基于原子类的CSS框架", icon: Frame },
    { name: "Cloudflare", description: "用于部署和托管本博客的平台", icon: Server },
]

export function TechStack() {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold">本站技术栈</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                    <Card key={tech.name}>
                        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                            <div className="bg-primary/10 p-1.5 rounded-full">
                                <tech.icon className="h-4 w-4 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{tech.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{tech.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

