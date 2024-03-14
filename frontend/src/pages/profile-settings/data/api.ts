import axios from "axios";
import { NewUserProfileData, UserProfileData } from "./apiTypes";

const apiDomain: string = import.meta.env.VITE_API_DOMAIN;

export function createNewUser(data: NewUserProfileData) {
	return axios.post(`${apiDomain}/users/`, data);
}

export function updateUserProfile(data: UserProfileData) {
	return axios.put(`${apiDomain}/users/${data.id}`, data);
}
