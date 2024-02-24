import axios from "axios";

const apiDomain: string = import.meta.env.VITE_API_URL;

// api calls to Django endpoints
export function getAllCourseUnits() {
	return axios.get(`${apiDomain}/course_units`);
}
