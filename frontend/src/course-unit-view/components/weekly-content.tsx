import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseVideoMaterialEmbed } from "./video-embed";

import { cn } from "@/lib/utils";
import { useVideo } from "../context/video-provider";

type WeeklyContentProps = {
	className: string;
};

export default function WeeklyContent({ className }: WeeklyContentProps) {
	const video = useVideo().video;

	return (
		<main className={cn("col-span-3 lg:col-span-3 lg:border-l", className)}>
			<div className="px-4 py-5 lg:px-8">
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
			<div className="px-4 py-2 lg:px-8">
				{video && (
					<CourseVideoMaterialEmbed
						id="course-video-material"
						video={video}
						className=""
						size="medium"
					/>
				)}
			</div>
		</main>
	);
}
