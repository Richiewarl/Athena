import axios from "axios";
import { CommentData } from "./apiTypes";

const apiDomain: string = import.meta.env.VITE_API_URL;

// api calls to Django endpoints
// END URLs WITH SLASH, DJANGO PROJECT ENFORCES IT

// weeks
export function getAllWeeks() {
	return axios.get(`${apiDomain}/weeks/`);
}

export function getCourseUnitWeeks(course_unit_id?: number) {
	return axios.get(`${apiDomain}/course_units/${course_unit_id}/weeks/`);
}

// video
export function getAllVideos() {
	return axios.get(`${apiDomain}/videos`);
}

export function getWeekVideos(week_id?: number) {
	return axios.get(`${apiDomain}/weeks/${week_id}/videos/`);
}

export function getVideo(video_id?: number) {
	return axios.get(`${apiDomain}/videos/${video_id}/`);
}

// comments
export async function postComment(data: CommentData) {
	return axios.post(`${apiDomain}/comments/`, data).then((res) => {
		console.log(res);
	});
}
