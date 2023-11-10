import axios from "axios";

const apiDomain: string = import.meta.env.VITE_API_URL;

export function getAllWeeks() {
	return axios.get(`${apiDomain}/weeks`);
}

export function getAllVideos() {
	return axios.get(`${apiDomain}/videos`);
}
