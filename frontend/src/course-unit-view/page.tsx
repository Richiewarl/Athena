import { Sidebar } from "./components/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContentPage() {
    return (
        <div className="hidden md:block">
            <div className="bg-background">
                <div className="grid lg:grid-cols-5">
                    <Sidebar className="hidden lg:block" />
                    <div className="col-span-3 lg:col-span-4 lg:border-l">
                        <div className="h-full px-4 py-6 lg:px-8">
                            <Tabs>
                                <div className="space-between flex items-center">
                                    <TabsList>
                                        <TabsTrigger value="videos">
                                            Videos
                                        </TabsTrigger>
                                        <TabsTrigger value="quizzes">
                                            Quizzes
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}