import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function VideoCards() {
    return (
        <ScrollArea className="whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4 break-normal whitespace-normal">
                <Card className="w-1/5 p-3">
                    <CardTitle className="text-lg">
                        Intro to Statistical Analysis
                    </CardTitle>
                    <CardDescription>
                        We introduce the baisc concepts of statistical analysis in this video.
                    </CardDescription>
                </Card>
                <Card className="w-1/5 p-3">
                    <CardTitle className="text-lg">
                        Intro to Statistical Analysis
                    </CardTitle>
                    <CardDescription>
                        We introduce the baisc concepts of statistical analysis in this video.
                    </CardDescription>
                </Card>
                <Card className="w-1/5 p-3">
                    <CardTitle className="text-lg">
                        Intro to Statistical Analysis
                    </CardTitle>
                    <CardDescription>
                        We introduce the baisc concepts of statistical analysis in this video.
                    </CardDescription>
                </Card>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
    
}