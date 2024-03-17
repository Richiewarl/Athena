import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseVideoMaterialEmbed } from "./video-embed";

import { cn } from "@/lib/utils";
import { useVideo } from "../context/video-provider";
import { useWeek } from "../context/week-provider";

import { Separator } from "@/components/ui/separator";

import { Construction, FolderX, Hammer, VideoOff } from "lucide-react";
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
					<Tabs defaultValue="videos">
						<div className="px-4 py-5 lg:px-8">
							<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
								{selectedWeek?.title}
							</h3>
							<Separator className="my-3" />
							<div className="flex flex-row">
								<WeekDetailButton />

								<div className="space-between flex items-center">
									<TabsList>
										<TabsTrigger value="videos">Videos</TabsTrigger>
										<TabsTrigger value="quizzes">Quizzes</TabsTrigger>
										<TabsTrigger value="forum">Forum</TabsTrigger>
										<TabsTrigger value="announcements" disabled>
											Announcements
										</TabsTrigger>
									</TabsList>
								</div>
							</div>
						</div>
						<div className="px-4 py-2 lg:px-8">
							<TabsContent value="videos">
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
										<VideoOff size={60} />
										<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
											No Video to display
										</h4>
									</div>
								)}
							</TabsContent>
							<TabsContent
								value="quizzes"
								className="flex flex-col h-full w-full items-center justify-center text-neutral-500"
							>
								<div>
									<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
										<div className="flex flex-row items-center justify-center">
											<Hammer size={60} className="-ml-3 mr-1" />
											<Construction size={60} />
										</div>
										Quizzes under Construction
									</h4>
								</div>
							</TabsContent>
							<TabsContent
								value="forum"
								className="flex flex-col h-full w-full items-center justify-center text-neutral-500"
							>
								<div className="flex flex-row items-center justify-center">
									<Hammer size={60} className="-ml-3 mr-1" />
									<Construction size={60} />
								</div>
								<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
									Forum under Construction
								</h4>
							</TabsContent>
						</div>
					</Tabs>
				</>
			) : (
				<>
					<div className="flex flex-col h-full items-center justify-center text-neutral-500">
						<FolderX size={90} />
						<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
							No Materials
						</h4>
					</div>
				</>
			)}
		</main>
	);
}
