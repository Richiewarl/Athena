import { isGETParametersMatchingServerAuthentication } from "../components/authenticator";
import { UserSessionData } from "./userTypes";

// Check login status by verifying session data with server
export function verifyLogIn() {
	const userJson = localStorage.getItem("user-data");
	let user: UserSessionData;

	if (userJson) {
		user = JSON.parse(userJson);

		if (user.loggedIn) {
			return isGETParametersMatchingServerAuthentication(
				user.csticket ?? "",
				user.username ?? "",
				user.fullname ?? ""
			);
		} else {
			return false;
		}
	} else {
		return false;
	}
}

export function getUserSessionData() {
	const userJson = localStorage.getItem("user-data");

	if (userJson) {
		return JSON.parse(userJson);
	}

	return null;
}

export function geUsertInitials() {
	const userJson = localStorage.getItem("user-data");

	if (userJson) {
		JSON.parse(userJson);
	}

	return "N/A";
}
