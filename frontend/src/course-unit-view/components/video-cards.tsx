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
import { useCourseUnit } from "@/top-menubar/context/course-unit-provider";

interface VideoCardsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function VideoCards({ className }: VideoCardsProps) {
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
	}, [week, courseUnit]);

	return (
		<ScrollArea className={cn("h-full px-1 border-l", className)}>
			<div className="flex-col w-auto">
				{videos?.map((video: VideoData) => (
					<div
						id={`video-card-${video.id}`}
						key={video.id}
						className="select-none clickable-video-card"
						onClick={() => updateSelectedVideo(video)}
					>
						<Card
							className={`m-3 p-3 hover:cursor-pointer ${
								selectedVideo == video ? "bg-secondary" : "hover:bg-secondary"
							}`}
						>
							<CardTitle className="text-lg">{video.title}</CardTitle>
							<CardDescription>{video.description}</CardDescription>
						</Card>
					</div>
				))}
			</div>
		</ScrollArea>
	);
}
