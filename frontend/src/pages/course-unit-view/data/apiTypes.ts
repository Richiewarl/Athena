import { UserProfileData } from "@/authentication/data/userTypes";
import { LargeNumberLike } from "crypto";
import { UseFormSetError } from "react-hook-form";

export interface WeekData {
	id: number;
	title: string;
	description: string;
	created_on: Date;
	updated_on: Date;
	course_unit: number;
}

export type NewWeekData = Omit<WeekData, "id" | "created_on" | "updated_on">;

export interface VideoData {
	id: number;
	title: string;
	description: string;
	created_on: Date;
	updated_on: Date;
	link: string;
	thumbnail: string;
	week: number;
}

export type NewVideoData = Omit<VideoData, "id" | "created_on" | "updated_on">;

export interface CommentData {
	id: number;
	user: UserProfileData;
	body: string;
	created_on: Date;
	updated_on: Date;
	active: boolean;
	video: number;
	parent_comment: number | null;
}

export interface AddNewCommentData {
	user: number;
	body: string;
	active: boolean;
	video: number;
	parent_comment: number | null;
}

export interface NewCommentResponseData {
	id: number;
	user: number;
	body: string;
	created_on: Date;
	updated_on: Date;
	active: boolean;
	video: number;
	parent_comment: number | null;
}

export const mapNewCommentDataToCommentData = (
	res_data: NewCommentResponseData,
	user: UserProfileData | null
) => {
	if (user) {
		return {
			id: res_data.id,
			user: user,
			body: res_data.body,
			created_on: res_data.created_on,
			updated_on: res_data.updated_on,
			active: res_data.active,
			video: res_data.video,
			parent_comment: res_data.parent_comment,
		};
	} else {
		console.error("User not found while mapping New Comment Data");
		return false;
	}
};

export interface LikeData {
	id: number;
	user: number;
	created_on: Date;
	updated_on: Date;
}
export type NewLikeData = Omit<LikeData, "id" | "created_on" | "updated_on">;

export interface DislikeData extends LikeData {}

export type NewDislikeData = NewLikeData;
