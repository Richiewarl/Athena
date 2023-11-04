import { Sidebar } from "./components/sidebar"
import { VideoCards } from "./components/video-cards"
import WeeklyContent from "./components/weekly-content"

export default function ContentPage() {
    return (
        <div className="hidden md:block">
            <div className="bg-background">
                <div className="flex border-b">
                    <Sidebar className="hidden lg:block w-1/5" />
                    <WeeklyContent />
                    <VideoCards className="hidden lg:block w-1/5" />
                </div>
            </div>
        </div>
    )
}