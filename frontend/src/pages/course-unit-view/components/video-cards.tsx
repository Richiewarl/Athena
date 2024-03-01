import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getWeekVideos } from "../data/api";
import { VideoData } from "../data/apiTypes";
import { useEffect, useState } from "react";
import { useWeek } from "../context/week-provider";
import { useVideo } from "../context/video-provider";
import { useCourseUnit } from "@/pages/top-menubar/context/course-unit-provider";

interface VideoCardsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function VideoCards({ className }: VideoCardsProps) {
	const [videos, setVideos] = useState<VideoData[]>([]);
	const [selectedVideo, setSelectedVideo] = useState<VideoData | null>();

	const week = useWeek().week;
	const courseUnit = useCourseUnit().courseUnit;
	const setVideo = useVideo().setVideo;

	function updateSelectedVideo(video?: VideoData) {
		if (video) {
			setVideo(video);
			setSelectedVideo(video);
		} else {
			setVideo(null);
			setSelectedVideo(null);
			console.log("No videos for this week!");
		}
	}

	useEffect(() => {
		if (week) {
			getWeekVideos(week.id).then((res) => {
				setVideos(res.data);

				// set default as first video
				updateSelectedVideo(res.data[0]);
			});
		} else {
			setVideos([]);
			updateSelectedVideo();
		}
	}, [week]);

	return (
		<ScrollArea className={cn("px-1 py-2 border-l", className)}>
			<div className="flex-col w-auto">
				{videos?.map((video: VideoData) => (
					<div
						id={`video-card-${video.id}`}
						key={video.id}
						className="select-none clickable-video-card"
						onClick={() => updateSelectedVideo(video)}
					>
						<Card
							className={`flex flex-col gap-3 m-3 p-3 hover:cursor-pointer ${
								selectedVideo == video
									? "bg-secondary border-2 border-muted-foreground"
									: "hover:bg-secondary"
							}`}
							tabIndex={0}
						>
							<CardHeader className="p-0">
								<img
									src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
									alt="Photo by Drew Beamer"
									className="h-[80px] rounded-md object-cover"
								/>
							</CardHeader>
							<div>
								<CardTitle className="text-lg">{video.title}</CardTitle>
								<CardDescription>
									{video.uploaded_at.toString()}
								</CardDescription>
							</div>
						</Card>
					</div>
				))}
			</div>
		</ScrollArea>
	);
}
