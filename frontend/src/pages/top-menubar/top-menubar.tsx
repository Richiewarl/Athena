import { ModeToggle } from "../../components/theme-control/mode-toggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CourseUnitCombobox from "./components/course-unit-combobox";
import UserNav from "./components/user-nav";

export default function TopMenubar() {
	return (
		<div className={"flex-col md:flex"}>
			<div className="flex h-14 items-center px-4 border-b">
				<CourseUnitCombobox />
				<div className="ml-auto flex items-center space-x-1">
					<ModeToggle />
					<UserNav />
				</div>
			</div>
		</div>
	);
}
