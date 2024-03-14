import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import UoMAuth, {
	isGETParametersMatchingServerAuthentication,
} from "./authenticator";
import { paths } from "@/enums/paths";
import { UserSessionData } from "../data/userTypes";

// If not logged in, go to login page, regardless of location
export default function AuthController() {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const [searchParams] = useSearchParams();

	const production: boolean = import.meta.env.MODE === "production";

	const userJson = localStorage.getItem("user-data");
	let user: UserSessionData | null = null;
	if (userJson) {
		user = JSON.parse(userJson);
	}

	useEffect(() => {
		let loggedIn: boolean = false;

		if (user) {
			if (!user.loggedIn) {
				loggedIn = false;
			} else {
				// // SECRISK : THIS SHOULD ONLY USE isGETParametersMatchingServerAuthentication FOR AUTH VERIFICATION
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
		}

		// navigate to login page if not logged in
		if (!loggedIn && location !== paths.LoginPage) {
			navigate(paths.LoginPage);
		}
	}, []);

	return (
		<>
			<UoMAuth />
		</>
	);
}
