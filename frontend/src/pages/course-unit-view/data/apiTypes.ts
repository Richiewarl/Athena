// used toISOString() to represent DataTime in ISO8601 format.

export interface WeekData {
	id: number;
	title: string;
	course_unit_id: string;
}

export interface VideoData {
	id: number;
	title: string;
	description: string;
	uploaded_at: string; // DateTime timestamp
	link: string;
	week_id: number;
}

export interface CommentData {
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
