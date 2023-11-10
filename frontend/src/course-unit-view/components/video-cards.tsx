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

import { getAllVideos } from "../api";
import { VideoData } from "../apiTypes";
import { createContext, useContext, useEffect, useState } from "react";

interface VideoCardsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function VideoCards({ className }: VideoCardsProps) {
	const [videos, setVideos] = useState<VideoData[]>([]);

	useEffect(() => {
		getAllVideos().then((res) => {
			setVideos(res.data);
		});
	}, []);

	function log() {
		console.log("HEY");
	}

	return (
		<ScrollArea className={cn("h-full px-1 border-l", className)}>
			<div className="flex-col w-auto">
				{videos?.map((video: VideoData) => (
					<div
						key={video.id}
						onClick={log}
						className="hover:cursor-pointer select-none"
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
