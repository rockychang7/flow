import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Github, Mail, Twitter} from 'lucide-react'

const frontendTechStack = [
    "Html", "Css", "Javascript", "TypeScript", "Tailwind CSS", "React", "Shadcn UI", "Next.js", "Astro.js", "Htmx", "Alpine.js"
]

const backendTechStack = [
    "Golang", "Java", "Python", "MongoDB", "Redis", "Docker", "Mysql", "Nginx", "Spring Boot"
]

const contactInfo = [
    {name: "GitHub", icon: Github, link: "https://github.com/rockychang7"},
    {name: "Twitter", icon: Twitter, link: "https://twitter.com/Joe39445722"},
    {name: "Email", icon: Mail, link: "mailto:joebig19960318@gmail.com"},
]

export function PersonalInfo() {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold">关于我</h2>
            <div className="space-y-4">
                <Card className="animate-fade-in-up">
                    <CardHeader>
                        <CardTitle>我的技术栈</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">前端技术：</h3>
                            <div className="flex flex-wrap gap-2">
                                {frontendTechStack.map((tech, index) => (
                                    <span key={index}
                                          className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                    {tech}
                  </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">后端技术：</h3>
                            <div className="flex flex-wrap gap-2">
                                {backendTechStack.map((tech, index) => (
                                    <span key={index}
                                          className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                    {tech}
                  </span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <CardHeader>
                        <CardTitle>联系我</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {contactInfo.map((contact, index) => (
                                <Button key={index} variant="outline" size="sm" asChild>
                                    <a href={contact.link} target="_blank" rel="noopener noreferrer">
                                        <contact.icon className="mr-2 h-4 w-4"/>
                                        {contact.name}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

