import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function CardDemo() {

    return (
        <Card className="hover:shadow-xl overflow-hidden">
            <img className="w-full h-1/2 hover:scale-105  transition-transform duration-300"
                 src="https://fastly.picsum.photos/id/866/1920/1080.jpg?hmac=dNBuPEp10RySTqlc5EpGw7QyrFIpBd2X88r1Ixla7pw"
                 alt="flow"/>

            <CardHeader>
                <CardTitle>Flow</CardTitle>
                <CardDescription>Flow是本人的个人博客项目</CardDescription>
            </CardHeader>
            <CardContent className="py-0">
                <a href="https://github.com/rockychang7/flow" target="_blank"
                   className="underline hover:text-primary">项目链接</a>
            </CardContent>
        </Card>

    )
}
