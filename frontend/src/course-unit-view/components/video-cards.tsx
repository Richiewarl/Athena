import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area";

interface VideoCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  
}

export function VideoCards({ className }: VideoCardsProps) {
    return (
        <ScrollArea className={cn("h-full px-1", className)}>
            <div className="flex-col w-auto">
                <Card className="m-3 p-3">
                    <CardTitle className="text-lg">
                        Intro to Statistical Analysis
                    </CardTitle>
                    <CardDescription>
                        We introduce the baisc concepts of statistical analysis in this video.
                    </CardDescription>
                </Card>
                <Card className="m-3 p-3">
                    <CardTitle className="text-lg">
                        Video One
                    </CardTitle>
                    <CardDescription>
                        This is a very long description for my first video. 
                    </CardDescription>
                </Card>
                <Card className="m-3 p-3">
                    <CardTitle className="text-lg">
                        Video Two
                    </CardTitle>
                    <CardDescription>
                        This is a very long description for my second video. 
                    </CardDescription>
                </Card>
                <Card className="m-3 p-3">
                    <CardTitle className="text-lg">
                        Video Three
                    </CardTitle>
                    <CardDescription>
                        This is a very long description for my third video. 
                    </CardDescription>
                </Card>
                <Card className="m-3 p-3">
                    <CardTitle className="text-lg">
                        Video Four
                    </CardTitle>
                    <CardDescription>
                        This is a very long description for my fourth video. 
                    </CardDescription>
                </Card>
                <Card className="m-3 p-3">
                    <CardTitle className="text-lg">
                        Video Five
                    </CardTitle>
                    <CardDescription>
                        This is a very long description for my Fifth video. 
                    </CardDescription>
                </Card>
            </div>
        </ScrollArea>
    )
    
}