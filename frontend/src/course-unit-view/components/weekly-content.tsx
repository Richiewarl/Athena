import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCards } from "./video-cards"

export default function WeeklyContent() {
    return (
        <main className="w-4/5 lg:border-l">
            <div className="px-4 py-6 lg:px-8">
                <Tabs defaultValue="videos">
                    <div className="space-between flex items-center">
                        <TabsList>
                            <TabsTrigger value="videos">
                                Videos
                            </TabsTrigger>
                            <TabsTrigger value="quizzes" disabled>
                                Quizzes
                            </TabsTrigger>
                            <TabsTrigger value="forum" disabled>
                                Forum
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </Tabs>
            </div>
            <div className="px-4 lg:px-8">
                <VideoCards />
            </div>
        </main>
    )
}