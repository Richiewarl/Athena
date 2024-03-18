import { NavigateFunction, Location } from "react-router-dom";
import { getUserSessionData, verifyLogIn } from "./data/utils";
import { paths } from "@/enums/paths";
import { getUserByUsername } from "./data/api";
import { UserProfileData, UserSessionData } from "./data/userTypes";

export const auth_controller = (
	useNavigate: NavigateFunction,
	useLocation: Location<any>,
	user: UserProfileData | null,
	setUser: Function
) => {
	const navigate = useNavigate;
	const location = useLocation.pathname;
	const userSessionData: UserSessionData = getUserSessionData();

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
};
