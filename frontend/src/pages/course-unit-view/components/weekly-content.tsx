import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseVideoMaterialEmbed } from "./video-embed";

import { cn } from "@/lib/utils";
import { useVideo } from "../context/video-provider";
import { useWeek } from "../context/week-provider";

import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
	DialogContent,
	DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Info } from "lucide-react";
import { useState } from "react";

type WeeklyContentProps = {
	className: string;
};

export default function WeeklyContent({ className }: WeeklyContentProps) {
	const video = useVideo().video;
	const week = useWeek().week;

	const [showAbout, setShowAbout] = useState(false);

	return (
		<main className={cn("lg:border-l", className)}>
			<div className="px-4 py-5 lg:px-8">
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					{week?.title}
				</h3>
				<Separator className="my-3" />
				<div className="flex flex-row">
					<Dialog open={showAbout} onOpenChange={setShowAbout}>
						<DialogTrigger asChild>
							<Button variant="secondary" className="mr-5">
								<Info />
								&nbsp; What's on?
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{week?.title}</DialogTitle>
							</DialogHeader>
							<DialogDescription>
								This should be a description for this week's content...
							</DialogDescription>
						</DialogContent>
					</Dialog>

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
				{video && (
					<>
						<CourseVideoMaterialEmbed
							id="course-video-material"
							className=""
							video={video}
						/>
					</>
				)}
			</div>
		</main>
	);
}
