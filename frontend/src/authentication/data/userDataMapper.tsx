import { GraduationCap, ShieldCheck, User } from "lucide-react";
import { PiChalkboardTeacherFill, PiStudentFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";

export enum UserRole {
	STUDENT = 0,
	TEACHING_ASSISTANT = 1,
	LECTURER = 2,
	ADMIN = 3,
}

export const UserRoleToString: { [key: number]: string } = {
	0: "Student",
	1: "Teaching Assistant",
	2: "Lecturer",
	3: "Admin",
};

export const UserRoleToIcon: { [key: number]: React.ReactNode } = {
	0: <User className="w-5" />,
	1: <PiStudentFill size={20} />,
	2: <PiChalkboardTeacherFill size={20} />,
	3: <RiAdminFill size={20} />,
};

export const UserRoleToCommentIcon: { [key: number]: React.ReactNode } = {
	0: <></>,
	1: <GraduationCap size={20} />,
	2: <ShieldCheck size={20} />,
	4: <></>,
};
