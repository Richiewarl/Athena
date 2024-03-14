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
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "@/enums/paths";

import { LogOut, Settings } from "lucide-react";
import {
	geUsertInitials,
	getUserSessionData,
} from "@/authentication/data/utils";
import { useEffect, useState } from "react";
import { getUserByUsername } from "@/authentication/data/api";
import {
	UserProfileData,
	UserSessionData,
} from "@/authentication/data/userTypes";

import default_pfp from "../../../../public/default_pfp.svg";

export default function UserNav() {
	const navigate = useNavigate();
	const initials = geUsertInitials();
	const userSessionData: UserSessionData = getUserSessionData();
	const [user, setUser] = useState<UserProfileData | null>(null);

	useEffect(() => {
		getUserByUsername(userSessionData.username ?? "")
			.then((res) => {
				setUser(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={
								user
									? user.profile_picture == ""
										? default_pfp
										: user.profile_picture
									: default_pfp
							}
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
