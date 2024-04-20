import { ModeToggle } from "../../components/theme-control/mode-toggle";

import CourseUnitCombobox from "./components/course-unit-combobox";
import UserNav from "./components/user-nav";
import NotificationButton from "./components/notification";
import EncouragementButton from "./components/cheerleader-gpt";
import CommunityButton from "./components/community-button";

export default function TopMenubar() {
	return (
		<div className={"flex-col md:flex"}>
			<div className="flex h-14 items-center px-4 border-b">
				<CourseUnitCombobox />
				<div className="ml-auto flex items-center space-x-1">
					<CommunityButton />
					<EncouragementButton />
					<NotificationButton />
					<ModeToggle />
					&nbsp;
					<UserNav />
				</div>
			</div>
		</div>
	);
}
