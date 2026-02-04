import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {categoryInfo} from "@/data/category-info";

interface CategoryCardProps {
    name: string
    postCount: number
    slug: string
}

export default function CategoryCard({name, postCount, slug}: CategoryCardProps) {
    return (
        <Card className="overflow-hidden" key={slug}>
            <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{name}</h3>
                <p className="text-muted-foreground">{categoryInfo.filter(category => category.name === name)[0].description}</p>
            </CardContent>
            <CardFooter className="bg-muted p-6 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{postCount} 篇文章</span>
                <a
                    href={slug}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                >
                    查看分类
                </a>
            </CardFooter>
        </Card>
    )
}

