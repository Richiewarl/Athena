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
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/components/ui/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NewVideoData, VideoData } from "../data/apiTypes";
import { useWeek } from "../context/week-provider";
import { postVideo } from "../data/api";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUrlRegEx, removeQueryString } from "@/utils";
import { useVideo } from "../context/video-provider";
import { useLocation, useNavigate } from "react-router-dom";

interface AddVideoButtonProps
	extends React.DialogHTMLAttributes<HTMLDialogElement> {}

export function AddVideoButton() {
	// Add new video
	const { selectedVideo, setSelectedVideo, videos, setVideos } = useVideo();
	const [showAddVideoDialog, setShowAddVideoDialog] = useState(false);
	const { toast } = useToast();
	const selectedWeek = useWeek().selectedWeek;

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
	const navigate = useNavigate();
	const location = useLocation();
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		removeQueryString(navigate, location);

		// allow for URL extraction from a string, useful when user paste iFrame embedding
		let match = values.link.match(/https?:\/\/[^\s"]+/);

		if (match && match.length > 0) {
			values.link = match[0];
		}

		if (selectedWeek) {
			let newVideo: NewVideoData = {
				title: values.title,
				description: values.description,
				link: values.link,
				thumbnail: values.thumbnail,
				week: selectedWeek.id,
			};

			postVideo(newVideo)
				.then((res) => {
					toast({
						title: "Video Succesfully Added",
						description: `${values.title} has been added.`,
						variant: "success",
					});

					setVideos([res.data, ...videos]);
					setSelectedVideo(res.data);
					setShowAddVideoDialog(false);
					form.reset();
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
		<Dialog open={showAddVideoDialog} onOpenChange={setShowAddVideoDialog}>
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
						Link your video here. Make sure it aligns with the content and goals
						of the selected folder.
					</DialogDescription>
				</DialogHeader>
				<div className="h-[520px]">
					<ScrollArea className="h-full">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="ml-1 mr-3 space-y-8"
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
												Enter a concise yet descriptive title for your video.
												The title should capture the essence of the video
												content.
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
												Provide a detailed overview of your video. Include key
												topics, learning objectives, and any prerequisite
												knowledge learners might need.
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
												If the video is hosted on YouTube, ensure the privacy
												settings is set to 'unlisted' to allow for embedding
												without public access.
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
												Upload a thumbnail image that represents the content of
												your video. Choose an image that is clear, relevant, and
												engaging to encourage clicks.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<DialogFooter>
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<Button type="submit">Continue</Button>
								</DialogFooter>
							</form>
						</Form>
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	);
}
