import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WeeklyContent() {
    return (
        <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
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
        </div>
    )
}