import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getCourseUnitWeeks } from "../data/api";
import { useEffect, useState } from "react";

// types
import { WeekData } from "../data/apiTypes";
import { useWeek } from "../context/week-provider";
import { useCourseUnit } from "@/pages/top-menubar/context/course-unit-provider";

import { FolderOpen, FolderX, PlusCircle } from "lucide-react";
import { AddWeekButton } from "./add-folder-button";
import { useUser } from "@/authentication/context/user-provider";
import { UserRole } from "@/authentication/data/userDataMapper";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

// WE CALL 'FOLDERS' WEEKS INTERNALLY
export default function Sidebar({ className }: SidebarProps) {
	const { selectedWeek, setSelectedWeek, weeks, setWeeks } = useWeek();

	const user = useUser().user;
	const selectedCourseUnit = useCourseUnit().selectedCourseUnit;

	useEffect(() => {
		if (selectedCourseUnit) {
			getCourseUnitWeeks(selectedCourseUnit.id).then((res) => {
				setWeeks(res.data);

				// set default as first week
				setSelectedWeek(res.data[0]);
			});
		} else {
			setWeeks([]);
			setSelectedWeek(null);
		}
	}, [selectedCourseUnit]);

	return (
		<aside className={cn("pb-12", className)}>
			<div className="flex flex-col items-center py-4">
				<h2
					className={`${
						selectedCourseUnit ?? "text-neutral-500"
					} flex flex-row items-center pb-2 relative px-7 text-lg font-semibold tracking-tight`}
				>
					{selectedCourseUnit ? (
						selectedCourseUnit.title
					) : (
						<>
							<FolderX />
							&nbsp; No Course Units
						</>
					)}
				</h2>
				{selectedCourseUnit && (
					<>
						<ScrollArea
							className="flex flex-col items-center w-full h-[650px] px-1"
							id="week-list-scrollarea"
						>
							<div className="space-y-1 p-2">
								{weeks && weeks.length > 0 ? (
									weeks.map((week: WeekData) => (
										<Button
											variant={week == selectedWeek ? "secondary" : "ghost"}
											className="w-full row-full justify-start font-normal"
											key={week.id}
											onClick={() => setSelectedWeek(week)}
										>
											<span className="block overflow-hidden text-ellipsis">
												{week.title}
											</span>
										</Button>
									))
								) : (
									<div className="flex flex-row items-center justify-center text-neutral-500 mb-2">
										<FolderOpen className="w-5" />
										&nbsp; No Folders
									</div>
								)}
							</div>
							{user && user.user_role >= UserRole.LECTURER && (
								<div className="flex flex-row w-full px-3 py-1">
									<AddWeekButton />
								</div>
							)}
						</ScrollArea>
					</>
				)}
			</div>
		</aside>
	);
}
