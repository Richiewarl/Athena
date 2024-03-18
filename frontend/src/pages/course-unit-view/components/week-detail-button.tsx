import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
	DialogContent,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useWeek } from "../context/week-provider";
import { deleteWeek } from "../data/api";
import { useToast } from "@/components/ui/use-toast";
import { Info } from "lucide-react";

export function WeekDetailButton() {
	const { selectedWeek, setSelectedWeek, weeks, setWeeks } = useWeek();
	const [showWeekDetails, setShowWeekDetails] = useState(false);
	const { toast } = useToast();

	const handleWeekDelete = () => {
		selectedWeek &&
			deleteWeek(selectedWeek.id).then((res) => {
				toast({
					title: "Folder Succesfully Deleted",
					description: `${selectedWeek.title} has been deleted.`,
					variant: "success",
				});

				let updatedWeeks = weeks.filter((week) => week != selectedWeek);
				setSelectedWeek(updatedWeeks[0]);
				setWeeks(updatedWeeks);
			});
	};

	return (
		<Dialog open={showWeekDetails} onOpenChange={setShowWeekDetails}>
			<DialogTrigger asChild>
				<Button variant="secondary" className="mr-5">
					<Info />
					&nbsp; Folder Detail
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{selectedWeek?.title}</DialogTitle>
				</DialogHeader>
				<DialogDescription>{selectedWeek?.description}</DialogDescription>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" onClick={() => setShowWeekDetails(false)}>
							Cancel
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button variant="destructive" onClick={handleWeekDelete}>
							Delete Folder
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
