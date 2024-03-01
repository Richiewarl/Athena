import uniqid from "uniqid";
import { UserData } from "./data/userTypes";
import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import axios from "axios";

const DEVELOPER_URL = "http://localhost:5173/homepage";
const AUTHENTICATION_SERVICE_URL =
	"http://studentnet.cs.manchester.ac.uk/authenticate/";
const AUTHENTICATION_LOGOUT_URL =
	"http://studentnet.cs.manchester.ac.uk/systemlogout.php";

export function validateUser(searchParams: any) {
	const userJson = localStorage.getItem("user-data");
	let user: UserData;

	if (userJson) {
		user = JSON.parse(userJson);

		if (!user.csticket || !searchParams.get("csticket")) {
			sendForAuthentication();
		} else if (user.csticket != searchParams.get("csticket")) {
			sendForAuthentication();
		} else {
			recordAuthenticatedUser(searchParams);
			isGETParametersMatchingServerAuthentication(searchParams);
			return true;
		}
	} else {
		sendForAuthentication();
	}

	return false;
}

function sendForAuthentication() {
	const csticket = uniqid();
	let url = getAuthenticationURL(csticket, "validate");

	let user: UserData = {
		csticket: csticket,
		timestamp: undefined,
		username: undefined,
		fullname: undefined,
	};

	localStorage.setItem("user-data", JSON.stringify(user));

	window.location.href = url;
}

function getAuthenticationURL(csticket: string, command: string) {
	return (
		AUTHENTICATION_SERVICE_URL +
		"?url=" +
		DEVELOPER_URL +
		"&csticket=" +
		csticket +
		"&version=3&command=" +
		command
	);
}

function isGETParametersMatchingServerAuthentication(searchParams: any) {
	const csticket = searchParams.get("csticket");
	const username = searchParams.get("username");
	const fullname = searchParams.get("fullname");

	let url = getAuthenticationURL(csticket, "confirm");
	url += "&username=" + username + "&fullname=" + fullname;

	axios.get(url).then((res) => {
		console.log(res);
	});

	return false;
}

export function recordAuthenticatedUser(searchParams: any) {
	let user: UserData = {
		csticket: searchParams.get("csticket"),
		timestamp: new Date().getTime() / 1000, // convert from ms to s
		username: searchParams.get("username"),
		fullname: searchParams.get("fullname"),
	};

	localStorage.setItem("user-data", JSON.stringify(user));
}

export function invalidateUser() {
	localStorage.clear();
	window.location.href = AUTHENTICATION_LOGOUT_URL;
}

export default function Auth() {
	const [searchParams] = useSearchParams();

	useEffect(() => {
		// localStorage.clear();
		validateUser(searchParams);
	}, []);

	return <></>;
}
