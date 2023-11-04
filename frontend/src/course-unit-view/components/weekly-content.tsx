import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoEmbed, VideoSizeSelector } from "./videoEmbed";

export default function WeeklyContent() {
	return (
		<main className="md:w-full lg:w-4/5 lg:border-l border-r">
			<div className="px-4 py-5 lg:px-8">
				<Tabs defaultValue="videos">
					<div className="space-between flex items-center">
						<TabsList>
							<TabsTrigger value="videos">Videos</TabsTrigger>
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
			<div className="px-4 py-2 lg:px-8">
				<VideoSizeSelector />
				<VideoEmbed
					src="https://video.manchester.ac.uk/embedded/00000000-1f15-8deb-0000-0175331733c0"
					size="medium"
				/>
			</div>
		</main>
	);
}
