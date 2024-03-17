import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	PiChalkboardTeacherFill,
	PiStudentFill,
	PiPersonFill,
} from "react-icons/pi";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { invalidateUser } from "@/authentication/components/authenticator";
import { useNavigate } from "react-router-dom";
import { paths } from "@/enums/paths";

import { LogOut, Settings, User } from "lucide-react";
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

import default_pfp from "@/assets/default_pfp.svg";
import {
	UserRoleToIcon,
	UserRoleToString,
} from "@/authentication/data/userDataMapper";

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
			<DropdownMenuContent className="w-60" align="end" forceMount>
				<DropdownMenuLabel className="flex flex-col items-center space-y-3 font-normal">
					<div className="flex flex-row space-x-2 items-center">
						<small className="text-sm font-medium leading-none">
							{user ? user.fullname : "N/A"}
						</small>
						<small className="text-xs leading-none text-muted-foreground">
							@{user ? user.username : "N/A"}
						</small>
					</div>
					<small className="flex flex-row items-center text-sm font-small leading-none">
						{user ? UserRoleToIcon[user.user_role] : <User />}&nbsp;
						{user ? UserRoleToString[user.user_role] : "Unknown Role"}
					</small>
					{user && (
						<small className="flex flex-row items-center text-sm font-small leading-none">
							Joined on:&nbsp;
							{new Date(user.created_on).toLocaleDateString("en-GB")}
						</small>
					)}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => navigate(paths.ProfileSettings)}>
					<Settings className="w-5 mr-2" />
					Profile Settings
				</DropdownMenuItem>
				<DropdownMenuItem
					className="text-destructive"
					onClick={() => invalidateUser()}
				>
					<LogOut className="w-5 mr-2" />
					Log Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
