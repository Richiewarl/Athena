import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getAllWeeks } from "../api";
import { useEffect, useState } from "react";

// types
import { WeekData } from "../apiTypes";
import { useWeek } from "../context/week-provider";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
	const [weeks, setWeeks] = useState<WeekData[]>([]);

	const { week, setWeek } = useWeek();

	useEffect(() => {
		getAllWeeks().then((res) => {
			setWeeks(res.data);

			if (res.data.length > 0) {
				setWeek(res.data[0]); // set default as first week
			} else {
				console.log("No videos for this week");
			}
		});
	}, []);

	return (
		<aside className={cn("pb-12", className)}>
			<div className="space-y-4 py-4">
				<div className="py-2">
					<h2 className="relative px-7 text-lg font-semibold tracking-tight">
						Intro to Discrete Mathematics
					</h2>
					<ScrollArea className="h-full px-1" id="week-list-scrollarea">
						<div className="space-y-1 p-2">
							{weeks?.map((week: WeekData) => (
								<Button
									variant="ghost"
									className="block overflow-hidden text-ellipsis text-left w-full"
									key={week.id}
									onClick={() => setWeek(week)}
								>
									{week.title}
								</Button>
							))}
						</div>
					</ScrollArea>
				</div>
			</div>
		</aside>
	);
}
