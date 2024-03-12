import axios from "axios";
import { NewCourseUnitData } from "./apiTypes";

const apiDomain: string = import.meta.env.VITE_API_URL;

// course unit
export function getAllCourseUnits() {
	return axios.get(`${apiDomain}/course_units/`);
}

export function postCourseUnit(data: NewCourseUnitData) {
	return axios.post(`${apiDomain}/course_units/`, data);
}
