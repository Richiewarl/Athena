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
import { useVideo } from "../context/video-provider";
import { Dot } from "lucide-react";

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

	return (
		<>
			<div className="flex items-center gap-2 w-min pb-2">
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
							{new Date(video.uploaded_at).toLocaleDateString("en-GB")}
							<Dot />
							{new Date(video.uploaded_at).toLocaleTimeString("en-GB")}
						</h4>
						{video.description}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Comments video={video} />
		</>
	);
}
