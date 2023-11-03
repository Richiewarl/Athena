import { Sidebar } from "./components/sidebar"
import WeeklyContent from "./components/weekly-content"


export default function ContentPage() {
    return (
        <div className="hidden md:block">
            <div className="bg-background">
                <div className="grid lg:grid-cols-5">
                    <Sidebar className="hidden lg:block" />
                    <WeeklyContent />
                </div>
            </div>
        </div>
    )
}