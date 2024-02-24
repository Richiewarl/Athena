import axios from "axios";

const apiDomain: string = import.meta.env.VITE_API_URL;

// api calls to Django endpoints

// weeks
export function getAllWeeks() {
	return axios.get(`${apiDomain}/weeks`);
}

export function getCourseUnitWeeks(course_unit_id?: number) {
	return axios.get(`${apiDomain}/course_units/${course_unit_id}/weeks`);
}

// video
export function getAllVideos() {
	return axios.get(`${apiDomain}/videos`);
}

export function getWeekVideos(week_id?: number) {
	return axios.get(`${apiDomain}/weeks/${week_id}/videos`);
}

export function getVideo(video_id?: number) {
	return axios.get(`${apiDomain}/videos/${video_id}`);
}
