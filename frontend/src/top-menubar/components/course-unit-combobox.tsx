"use client";

import { useState, useEffect, useRef } from "react";
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
import { HoverCard } from "@/components/ui/hover-card";
import { getAllCourseUnits } from "../data/api";
import { CourseUnitData } from "../data/apiTypes";
import { useCourseUnit } from "../context/course-unit-provider";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useMutationObserver } from "@/hooks/use-mutation-observer";

export function CourseUnitCombobox() {
	const [courseUnits, setCourseUnits] = useState<CourseUnitData[]>();
	const [selectedCourseUnit, setSelectedCourseUnit] =
		useState<CourseUnitData | null>();
	const [peekedCourseUnit, setPeekedCourseUnit] =
		useState<CourseUnitData | null>();
	const [open, setOpen] = useState(false);

	const setCourseUnit = useCourseUnit().setCourseUnit;

	function updateSelectedCourseUnit(courseUnit: CourseUnitData) {
		setCourseUnit(courseUnit);
		setSelectedCourseUnit(courseUnit);
	}

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
					className="w-[220px] justify-between"
				>
					<span className="block row overflow-hidden text-ellipsis">
						{selectedCourseUnit
							? `${selectedCourseUnit.course_code}: ${selectedCourseUnit.title}`
							: "Select course unit..."}
					</span>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0">
				<HoverCard>
					<HoverCardContent
						side="right"
						align="start"
						forceMount
						className="max-w-[500px] h-auto -mt-24"
					>
						<div className="grid gap-2 w-auto h-auto">
							<h4 className="font-medium leading-none">{`${peekedCourseUnit?.course_code}:`}</h4>
							<h4 className="font-medium leading-nonm,e">
								{peekedCourseUnit?.title}
							</h4>
							<div className="text-sm text-muted-foreground">
								{peekedCourseUnit?.description}
							</div>
						</div>
					</HoverCardContent>
					<Command loop>
						<CommandInput placeholder="Search course units..." />
						<CommandEmpty>No course unit found</CommandEmpty>
						{courseUnits?.map((unit: any) => (
							<HoverCardTrigger key={unit.id}>
								<CommandGroup>
									<CourseUnitItem
										unit={unit}
										isSelected={selectedCourseUnit === unit}
										onSelect={() => {
											updateSelectedCourseUnit(unit);
											setOpen(false);
										}}
										onPeek={() => setPeekedCourseUnit(unit)}
									/>
								</CommandGroup>
							</HoverCardTrigger>
						))}
					</Command>
				</HoverCard>
			</PopoverContent>
		</Popover>
	);
}

interface CourseUnitItemProps {
	unit: CourseUnitData;
	isSelected: boolean;
	onSelect: () => void;
	onPeek: (unit: CourseUnitData) => void;
}

function CourseUnitItem({
	unit,
	isSelected,
	onSelect,
	onPeek,
}: CourseUnitItemProps) {
	const ref = useRef<HTMLDivElement>(null);

	useMutationObserver(ref, (mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === "attributes") {
				if (mutation.attributeName === "aria-selected") {
					if (ref.current?.ariaSelected) {
						onPeek(unit);
					}
				}
			}
		}
	});

	return (
		<CommandItem
			key={unit.id}
			value={`${unit.course_code}: ${unit.title}`}
			onSelect={onSelect}
			ref={ref}
			className=""
		>
			<Check
				className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
			/>
			{`${unit.course_code}: ${unit.title}`}
		</CommandItem>
	);
}
