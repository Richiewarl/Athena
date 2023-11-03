import { Sidebar } from "./components/sidebar"
import WeeklyContent from "./components/weekly-content"

export default function ContentPage() {
    return (
        <div className="hidden md:block">
            <div className="bg-background">
                <div className="flex border-b">
                    <Sidebar className="hidden lg:block w-1/5" />
                    <WeeklyContent />
                </div>
            </div>
        </div>
    )
}