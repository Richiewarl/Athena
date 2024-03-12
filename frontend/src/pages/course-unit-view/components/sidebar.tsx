import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getCourseUnitWeeks, postWeek } from "../data/api";
import { useEffect, useState } from "react";

import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
	DialogContent,
	DialogFooter,
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
import { useToast } from "@/components/ui/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// types
import { NewWeekData, WeekData } from "../data/apiTypes";
import { useWeek } from "../context/week-provider";
import { useCourseUnit } from "@/pages/top-menubar/context/course-unit-provider";

import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
	const [weeks, setWeeks] = useState<WeekData[]>([]);
	const [selectedWeek, setSelectedWeek] = useState<WeekData | null>();

	const courseUnit = useCourseUnit().courseUnit;
	const setWeek = useWeek().setWeek;

	function updateSelectedWeek(week?: WeekData) {
		if (week) {
			setWeek(week);
			setSelectedWeek(week);
		} else {
			setWeek(null);
			setSelectedWeek(null);
			// console.log("No materials for this course!");
		}
	}

	useEffect(() => {
		if (courseUnit) {
			getCourseUnitWeeks(courseUnit.id).then((res) => {
				setWeeks(res.data);

				// set default as first week
				updateSelectedWeek(res.data[0]);
			});
		} else {
			setWeeks([]);
			updateSelectedWeek();
		}
	}, [courseUnit]);

	// Adding new week/folder
	const [showAddWeekDialog, setShowAddWeekDialog] = useState(false);
	const { toast } = useToast();

	// 1. Define form schema
	const formSchema = z.object({
		title: z.string().min(1).max(300),
	});

	// 2. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	// 3. Define a submit handler.
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (courseUnit) {
			let newWeek: NewWeekData = {
				title: values.title,
				course_unit_id: courseUnit.id,
			};

			postWeek(newWeek)
				.then((res) => {
					toast({
						title: "Folder Succesfully Added",
						description: `${values.title} has been added.`,
					});
				})
				.catch((error) => {
					toast({
						title: "Uh oh! Something went wrong.",
						description: error.message + ". We could not add your folder.",
						variant: "destructive",
					});
				});
		} else {
			console.error;
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
		<aside className={cn("pb-12", className)}>
			<div className="py-4">
				<h2 className="pb-2 relative px-7 text-lg font-semibold tracking-tight">
					{courseUnit?.title}
				</h2>
				<ScrollArea className="h-full px-1" id="week-list-scrollarea">
					<div className="space-y-1 p-2">
						{weeks?.map((week: WeekData) => (
							<Button
								variant={selectedWeek == week ? "secondary" : "ghost"}
								className="w-full row-full justify-start font-normal"
								key={week.id}
								onClick={() => updateSelectedWeek(week)}
							>
								<span className="block overflow-hidden text-ellipsis">
									{week.title}
								</span>
							</Button>
						))}
					</div>
					<div className="flex flex-row w-full px-2 py-1">
						<Dialog
							open={showAddWeekDialog}
							onOpenChange={setShowAddWeekDialog}
						>
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
										Create a new folder to organize your course content. You can
										use folders to represent individual weeks, specific topics,
										or other segments that make sense for your course structure.
									</DialogDescription>
								</DialogHeader>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-8"
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
														Name each folder clearly to ensure it's intuitive
														for your audience to navigate.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<DialogFooter>
											<Button
												variant="outline"
												onClick={() => setShowAddWeekDialog(false)}
											>
												Cancel
											</Button>
											<Button type="submit">Continue</Button>
										</DialogFooter>
									</form>
								</Form>
							</DialogContent>
						</Dialog>
					</div>
				</ScrollArea>
			</div>
		</aside>
	);
}
