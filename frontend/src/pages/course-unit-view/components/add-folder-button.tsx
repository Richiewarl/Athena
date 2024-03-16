import { useState } from "react";
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
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";

import { NewWeekData } from "../data/apiTypes";
import { postWeek } from "../data/api";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCourseUnit } from "@/pages/top-menubar/context/course-unit-provider";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWeek } from "../context/week-provider";

interface AddWeekDialogForm
	extends React.DialogHTMLAttributes<HTMLDialogElement> {}

export function AddWeekButton() {
	// Adding new week/folder
	const { selectedWeek, setSelectedWeek, weeks, setWeeks } = useWeek();
	const selectedCourseUnit = useCourseUnit().selectedCourseUnit;
	const [showAddWeekDialog, setShowAddWeekDialog] = useState(false);
	const { toast } = useToast();

	// 1. Define form schema
	const formSchema = z.object({
		title: z.string().min(1).max(300),
		description: z.string(),
	});

	// 2. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	// 3. Define a submit handler.
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (selectedCourseUnit) {
			let newWeek: NewWeekData = {
				title: values.title,
				description: values.description,
				course_unit: selectedCourseUnit.id,
			};

			postWeek(newWeek)
				.then((res) => {
					toast({
						title: "Folder Succesfully Added",
						description: `${res.data.title} has been added.`,
					});

					setWeeks([res.data, ...weeks]);
					setSelectedWeek(res.data);
					form.reset();
				})
				.catch((error) => {
					toast({
						title: "Uh oh! Something went wrong.",
						description: error.message + ". We could not add your folder.",
						variant: "destructive",
					});
				});
		} else {
			console.error("No course unit found...");
			toast({
				title: "Uh oh! Something went wrong.",
				description:
					"We could not add your folder because there is no course unit associated with it.",
				variant: "destructive",
			});
			return;
		}
	};

	return (
		<div className="w-full">
			<Dialog open={showAddWeekDialog} onOpenChange={setShowAddWeekDialog}>
				<DialogTrigger className="w-full" asChild>
					<Button className="w-full">
						<PlusCircle />
						&nbsp; Add Folder
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add a Folder</DialogTitle>
						<DialogDescription>
							Create a new folder to organize your course content. You can use
							folders to represent individual weeks, specific topics, or other
							segments that make sense for your course structure.
						</DialogDescription>
					</DialogHeader>
					<div className="h-[405px]">
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
												<FormLabel htmlFor="week-title-input">
													Folder Title
												</FormLabel>
												<FormControl>
													<Input
														id="week-title-input"
														placeholder="Week 1: Calculus"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Name each folder clearly to ensure it's intuitive for
													your audience to navigate.
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
												<FormLabel htmlFor="week-title-input">
													Folder Title
												</FormLabel>
												<FormControl>
													<Textarea
														id="week-description-input"
														placeholder="This folder contains..."
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Give a brief summary of what will be covered in the
													folder. This might include key topics, specific
													objective, and any expected learning outcomes.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<DialogFooter>
										<DialogClose asChild>
											<Button variant="outline">Cancel</Button>
										</DialogClose>
										<DialogClose asChild>
											<Button type="submit">Continue</Button>
										</DialogClose>
									</DialogFooter>
								</form>
							</Form>
						</ScrollArea>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
