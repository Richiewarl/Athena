"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { getAllCourseUnits } from "../data/api";
import { CourseUnitData } from "../data/apiTypes";
import { useCourseUnit } from "../context/course-unit-provider";

export default function CourseUnitCombobox() {
	const [courseUnits, setCourseUnits] = useState<CourseUnitData[]>();
	const [selectedCourseUnit, setSelectedCourseUnit] =
		useState<CourseUnitData | null>();
	const [open, setOpen] = useState(false);

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

	useEffect(() => {});

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[330px] justify-between"
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
										selectedCourseUnit === unit ? "opacity-100" : "opacity-0"
									)}
								/>
								{`${unit.course_code}: ${unit.title}`}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
