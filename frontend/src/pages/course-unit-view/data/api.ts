import axios from "axios";
import {
	NewCommentData,
	NewDislikeData,
	NewLikeData,
	NewVideoData,
	NewWeekData,
} from "./apiTypes";

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

export function deleteWeek(week_id: number) {
	return axios.delete(`${apiDomain}/weeks/${week_id}`);
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

export function deleteVideo(video_id: number) {
	return axios.delete(`${apiDomain}/videos/${video_id}`);
}

// comments
export function postComment(data: NewCommentData) {
	return axios.post(`${apiDomain}/comments/`, data);
}

export function updateComment(data: NewCommentData, comment_id: number) {
	return axios.put(`${apiDomain}/comments/${comment_id}/`, data);
}

export function deleteComment(comment_id: number) {
	return axios.delete(`${apiDomain}/comments/${comment_id}/`);
}

export function getVideoComments(video_id: number) {
	return axios.get(`${apiDomain}/videos/${video_id}/comments/`);
}

export function getCommentReplies(comment_id: number) {
	return axios.get(`${apiDomain}/comments/${comment_id}/replies/`);
}

export function postLike(data: NewLikeData) {
	return axios.post(`${apiDomain}/like`, data);
}

export function postDislike(data: NewDislikeData) {
	return axios.post(`${apiDomain}/dislike`, data);
}
