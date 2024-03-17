export interface UserSessionData {
	loggedIn: boolean;
	csticket?: string;
	timestamp?: number;
	username?: string;
	fullname?: string;
	external_auth: boolean;
}

export interface UserProfileData {
	id: number;
	fullname: string;
	username: string;
	created_on: Date;
	last_login: Date;
	profile_picture: string;
	user_role: number;
	external_auth: boolean;
}

export type NewUserProfileData = Omit<
	UserProfileData,
	"id" | "created_on" | "last_login"
>;
