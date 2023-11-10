export interface WeekData {
	id: number;
	title: string;
	course_unit_id: string;
}

export interface VideoData {
	id: number;
	title: string;
	description: string;
	uploaded_at: Date;
	link: string;
	week_id: number;
}
