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
import { CourseUnitData } from "../data/apiTypes";
import { postCourseUnit } from "../data/api";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCourseUnit } from "../context/course-unit-provider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CourseUnitFormProps
	extends React.FormHTMLAttributes<HTMLFormElement> {
	courseUnits: CourseUnitData[];
	setCourseUnits: Function;
	setShowCreateCourseUnitDialog: Function;
}

export function CourseUnitForm({
	courseUnits,
	setCourseUnits,
	setShowCreateCourseUnitDialog,
}: CourseUnitFormProps) {
	const setSelectedCourseUnit = useCourseUnit().setSelectedCourseUnit;

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

				setCourseUnits([res.data, ...courseUnits]);
				setSelectedCourseUnit(res.data);
				setShowCreateCourseUnitDialog(false);
				form.reset();
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
		<div className="h-[560px]">
			<ScrollArea className="h-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="ml-1 mr-3 space-y-8"
					>
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
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button type="submit">Continue</Button>
						</DialogFooter>
					</form>
				</Form>
			</ScrollArea>
		</div>
	);
}
