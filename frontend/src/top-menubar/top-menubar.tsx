import { ModeToggle } from "../components/theme-control/mode-toggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CourseUnitCombobox } from "./course-unit-combobox";

const frameworks = [
	{
		value: "next.js",
		label: "Next.js",
	},
	{
		value: "sveltekit",
		label: "SvelteKit",
	},
	{
		value: "nuxt.js",
		label: "Nuxt.js",
	},
	{
		value: "remix",
		label: "Remix",
	},
	{
		value: "astro",
		label: "Astro",
	},
];

export default function TopMenubar() {
	return (
		<div className={"hidden flex-col md:flex"}>
			<div className="flex h-14 items-center px-4 border-b">
				<CourseUnitCombobox data={frameworks} />
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
