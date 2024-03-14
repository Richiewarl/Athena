import uniqid from "uniqid";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { UserSessionData } from "../data/userTypes";
import { paths } from "@/enums/paths";
import { getUserByUsername } from "../data/api";
import { verifyLogIn } from "../data/utils";

const domain: string = import.meta.env.VITE_WEB_DOMAIN;

const DEVELOPER_URL = domain + paths.UoMAuth;
const AUTHENTICATION_SERVICE_URL =
	"http://studentnet.cs.manchester.ac.uk/authenticate/";
const AUTHENTICATION_LOGOUT_URL =
	"http://studentnet.cs.manchester.ac.uk/systemlogout.php";

const validateUser = (
	searchParams: any,
	location: string,
	navigate: Function
) => {
	const userJson = localStorage.getItem("user-data");
	let user: UserSessionData;

	if (userJson) {
		user = JSON.parse(userJson);

		if (!user.loggedIn) {
			if (!user.csticket || !searchParams.get("csticket")) {
				sendForAuthentication();
			} else if (user.csticket != searchParams.get("csticket")) {
				sendForAuthentication();
			} else if (
				isGETParametersMatchingServerAuthentication(
					user.csticket,
					user.username ?? "",
					user.fullname ?? ""
				)
			) {
				recordAuthenticatedUser(searchParams, location, navigate);
			}
		} else {
			verifyLogIn() && navigate(paths.Homepage);
		}
	} else {
		sendForAuthentication();
	}

	return false;
};

const sendForAuthentication = () => {
	const csticket = uniqid();
	let url = getAuthenticationURL(csticket, "validate");

	let user: UserSessionData = {
		loggedIn: false,
		csticket: csticket,
		timestamp: undefined,
		username: undefined,
		fullname: undefined,
		external_auth: true,
	};

	localStorage.setItem("user-data", JSON.stringify(user));
	window.location.href = url;
};

const getAuthenticationURL = (csticket: string, command: string) => {
	return (
		AUTHENTICATION_SERVICE_URL +
		"?url=" +
		DEVELOPER_URL +
		"&csticket=" +
		csticket +
		"&version=3&command=" +
		command
	);
};

export const isGETParametersMatchingServerAuthentication = (
	csticket: string,
	username: string,
	fullname: string
) => {
	const production: boolean = import.meta.env.MODE === "production";

	let url = getAuthenticationURL(csticket, "confirm");
	url += "&username=" + username + "&fullname=" + fullname;
	url = url;

	// SECRISK
	if (production) {
		fetch(url)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.error(error);
			});
	} else {
		return true;
	}

	return false;
};

const recordAuthenticatedUser = (
	searchParams: any,
	location: string,
	navigate: Function
) => {
	const csticket = searchParams.get("csticket");
	const username = searchParams.get("username");
	const fullname = searchParams.get("fullname");

	let user: UserSessionData = {
		loggedIn: true,
		csticket: csticket,
		timestamp: new Date().getTime() / 1000, // convert from ms to s
		username: username,
		fullname: fullname,
		external_auth: true,
	};

	localStorage.setItem("user-data", JSON.stringify(user));

	getUserByUsername(username)
		.then((res) => {
			// if user exist go to homepage
			if (location != paths.Homepage) {
				navigate(paths.Homepage);
			}
		})
		.catch((error) => {
			const status = error.response.status;

			// if user not found, redirect to profile settings
			if (status == 404) {
				navigate(paths.ProfileSettings);
			}
		});
};

export function invalidateUser() {
	localStorage.clear();

	window.location.href = AUTHENTICATION_LOGOUT_URL;
}

// THIS REDIRECTS TO UoM CAS AUTH SERVICE
export default function UoMAuth() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation().pathname;

	useEffect(() => {
		validateUser(searchParams, location, navigate);
	}, []);

	return <></>;
}
