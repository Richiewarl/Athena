import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseVideoMaterialEmbed } from "./video-embed";

import { cn } from "@/lib/utils";
import { useVideo } from "../context/video-provider";
import { useWeek } from "../context/week-provider";

import { Separator } from "@/components/ui/separator";

import { FolderX, VideoOff } from "lucide-react";
import { WeekDetailButton } from "./week-detail-button";

type WeeklyContentProps = {
	className: string;
};

export default function WeeklyContent({ className }: WeeklyContentProps) {
	const selectedVideo = useVideo().selectedVideo;
	const selectedWeek = useWeek().selectedWeek;

	return (
		<main className={cn("lg:border-l", className)}>
			{selectedWeek ? (
				<>
					<div className="px-4 py-5 lg:px-8">
						<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
							{selectedWeek?.title}
						</h3>
						<Separator className="my-3" />
						<div className="flex flex-row">
							<WeekDetailButton />
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
					</div>
					<div className="px-4 py-2 lg:px-8">
						{selectedVideo ? (
							<>
								<CourseVideoMaterialEmbed
									id="course-video-material"
									className=""
									video={selectedVideo}
								/>
							</>
						) : (
							<div className="flex flex-col items-center justify-center h-full text-neutral-500">
								<VideoOff />
								No Video to display
							</div>
						)}
					</div>
				</>
			) : (
				<>
					<div className="flex flex-col h-full items-center justify-center text-neutral-500">
						<FolderX size={90} />
						<p>No Materials</p>
					</div>
				</>
			)}
		</main>
	);
}
