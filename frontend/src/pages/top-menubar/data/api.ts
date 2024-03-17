import axios from "axios";
import { NewCourseUnitData } from "./apiTypes";

const apiDomain: string = import.meta.env.VITE_API_DOMAIN;

// course unit
export function getAllCourseUnits() {
	return axios.get(`${apiDomain}/course_units/`);
}

export function postCourseUnit(data: NewCourseUnitData) {
	return axios.post(`${apiDomain}/course_units/`, data);
}

export function deleteCourseUnit(id: number) {
	return axios.delete(`${apiDomain}/course_units/${id}`);
}
