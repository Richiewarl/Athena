import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getWeekVideos } from "../data/api";
import { VideoData } from "../data/apiTypes";

import { useWeek } from "../context/week-provider";
import { useVideo } from "../context/video-provider";
import { Dot, VideoOff } from "lucide-react";
import { AddVideoButton } from "./add-video-button";
import { useUser } from "@/authentication/context/user-provider";
import { UserRole } from "@/authentication/data/userDataMapper";

interface VideoCardsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function VideoCards({ className }: VideoCardsProps) {
	const { selectedVideo, setSelectedVideo, videos, setVideos } = useVideo();

	const selectedWeek = useWeek().selectedWeek;
	const user = useUser().user;

	useEffect(() => {
		if (selectedWeek) {
			getWeekVideos(selectedWeek.id).then((res) => {
				setVideos(res.data);

				// set default as first video
				setSelectedVideo(res.data[0]);
			});
		} else {
			setVideos([]);
			setSelectedVideo(null);
		}
	}, [selectedWeek]);

	return (
		<div className="flex-col w-auto">
			<ScrollArea className={cn("px-1 py-2 border-l h-[700px]", className)}>
				{videos && videos.length > 0 ? (
					videos.map((video: VideoData) => (
						<div
							id={`video-card-${video.id}`}
							key={video.id}
							className="select-none clickable-video-card"
							onClick={() => setSelectedVideo(video)}
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
										src={
											video.thumbnail == ""
												? "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
												: video.thumbnail
										}
										alt="Video Thumbnail"
										className="h-[80px] rounded-md object-cover"
									/>
								</CardHeader>
								<div>
									<CardTitle className="text-lg">{video.title}</CardTitle>
									<CardDescription className="flex flex-row">
										{new Date(video.created_on).toLocaleDateString("en-GB")}
										<Dot />
										{new Date(video.created_on).toLocaleTimeString("en-GB")}
									</CardDescription>
								</div>
							</Card>
						</div>
					))
				) : (
					<div className="flex flex-col items-center justify-center h-full text-neutral-500 mb-4">
						<VideoOff />
						No Videos in Folder
					</div>
				)}
				{user && user.user_role >= UserRole.LECTURER && selectedWeek && (
					<div className="w-full px-3">
						<AddVideoButton />
					</div>
				)}
			</ScrollArea>
		</div>
	);
}
