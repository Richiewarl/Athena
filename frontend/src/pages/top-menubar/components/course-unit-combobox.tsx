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
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { getAllCourseUnits } from "../data/api";
import { CourseUnitData } from "../data/apiTypes";
import { useCourseUnit } from "../context/course-unit-provider";
import { useUser } from "@/authentication/context/user-provider";
import { UserRole } from "@/authentication/data/userDataMapper";
import { CourseUnitForm } from "./course-unit-form";
import CourseUnitDetailButton from "./course-unit-details-button";
import { useLocation, useNavigate } from "react-router-dom";
import { WeekData } from "@/pages/course-unit-view/data/apiTypes";
import { removeQueryString } from "@/utils";

export default function CourseUnitCombobox() {
	const [courseUnits, setCourseUnits] = useState<CourseUnitData[]>([]);
	const { selectedCourseUnit, setSelectedCourseUnit } = useCourseUnit();
	const user = useUser().user;

	const [open, setOpen] = useState(false);
	const [showCreateCourseUnitDialog, setShowCreateCourseUnitDialog] =
		useState(false);

	useEffect(() => {
		getAllCourseUnits().then((res) => {
			setCourseUnits(res.data);

			// set selected unit default as first unit retrieved
			setSelectedCourseUnit(res.data[0]);
		});
	}, []);

	// Switch course unit
	const navigate = useNavigate();
	const location = useLocation();
	const switchWeekHandler = (unit: CourseUnitData) => {
		// Replace the current URL without query parameters
		removeQueryString(navigate, location);
		setSelectedCourseUnit(unit);
		setOpen(false);
	};

	return (
		<div className="flex flex-row space-x-2 items-center">
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
							disabled={
								courseUnits.length == 0 &&
								(user ? user.user_role : 0) < UserRole.LECTURER // disable button for student if no units to choose from
							}
						>
							<span className="block overflow-hidden text-ellipsis">
								{courseUnits.length > 0
									? selectedCourseUnit
										? `${selectedCourseUnit.course_code}: ${selectedCourseUnit.title}`
										: "Select course unit..."
									: "No course units..."}
							</span>
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[300px] p-0">
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
												switchWeekHandler(unit);
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
							{(user ? user.user_role : 0) >= UserRole.LECTURER && (
								<>
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
								</>
							)}
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
					<CourseUnitForm
						courseUnits={courseUnits}
						setCourseUnits={setCourseUnits}
						setShowCreateCourseUnitDialog={setShowCreateCourseUnitDialog}
					/>
				</DialogContent>
			</Dialog>
			{selectedCourseUnit && (
				<CourseUnitDetailButton
					courseUnits={courseUnits}
					setCourseUnits={setCourseUnits}
				/>
			)}
		</div>
	);
}
