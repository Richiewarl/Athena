export interface UserProfileData {
	id: number;
	fullname: string;
	username: string;
	created_on: Date;
	last_login: Date;
	profile_picture: string;
	user_role: number;
}

export type NewUserProfileData = Omit<
	UserProfileData,
	"id" | "created_on" | "last_login"
>;
