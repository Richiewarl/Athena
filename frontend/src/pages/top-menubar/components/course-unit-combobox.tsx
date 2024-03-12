import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/components/ui/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getAllCourseUnits, postCourseUnit } from "../data/api";
import { CourseUnitData } from "../data/apiTypes";
import { useCourseUnit } from "../context/course-unit-provider";

export default function CourseUnitCombobox() {
	const [courseUnits, setCourseUnits] = useState<CourseUnitData[]>();
	const [selectedCourseUnit, setSelectedCourseUnit] =
		useState<CourseUnitData | null>();
	const [open, setOpen] = useState(false);
	const [showCreateCourseUnitDialog, setShowCreateCourseUnitDialog] =
		useState(false);

	const setCourseUnit = useCourseUnit().setCourseUnit;

	const updateSelectedCourseUnit = (courseUnit: CourseUnitData) => {
		setCourseUnit(courseUnit);
		setSelectedCourseUnit(courseUnit);
	};

	useEffect(() => {
		getAllCourseUnits().then((res) => {
			setCourseUnits(res.data);

			// set default as first course unit retrieved
			updateSelectedCourseUnit(res.data[0]);
		});
	}, []);

	// Creating course unit
	const { toast } = useToast();

	// 1. Define form schema
	const formSchema = z.object({
		course_code: z.string().min(9).max(50),
		title: z.string().min(1).max(300),
		description: z.string(),
	});

	// 2. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			course_code: "",
			title: "",
			description: "",
		},
	});

	// 3. Define a submit handler.
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		postCourseUnit(values)
			.then((res) => {
				toast({
					title: "Course Unit Succesfully Added",
					description: `${values.course_code}: ${values.title}`,
				});
			})
			.catch((error) => {
				toast({
					title: "Uh oh! Something went wrong.",
					description: error.message + ". We could not add your course unit.",
					variant: "destructive",
				});
			});
	};

	return (
		<Dialog
			open={showCreateCourseUnitDialog}
			onOpenChange={setShowCreateCourseUnitDialog}
		>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[300px] justify-between"
					>
						<span className="block overflow-hidden text-ellipsis">
							{selectedCourseUnit
								? `${selectedCourseUnit.course_code}: ${selectedCourseUnit.title}`
								: "Select course unit..."}
						</span>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[330px] p-0">
					<Command loop>
						<CommandList>
							<CommandInput placeholder="Search course units..." />
							<CommandEmpty>No course unit found</CommandEmpty>
							<CommandGroup>
								{courseUnits?.map((unit: any) => (
									<CommandItem
										key={unit.id}
										value={`${unit.course_code}: ${unit.title}`}
										onSelect={() => {
											updateSelectedCourseUnit(unit);
											setOpen(false);
										}}
										className=""
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												selectedCourseUnit === unit
													? "opacity-100"
													: "opacity-0"
											)}
										/>
										{`${unit.course_code}: ${unit.title}`}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
										onSelect={() => {
											setOpen(false);
											setShowCreateCourseUnitDialog(true);
										}}
									>
										<PlusCircle />
										&nbsp; Create Course Unit
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Course Unit</DialogTitle>
					<DialogDescription>
						Start building your new course unit here. Give it a unit code and
						title that stands-out, and a description defining the unit's
						objectives.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="course_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="course-unit-course_code-input">
										Course Unit Code
									</FormLabel>
									<FormControl>
										<Input
											id="course-unit-course_code-input"
											placeholder="COMP30040"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										The University should assign this to you.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="course-unit-title-input">
										Course Unit Title
									</FormLabel>
									<FormControl>
										<Input
											id="course-unit-title-input"
											placeholder="Third Year Laboratory"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Choose a title that clearly represents the overarching theme
										or subject of the course. It should be concise yet
										descriptive enough to give potential learners an idea of
										what to expect.
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
									<FormLabel htmlFor="course-unit-description-input">
										Course Unit Description
									</FormLabel>
									<FormControl>
										<Textarea
											id="course-unit-description-input"
											placeholder="This course unit..."
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This should provide an overview of what the course will
										cover, its objectives, and what the learners will gain by
										the end of it. Mention any prerequisites if there are any.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setShowCreateCourseUnitDialog(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Continue</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
