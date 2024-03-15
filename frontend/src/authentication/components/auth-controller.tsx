import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "@/enums/paths";
import { getUserSessionData, verifyLogIn } from "../data/utils";
import { getUserByUsername } from "../data/api";
import { UserSessionData } from "../data/userTypes";
import { useUser } from "../context/user-provider";

// If not logged in, go to login page, regardless of location
export default function AuthController() {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const userSessionData: UserSessionData = getUserSessionData();
	const { user, setUser } = useUser();

	useEffect(() => {
		if (!verifyLogIn()) {
			location != paths.LoginPage && navigate(paths.LoginPage);
		} else {
			getUserByUsername(userSessionData.username ?? "")
				.then((res) => {
					setUser(res.data);
				})
				.then(() => {
					if (location == paths.LoginPage) {
						if (user) {
							navigate(paths.Homepage);
						} else {
							navigate(paths.LoginPage);
						}
					}
				});
		}
	}, []);

	return <></>;
}
