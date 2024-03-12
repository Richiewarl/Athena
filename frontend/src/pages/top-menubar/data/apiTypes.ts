export interface CourseUnitData {
	id: number;
	course_code: string;
	title: string;
	description: string;
}

export type NewCourseUnitData = Omit<CourseUnitData, "id">;
