import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "@/enums/paths";
import { verifyLogIn } from "../data/utils";

// If not logged in, go to login page, regardless of location
export default function AuthController() {
	const navigate = useNavigate();
	const location = useLocation().pathname;

	useEffect(() => {
		if (!verifyLogIn()) {
			location != paths.LoginPage && navigate(paths.LoginPage);
		}
	}, []);

	return <></>;
}
