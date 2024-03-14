import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "@/enums/paths";
import { getUserSessionData, verifyLogIn } from "../data/utils";
import { getUserByUsername } from "../data/api";
import { UserSessionData } from "../data/userTypes";

// If not logged in, go to login page, regardless of location
export default function AuthController() {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const userSessionData: UserSessionData = getUserSessionData();

	useEffect(() => {
		if (!verifyLogIn()) {
			location != paths.LoginPage && navigate(paths.LoginPage);
		} else {
			if (location == paths.LoginPage) {
				getUserByUsername(userSessionData.username ?? "")
					.then((res) => {
						navigate(paths.Homepage);
					})
					.catch((error) => {
						navigate(paths.ProfileSettings);
					});
			}
		}
	}, []);

	return <></>;
}
