import uniqid from "uniqid";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { UserProfileData, UserSessionData } from "../data/userTypes";
import { paths } from "@/enums/paths";
import { useUser } from "../context/user-provider";
import { createNewUser, getUserByUsername } from "../data/api";

const domain: string = import.meta.env.VITE_WEB_DOMAIN;

const DEVELOPER_URL = domain + paths.UoMAuth;
const AUTHENTICATION_SERVICE_URL =
	"http://studentnet.cs.manchester.ac.uk/authenticate/";
const AUTHENTICATION_LOGOUT_URL =
	"http://studentnet.cs.manchester.ac.uk/systemlogout.php";

// SECRISK
const validateUser = (
	searchParams: any,
	location: string,
	navigate: Function,
	userData: UserProfileData | null,
	setUser: Function
) => {
	const userJson = localStorage.getItem("user-data");
	let user: UserSessionData;
	const production: boolean = import.meta.env.MODE === "production";

	if (userJson) {
		user = JSON.parse(userJson);
		console.log(searchParams.get("csticket"));
		console.log(user.csticket);

		if (!user.loggedIn) {
			if (!user.csticket || !searchParams.get("csticket")) {
				sendForAuthentication();
			} else if (user.csticket != searchParams.get("csticket")) {
				sendForAuthentication();
			} else {
				recordAuthenticatedUser(
					production,
					searchParams,
					location,
					navigate,
					setUser
				);
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
		external_auth: true,
	};

	localStorage.setItem("user-data", JSON.stringify(user));

	console.log(url);
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
	let url = getAuthenticationURL(csticket, "confirm");
	url += "&username=" + username + "&fullname=" + fullname;
	url = url;

	fetch(url, { mode: "cors" })
		.then((res) => {
			console.log(res);
		})
		.catch((error) => {
			console.error(error);
		});

	return false;
};

// SECRISK
const recordAuthenticatedUser = (
	production: boolean,
	searchParams: any,
	location: string,
	navigate: Function,
	setUser: Function
) => {
	console.log("CALLED");

	const csticket = searchParams.get("csticket");
	const username = searchParams.get("username");
	const fullname = searchParams.get("fullname");

	if (
		production &&
		!isGETParametersMatchingServerAuthentication(csticket, username, fullname)
	) {
		invalidateUser(setUser);
		navigate(paths.LoginPage);
	} else {
		let user: UserSessionData = {
			loggedIn: true,
			csticket: csticket,
			timestamp: new Date().getTime() / 1000, // convert from ms to s
			username: username,
			fullname: fullname,
			external_auth: true,
		};

		localStorage.setItem("user-data", JSON.stringify(user));
		setUser(user);

		getUserByUsername(username)
			.then((res) => {
				setUser(res.data);

				// if user exist go to homepage
				if (location != paths.Homepage) {
					navigate(paths.Homepage);
				}
			})
			.catch((error) => {
				const status = error.response.status;

				// if user not found, redirect to profile settings
				if (status == 404) {
					setUser({
						id: -1,
						fullname: fullname,
						username: username,
						created_on: new Date(),
						last_login: new Date(),
						profile_picture: "",
						user_role: -1,
						external_auth: true,
					});

					navigate(paths.ProfileSettings);
				}
			});
	}
};

export function invalidateUser(setUser: Function) {
	localStorage.clear();
	setUser(null);

	window.location.href = AUTHENTICATION_LOGOUT_URL;
}

// THIS REDIRECTS TO UoM CAS AUTH SERVICE
export default function UoMAuth() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const { user, setUser } = useUser();

	useEffect(() => {
		validateUser(searchParams, location, navigate, user, setUser);
	}, []);

	return <></>;
}
