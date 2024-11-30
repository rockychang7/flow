import { CheckCircle } from 'lucide-react'

const goals = [
    "分享技术学习和实践经验",
    "记录生活各类思考和想法"
]

export function BlogGoals() {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold">博客目标</h2>
            <ul className="space-y-3">
                {goals.map((goal, index) => (
                    <li
                        key={index}
                        className="flex items-center space-x-3 animate-fade-in-left"
                        style={{animationDelay: `${index * 400}ms`}}
                    >
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{goal}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

