import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import Comments from "./comments";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { VideoData } from "../data/apiTypes";
import { Dot } from "lucide-react";
import { deleteVideo } from "../data/api";
import { useToast } from "@/components/ui/use-toast";
import { useVideo } from "../context/video-provider";
import { Button } from "@/components/ui/button";
import { useUser } from "@/authentication/context/user-provider";
import { UserRole } from "@/authentication/data/userDataMapper";

interface VideoEmbedProps extends React.HTMLAttributes<HTMLIFrameElement> {
	video: VideoData;
}

type size = "small" | "medium" | "large";

type dimension = {
	width: number;
	height: number;
};

const sizeToDemension: Map<size, dimension> = new Map([
	["small", { width: 560, height: 315 }],
	["medium", { width: 660, height: 380 }],
	["large", { width: 853, height: 480 }],
]);

export function CourseVideoMaterialEmbed({
	id,
	className,
	video,
}: VideoEmbedProps) {
	let size: size = "medium";
	const [selectedSize, setSelectedSize] = useState<size>(size);
	const dimensions = sizeToDemension.get(selectedSize);
	const { width, height } = dimensions ?? { width: 660, height: 380 };

	const { selectedVideo, setSelectedVideo, videos, setVideos } = useVideo();
	const user = useUser().user;
	const { toast } = useToast();

	const handleDeleteVideo = () => {
		deleteVideo(video.id).then((res) => {
			toast({
				title: "Video Succesfully Deleted",
				description: `${video.title} has been deleted.`,
			});

			let updatedVideos = videos.filter((vid) => vid != video);
			setVideos(updatedVideos);
			setSelectedVideo(updatedVideos[0]);
		});
	};

	return (
		<>
			<div className="flex flex-row items-center gap-2 w-full pb-2">
				<Label htmlFor="video-size">Size:</Label>
				<Select
					defaultValue="medium"
					onValueChange={(size: size) => setSelectedSize(size)}
				>
					<SelectTrigger id="video-size" className="w-[110px]">
						<SelectValue placeholder="Size" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="large">Large</SelectItem>
						<SelectItem value="medium">Medium</SelectItem>
						<SelectItem value="small">Small</SelectItem>
					</SelectContent>
				</Select>
				{user && user.user_role >= UserRole.LECTURER && (
					<Button
						className="ml-auto"
						variant="destructive"
						onClick={handleDeleteVideo}
					>
						Delete Video
					</Button>
				)}
			</div>
			<iframe
				id={id}
				title={video.title}
				className={cn("", className)}
				src={video.link}
				width={width}
				height={height}
				style={{ overflow: "hidden" }}
				allow="accelerometer; 
					autoplay; 
					clipboard-write; 
					encrypted-media; 
					gyroscope; 
					picture-in-picture;"
				allowFullScreen
			/>
			<Accordion
				type="single"
				collapsible
				className="w-full bg-secondary px-2 my-2 rounded-lg"
			>
				<AccordionItem value="video-description">
					<AccordionTrigger>{video.title}</AccordionTrigger>
					<AccordionContent>
						<h4 className="scroll-m-20 text-s font-semibold tracking-tight mb-2 flex flex-row">
							{new Date(video.created_on).toLocaleDateString("en-GB")}
							<Dot />
							{new Date(video.created_on).toLocaleTimeString("en-GB")}
						</h4>
						{video.description}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Comments video={video} />
		</>
	);
}
