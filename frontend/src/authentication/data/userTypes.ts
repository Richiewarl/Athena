export interface UserSessionData {
	csticket?: string;
	timestamp?: number;
	username?: string;
	fullname?: string;
	// usercategory?: string;
	// department?: string;
	// studylevel?: string;
}

export enum UserRole {
	STUDENT = 0,
	TEACHING_ASSISTANT = 1,
	LECTURER = 2,
	ADMIN = 3,
}
