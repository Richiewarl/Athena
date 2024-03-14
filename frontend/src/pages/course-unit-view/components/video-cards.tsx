import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
	DialogContent,
	DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getWeekVideos, postVideo } from "../data/api";
import { NewVideoData, VideoData } from "../data/apiTypes";

import { useWeek } from "../context/week-provider";
import { useVideo } from "../context/video-provider";
import { Dot, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface VideoCardsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function VideoCards({ className }: VideoCardsProps) {
	const [videos, setVideos] = useState<VideoData[]>([]);
	const [selectedVideo, setSelectedVideo] = useState<VideoData | null>();

	const week = useWeek().week;
	const setVideo = useVideo().setVideo;

	function updateSelectedVideo(video?: VideoData) {
		if (video) {
			setVideo(video);
			setSelectedVideo(video);
		} else {
			setVideo(null);
			setSelectedVideo(null);
		}
	}

	useEffect(() => {
		if (week) {
			getWeekVideos(week.id).then((res) => {
				setVideos(res.data);

				// set default as first video
				updateSelectedVideo(res.data[0]);
			});
		} else {
			setVideos([]);
			updateSelectedVideo();
		}
	}, [week]);

	// Add new video
	const [showAddVideoDialog, setShowAddVideoDialog] = useState(false);
	const { toast } = useToast();

	// 1. Define form schema
	const formSchema = z.object({
		title: z.string().min(1).max(300),
		description: z.string(),
		link: z.string().min(1).max(1000),
		thumbnail: z.string().max(1000),
	});

	// 2. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			link: "",
			thumbnail: "",
		},
	});

	// 3. Define a submit handler.
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (week) {
			let newVideo: NewVideoData = {
				title: values.title,
				description: values.description,
				uploaded_at: new Date().toISOString(),
				link: values.link,
				thumbnail: values.thumbnail,
				week_id: week.id,
			};

			postVideo(newVideo)
				.then((res) => {
					toast({
						title: "Video Succesfully Added",
						description: `${values.title} has been added.`,
					});
				})
				.catch((error) => {
					toast({
						title: "Uh oh! Something went wrong.",
						description: error.message + ". We could not add your video.",
						variant: "destructive",
					});
				});
		} else {
			console.error;
			toast({
				title: "Uh oh! Something went wrong.",
				description:
					"We could not add your video because there is no folder associated with it.",
				variant: "destructive",
			});
			return;
		}
	};

	return (
		<ScrollArea className={cn("px-1 py-2 border-l", className)}>
			<div className="flex-col w-auto">
				<div className="w-full px-3">
					<Dialog
						open={showAddVideoDialog}
						onOpenChange={setShowAddVideoDialog}
					>
						<DialogTrigger className="w-full" asChild>
							<Button className="w-full">
								<PlusCircle />
								&nbsp; Add Video
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add a Video</DialogTitle>
								<DialogDescription>
									Link your video here. Make sure it aligns with the content and
									goals of the selected folder.
								</DialogDescription>
							</DialogHeader>
							<div className="lg:h-[500px] md:h-80 sm:h-28">
								<ScrollArea className="h-full">
									<Form {...form}>
										<form
											onSubmit={form.handleSubmit(onSubmit)}
											className="m-4 space-y-8"
										>
											<FormField
												control={form.control}
												name="title"
												render={({ field }) => (
													<FormItem>
														<FormLabel htmlFor="video-title-input">
															Video Title
														</FormLabel>
														<FormControl>
															<Input
																id="video-title-input"
																placeholder="Introduction to Calculus"
																{...field}
															/>
														</FormControl>
														<FormDescription>
															Enter a concise yet descriptive title for your
															video. The title should capture the essence of the
															video content.
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="description"
												render={({ field }) => (
													<FormItem>
														<FormLabel htmlFor="video-description-input">
															Video Description
														</FormLabel>
														<FormControl>
															<Textarea
																id="video-description-input"
																placeholder="This video describes..."
																{...field}
															/>
														</FormControl>
														<FormDescription>
															Provide a detailed overview of your video. Include
															key topics, learning objectives, and any
															prerequisite knowledge learners might need.
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="link"
												render={({ field }) => (
													<FormItem>
														<FormLabel htmlFor="video-link-input">
															Video Link
														</FormLabel>
														<FormControl>
															<Input
																id="video-link-input"
																placeholder="https://www.youtube.com/embed/..."
																{...field}
															/>
														</FormControl>
														<FormDescription>
															If the video is hosted on YouTube, ensure the
															privacy settings is set to 'unlisted' to allow for
															embedding without public access.
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="thumbnail"
												render={({ field }) => (
													<FormItem>
														<FormLabel htmlFor="video-thumbnail-input">
															Video Thumbnail
														</FormLabel>
														<FormControl>
															<Input
																id="video-thumbnail-input"
																placeholder="https://github.com/shadcn.png"
																{...field}
															/>
														</FormControl>
														<FormDescription>
															Upload a thumbnail image that represents the
															content of your video. Choose an image that is
															clear, relevant, and engaging to encourage clicks.
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<DialogFooter>
												<Button
													variant="outline"
													onClick={() => setShowAddVideoDialog(false)}
												>
													Cancel
												</Button>
												<Button type="submit">Continue</Button>
											</DialogFooter>
										</form>
									</Form>
								</ScrollArea>
							</div>
						</DialogContent>
					</Dialog>
				</div>
				{videos?.map((video: VideoData) => (
					<div
						id={`video-card-${video.id}`}
						key={video.id}
						className="select-none clickable-video-card"
						onClick={() => updateSelectedVideo(video)}
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
									src={`${video.thumbnail}`}
									alt="Video Thumbnail"
									className="h-[80px] rounded-md object-cover"
								/>
							</CardHeader>
							<div>
								<CardTitle className="text-lg">{video.title}</CardTitle>
								<CardDescription className="flex flex-row">
									{new Date(video.uploaded_at).toLocaleDateString("en-GB")}
									<Dot />
									{new Date(video.uploaded_at).toLocaleTimeString("en-GB")}
								</CardDescription>
							</div>
						</Card>
					</div>
				))}
			</div>
		</ScrollArea>
	);
}
