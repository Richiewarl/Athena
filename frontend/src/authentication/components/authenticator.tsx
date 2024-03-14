import uniqid from "uniqid";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { UserSessionData } from "../data/userTypes";
import { paths } from "@/enums/paths";

const domain: string = import.meta.env.VITE_WEB_DOMAIN;

const DEVELOPER_URL = domain + "/homepage";
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
	const production_env: boolean = import.meta.env.MODE === "production";

	if (userJson) {
		user = JSON.parse(userJson);

		if (!user.loggedIn) {
			if (!user.csticket || !searchParams.get("csticket")) {
				sendForAuthentication();
			} else if (user.csticket != searchParams.get("csticket")) {
				sendForAuthentication();
			} else {
				recordAuthenticatedUser(searchParams, location, navigate);
				if (production_env) {
					// !TBD! : THIS SHOULD ONLY USE isGETParametersMatchingServerAuthentication FOR AUTH VERIFICATION
					// localhost is not valid for the UoM servers so we have to ignore that for now and relax auth during dev
					if (isGETParametersMatchingServerAuthentication(searchParams)) {
						return true;
					} else {
						invalidateUser();
						return false;
					}
				} else {
					recordAuthenticatedUser(searchParams, location, navigate);
					return true;
				}
			}
		} else {
			navigate(paths.Homepage);
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
		CASAuth: true,
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
	searchParams: any
) => {
	const csticket = searchParams.get("csticket");
	const username = searchParams.get("username");
	const fullname = encodeURIComponent(searchParams.get("fullname"));

	let url = getAuthenticationURL(csticket, "confirm");
	url += "&username=" + username + "&fullname=" + fullname;
	url = url;
	console.log(url);

	fetch(url, { mode: "cors" })
		.then((res) => {
			console.log(res);
		})
		.catch((error) => {
			console.error(error);
		});

	return false;
};

const recordAuthenticatedUser = (
	searchParams: any,
	location: string,
	navigate: Function
) => {
	let user: UserSessionData = {
		loggedIn:
			import.meta.env.MODE === "production" // SECRISK
				? isGETParametersMatchingServerAuthentication(searchParams)
				: true,
		csticket: searchParams.get("csticket"),
		timestamp: new Date().getTime() / 1000, // convert from ms to s
		username: searchParams.get("username"),
		fullname: searchParams.get("fullname"),
		CASAuth: true,
	};

	localStorage.setItem("user-data", JSON.stringify(user));

	if (location != paths.Homepage) {
		navigate(paths.Homepage);
	}
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
