export interface UserSessionData {
	loggedIn: boolean;
	csticket?: string;
	timestamp?: number;
	username?: string;
	fullname?: string;
	CASAuth: boolean;
}

export enum UserRole {
	STUDENT = 0,
	TEACHING_ASSISTANT = 1,
	LECTURER = 2,
	ADMIN = 3,
}
