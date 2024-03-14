import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
	invalidateUser,
	isGETParametersMatchingServerAuthentication,
} from "./authenticator";
import { paths } from "@/enums/paths";
import { useUser } from "../context/user-provider";

// If not logged in, go to login page, regardless of location
export default function AuthController() {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const [searchParams] = useSearchParams();
	const { user, setUser } = useUser();

	const production: boolean = import.meta.env.MODE === "production";

	useEffect(() => {
		const userJson = localStorage.getItem("user-data");
		let csticket = "";
		if (userJson) {
			csticket = JSON.parse(userJson).csticket;
		}

		// invalidateUser(setUser);

		if (!user) {
			location != paths.LoginPage && navigate(paths.LoginPage);
		} else {
			// // SECRISK : THIS SHOULD ONLY USE isGETParametersMatchingServerAuthentication FOR AUTH VERIFICATION
			// localhost is not valid for the UoM servers so we have to ignore that for now and relax auth during dev
			if (
				production &&
				!isGETParametersMatchingServerAuthentication(
					csticket,
					user.username,
					user.fullname
				)
			) {
				invalidateUser(setUser);
			}
		}
	}, []);

	return <></>;
}
