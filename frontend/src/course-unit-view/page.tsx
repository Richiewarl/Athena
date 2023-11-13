import { Sidebar } from "./components/sidebar";
import { VideoCards } from "./components/video-cards";
import { WeekDataProvider } from "./context/week-provider";
import WeeklyContent from "./components/weekly-content";

// Stylesheet
import "./page.css";
import { VideoDataProvider } from "./context/video-provider";

export default function ContentPage() {
	return (
		<div className="block">
			<div className="bg-background">
				<div className="grid lg:grid-cols-5">
					<WeekDataProvider>
						<Sidebar className="hidden lg:block" />
						<VideoDataProvider>
							<WeeklyContent className="col-span-3 lg:col-span-3 block" />
							<VideoCards className="hidden lg:block" />
						</VideoDataProvider>
					</WeekDataProvider>
				</div>
			</div>
		</div>
	);
}
