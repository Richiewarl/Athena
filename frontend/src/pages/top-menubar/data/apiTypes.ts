export interface CourseUnitData {
	id: number;
	course_code: string;
	title: string;
	description: string;
	created_on: Date;
	updated_on: Date;
}

export type NewCourseUnitData = Omit<
	CourseUnitData,
	"id" | "created_on" | "updated_on"
>;
