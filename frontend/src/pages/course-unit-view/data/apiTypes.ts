// used toISOString() to represent DataTime in ISO8601 format.

export interface WeekData {
	id: number;
	title: string;
	course_unit_id: number;
}

export type NewWeekData = Omit<WeekData, "id">;

export interface VideoData {
	id: number;
	title: string;
	description: string;
	uploaded_at: string; // DateTime timestamp
	link: string;
	thumbnail: string;
	week_id: number;
}

export type NewVideoData = Omit<VideoData, "id">;

export interface CommentData {
	id: number;
	fullname: string;
	username: string;
	body: string;
	created_at: string; // DateTime timestamp
	active: boolean;
	like: number;
	dislike: number;
	video_id: number;
	parent_comment_id: number | null;
}

export type AddNewCommentData = Omit<CommentData, "id">;
