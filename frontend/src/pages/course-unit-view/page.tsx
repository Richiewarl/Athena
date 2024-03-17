// Components
import Sidebar from "./components/sidebar";
import VideoCards from "./components/video-cards";
import WeeklyContent from "./components/weekly-content";

// Stylesheet
import "./page.css";

// Context Providers
import { VideoDataProvider } from "./context/video-provider";
import { WeekDataProvider } from "./context/week-provider";

export default function ContentPage() {
	return (
		<div className="block border-b">
			<div className="bg-background">
				<div className="grid lg:grid-cols-5">
					<WeekDataProvider>
						<Sidebar className="hidden lg:block" />
						<VideoDataProvider>
							<WeeklyContent className="col-span-3 lg:col-span-3 block border-x" />
							<VideoCards className="hidden lg:block" />
						</VideoDataProvider>
					</WeekDataProvider>
				</div>
			</div>
		</div>
	);
}
