import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WeeklyContent() {
    return (
        <main className="md:w-full lg:w-4/5 lg:border-l border-r">
            <div className="px-4 py-5 lg:px-8">
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
        </main>
    )
}