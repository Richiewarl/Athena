import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { cn, tailwindSize, tailwindSizeWidthConverter } from "@/lib/utils";
import { useEffect, useState } from "react";

interface VideoEmbedProps extends React.HTMLAttributes<HTMLIFrameElement> {
	src: string;
	size: size;
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
	src,
	size = "medium",
}: VideoEmbedProps) {
	const [selectedSize, setSelectedSize] = useState<size>(size);
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
	}, []);

	useEffect(() => {}, [windowWidth]);

	const dimensions = sizeToDemension.get(selectedSize);
	if (!dimensions) {
		throw new Error(`Unsupported size: ${size}`);
	}
	const { width, height } = dimensions;

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
				className={cn("", className)}
				src={src}
				width={width}
				height={height}
				style={{ overflow: "hidden" }}
				allowFullScreen
			/>
		</>
	);
}
