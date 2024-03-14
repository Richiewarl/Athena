import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { invalidateUser } from "@/authentication/components/authenticator";
import { UserSessionData } from "@/authentication/data/userTypes";
import { useNavigate } from "react-router-dom";
import { paths } from "@/enums/paths";

import { LogOut, Settings } from "lucide-react";

export default function UserNav() {
	const navigate = useNavigate();

	const userJson = localStorage.getItem("user-data");
	let user: UserSessionData | null = null;
	let initials = "N/A";

	if (userJson) {
		user = JSON.parse(userJson);

		if (user && user.fullname) {
			initials = user.fullname
				.split(" ")
				.map((name) => name[0].toUpperCase())
				.join();
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="profile picture"
						/>
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-2">
						<p className="text-sm font-medium leading-none">
							{user ? user.fullname : "N/A"}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user ? user.username : "N/A"}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => navigate(paths.ProfileSettings)}>
					<Settings className="w-5 mr-2" />
					Profile Settings
				</DropdownMenuItem>
				<DropdownMenuItem
					className="bg-destructive text-destructive-foreground"
					onClick={() => invalidateUser()}
				>
					<LogOut className="w-5 mr-2" />
					Log Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
