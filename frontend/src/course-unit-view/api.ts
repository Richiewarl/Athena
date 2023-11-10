import axios from "axios";

const apiDomain: string = import.meta.env.VITE_API_URL;

// api calls to Django endpoints
export function getAllWeeks() {
	return axios.get(`${apiDomain}/weeks`);
}

export function getAllVideos() {
	return axios.get(`${apiDomain}/videos`);
}

export function getWeekVideos(week_id?: number) {
	return axios.get(`${apiDomain}/weeks/${week_id}/videos`);
}
