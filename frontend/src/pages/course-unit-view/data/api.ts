import axios from "axios";
import { AddNewCommentData, NewVideoData, NewWeekData } from "./apiTypes";

const apiDomain: string = import.meta.env.VITE_API_DOMAIN;

// api calls to Django endpoints
// END URLs WITH SLASH, DJANGO PROJECT ENFORCES IT

// weeks
export function getAllWeeks() {
	return axios.get(`${apiDomain}/weeks/`);
}

export function getCourseUnitWeeks(course_unit_id: number) {
	return axios.get(`${apiDomain}/course_units/${course_unit_id}/weeks/`);
}

export function postWeek(data: NewWeekData) {
	return axios.post(`${apiDomain}/weeks/`, data);
}

// video
export function getAllVideos() {
	return axios.get(`${apiDomain}/videos`);
}

export function getWeekVideos(week_id: number) {
	return axios.get(`${apiDomain}/weeks/${week_id}/videos/`);
}

export function getVideo(video_id: number) {
	return axios.get(`${apiDomain}/videos/${video_id}/`);
}

export function postVideo(data: NewVideoData) {
	return axios.post(`${apiDomain}/videos/`, data);
}

// comments
export async function postComment(data: AddNewCommentData) {
	return axios.post(`${apiDomain}/comments/`, data);
}

export function getVideoComments(video_id: number) {
	return axios.get(`${apiDomain}/videos/${video_id}/comments/`);
}

export function getCommentReplies(comment_id: number) {
	return axios.get(`${apiDomain}/comments/${comment_id}/replies/`);
}
