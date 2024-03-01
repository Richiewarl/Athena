import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getCourseUnitWeeks } from "../data/api";
import { useEffect, useState } from "react";

// types
import { WeekData } from "../data/apiTypes";
import { useWeek } from "../context/week-provider";
import { useCourseUnit } from "@/pages/top-menubar/context/course-unit-provider";

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
				</ScrollArea>
			</div>
		</aside>
	);
}