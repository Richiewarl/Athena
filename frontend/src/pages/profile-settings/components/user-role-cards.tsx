import { UserProfileData } from "@/authentication/data/userTypes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { useState } from "react";

import {
	PiChalkboardTeacherFill,
	PiStudentFill,
	PiPersonFill,
} from "react-icons/pi";

interface UserRoleCardSelectProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	user: UserProfileData | null;
}

export const UserRoleCardSelect = React.forwardRef<
	HTMLInputElement,
	UserRoleCardSelectProps
>(({ ...props }, ref) => {
	const user: UserProfileData | null = props.user;

	const handleChange = (x: any) => {
		if (props.onChange) {
			props.onChange(x);
		} else {
			console.error("onChange() for user_role radio buttons missing.");
		}
	};

	return (
		<RadioGroup
			defaultValue={user ? user.user_role.toString() : "0"}
			id="user-role-input"
			className="grid grid-cols-3 gap-4"
			onValueChange={handleChange}
			value={props.value?.toString()}
			ref={ref}
		>
			<div>
				<RadioGroupItem value="0" id="student" className="peer sr-only" />
				<Label
					htmlFor="student"
					className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
				>
					<PiPersonFill className="mb-2" size={30} />
					Student
				</Label>
			</div>
			<div>
				<RadioGroupItem
					value="1"
					id="teaching-assistant"
					className="peer sr-only"
				/>
				<Label
					htmlFor="teaching-assistant"
					className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
				>
					<PiStudentFill className="mb-2" size={30} />
					Teaching Assistant
				</Label>
			</div>
			<div>
				<RadioGroupItem value="2" id="lecturer" className="peer sr-only" />
				<Label
					htmlFor="lecturer"
					className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
				>
					<PiChalkboardTeacherFill className="mb-2" size={30} />
					Lecturer
				</Label>
			</div>
		</RadioGroup>
	);
});
