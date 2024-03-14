import axios from "axios";
import { NewUserProfileData } from "./userTypes";

const apiDomain: string = import.meta.env.VITE_API_DOMAIN;

export function getUserByUsername(username: string) {
	return axios.get(`${apiDomain}/users/by_username/?username=${username}`);
}

export function createNewUser(data: NewUserProfileData) {
	return axios.post(`${apiDomain}/users/`, data);
}
