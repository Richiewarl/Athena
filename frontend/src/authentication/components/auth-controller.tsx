import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isGETParametersMatchingServerAuthentication } from "./authenticator";
import { homepage, logInPage } from "../data/paths";

// If not logged in, go to login page, regardless of location
export default function AuthController() {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const [searchParams] = useSearchParams();

	const production: boolean = import.meta.env.MODE === "production";

	useEffect(() => {
		let loggedIn: boolean = false;

		if (!localStorage.getItem("user-data")) {
			loggedIn = false;
		} else {
			// !TBD! : THIS SHOULD ONLY USE isGETParametersMatchingServerAuthentication FOR AUTH VERIFICATION
			// localhost is not valid for the UoM servers so we have to ignore that for now and relax auth during dev
			if (
				production &&
				isGETParametersMatchingServerAuthentication(searchParams)
			) {
				loggedIn = true;
			} else if (!production) {
				loggedIn = true;
			}
		}

		// only redirect when not already on the page
		if (!loggedIn && location !== logInPage) {
			navigate(logInPage);
		} else if (loggedIn && location !== homepage) {
			navigate(homepage);
		}
	}, []);

	return <></>;
}
