import { Sidebar } from "./components/sidebar";
import { VideoCards } from "./components/video-cards";
import WeeklyContent from "./components/weekly-content";

// Stylesheet
import "./page.css";

export default function ContentPage() {
	return (
		<div className="block">
			<div className="bg-background">
				<div className="grid lg:grid-cols-5">
					<Sidebar className="hidden lg:block" />
					<WeeklyContent className="block" />
					<VideoCards className="hidden lg:block" />
				</div>
			</div>
		</div>
	);
}
