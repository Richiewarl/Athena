import axios from "axios";
import { NewUserProfileData, UserSessionData } from "./userTypes";
import { getUserSessionData } from "./utils";

const apiDomain: string = import.meta.env.VITE_API_DOMAIN;

export async function getCurrentUser() {
	const user: UserSessionData = getUserSessionData();

	getUserByUsername(user.username ?? "")
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
}

export function getUserByUsername(username: string) {
	return axios.get(`${apiDomain}/users/by_username/?username=${username}`);
}

export function createNewUser(data: NewUserProfileData) {
	return axios.post(`${apiDomain}/users/`, data);
}
