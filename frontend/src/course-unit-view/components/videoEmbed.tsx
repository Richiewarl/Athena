import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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

export function VideoEmbed({
	id,
	className,
	src,
	size = "medium",
}: VideoEmbedProps) {
	const dimensions = sizeToDemension.get(size);

	if (!dimensions) {
		throw new Error(`Unsupported size: ${size}`);
	}

	const { width, height } = dimensions;

	return (
		<iframe
			id={id}
			className={cn("", className)}
			src={src}
			width={width}
			height={height}
			style={{ overflow: "hidden" }}
			allowFullScreen
		/>
	);
}

export function VideoSizeSelector({ className }: { className?: string }) {
	return (
		<div className={cn("grid gap-2 w-min", className)}>
			<Label htmlFor="video-size">Size</Label>
			<Select defaultValue="medium">
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
	);
}
