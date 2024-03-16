import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
	DialogContent,
	DialogFooter,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { useState } from "react";
import { useCourseUnit } from "../context/course-unit-provider";
import { useUser } from "@/authentication/context/user-provider";
import { UserRole } from "@/authentication/data/userDataMapper";
import { deleteCourseUnit } from "../data/api";
import { useToast } from "@/components/ui/use-toast";
import { CourseUnitData } from "../data/apiTypes";
import { DialogClose } from "@radix-ui/react-dialog";

interface CourseUnitDetailButtonProps
	extends React.DialogHTMLAttributes<HTMLDialogElement> {
	courseUnits: CourseUnitData[];
	setCourseUnits: Function;
}

export default function CourseUnitDetailButton({
	courseUnits,
	setCourseUnits,
}: CourseUnitDetailButtonProps) {
	const [showDetailDialog, setShowDetailDialog] = useState(false);
	const { selectedCourseUnit, setSelectedCourseUnit } = useCourseUnit();
	const user = useUser().user;
	const { toast } = useToast();

	const deleteCourseUnitHandler = () => {
		selectedCourseUnit &&
			deleteCourseUnit(selectedCourseUnit.id)
				.then((res) => {
					toast({
						title: "Course Unit Succesfully Deleted",
						description: `${selectedCourseUnit.course_code}: ${selectedCourseUnit.title} has been deleted.`,
					});

					let updatedCourseUnits = courseUnits.filter(
						(unit) => unit != selectedCourseUnit
					);
					setSelectedCourseUnit(updatedCourseUnits[0]);
					setCourseUnits(updatedCourseUnits);
				})
				.catch((error) => {
					toast({
						title: "Uh oh! Something went wrong.",
						description:
							error.message + ". We could not delete your course unit.",
						variant: "destructive",
					});
				});
	};

	return (
		<Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
			<DialogTrigger asChild>
				<Button variant="secondary">
					<Info />
					&nbsp; Course Details
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					{selectedCourseUnit?.course_code}: {selectedCourseUnit?.title}
				</DialogHeader>
				<DialogDescription>{selectedCourseUnit?.description}</DialogDescription>
				{user && user.user_role >= UserRole.LECTURER && (
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button variant="destructive" onClick={deleteCourseUnitHandler}>
								Delete this Unit
							</Button>
						</DialogClose>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
