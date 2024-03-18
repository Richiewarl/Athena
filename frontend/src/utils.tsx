import { NavigateFunction, Location } from "react-router-dom";

export function getUrlRegEx() {
	return new RegExp(
		"(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?/[a-zA-Z0-9]{2,}"
	);
}

export function removeQueryString(
	useNavigate: NavigateFunction,
	useLocation: Location<any>
) {
	const navigate = useNavigate;
	const location = useLocation;

	// Replace the current URL without query parameters
	location.search = "";
	navigate(location);
}
