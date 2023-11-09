import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getAllWeeks } from "../api";
import { useEffect, useState } from "react";

// types
import { WeekData } from "../apiTypes";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
	const [weeks, setWeeks] = useState([]);

	useEffect(() => {
		const data = getAllWeeks().then((res) => {
			setWeeks(res.data);
			console.log(weeks);
		});
	}, []);

	return (
		<aside className={cn("pb-12", className)}>
			<div className="space-y-4 py-4">
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Intro to Discrete Mathematics
					</h2>
					<ScrollArea className="h-full px-1">
						<div className="space-y-1 p-2">
							{weeks.map((week: WeekData) => (
								<Button variant="ghost" className="text-ellipsis justify-start">
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
