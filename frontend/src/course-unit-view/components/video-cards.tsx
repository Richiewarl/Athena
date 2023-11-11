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

interface VideoCardsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function VideoCards({ className }: VideoCardsProps) {
	const [videos, setVideos] = useState<VideoData[]>([]);

	const week = useWeek().week;

	useEffect(() => {
		if (week) {
			getWeekVideos(week?.id).then((res) => {
				setVideos(res.data);

				if (res.data.length > 0) {
					setVideo(res.data[0]); // set default as first week
				} else {
					setVideo(null);
					console.log("No videos for this week!");
				}
			});
		}
	}, [week]);

	const setVideo = useVideo().setVideo;

	return (
		<ScrollArea className={cn("h-full px-1 border-l", className)}>
			<div className="flex-col w-auto">
				{videos?.map((video: VideoData) => (
					<div
						id="clickable-video-card"
						key={video.id}
						className="hover:cursor-pointer select-none"
						onClick={() => setVideo(video)}
					>
						<Card className="m-3 p-3 hover:bg-secondary">
							<CardTitle className="text-lg">{video.title}</CardTitle>
							<CardDescription>{video.description}</CardDescription>
						</Card>
					</div>
				))}
			</div>
		</ScrollArea>
	);
}
