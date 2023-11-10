import { Sidebar } from "./components/sidebar";
import { VideoCards } from "./components/video-cards";
import { WeekDataProvider } from "./context/week-provider";
import WeeklyContent from "./components/weekly-content";

// Stylesheet
import "./page.css";

export default function ContentPage() {
	return (
		<div className="block">
			<div className="bg-background">
				<div className="grid lg:grid-cols-5">
					<WeekDataProvider>
						<Sidebar className="hidden lg:block" />
						<WeeklyContent className="block" />
						<VideoCards className="hidden lg:block" />
					</WeekDataProvider>
				</div>
			</div>
		</div>
	);
}
