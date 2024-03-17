import axios from "axios";
import { NewUserProfileData } from "@/authentication/data/userTypes";

const apiDomain: string = import.meta.env.VITE_API_DOMAIN;

export function updateUserProfile(id: number, data: NewUserProfileData) {
	return axios.put(`${apiDomain}/users/${id}/`, data);
}
