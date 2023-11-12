import { ModeToggle } from "../components/theme-control/mode-toggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CourseUnitCombobox } from "./components/course-unit-combobox";
import { CourseUnitDataProvider } from "./context/course-unit-provider";

export default function TopMenubar() {
	return (
		<div className={"flex-col md:flex"}>
			<div className="flex h-14 items-center px-4 border-b">
				<CourseUnitCombobox />
				<div className="ml-auto flex items-center space-x-1">
					<ModeToggle />
					<Avatar className={"pd-xml-auto"}>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>RL</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</div>
	);
}
