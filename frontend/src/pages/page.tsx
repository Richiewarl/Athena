// Page components
import ContentPage from "./course-unit-view/page";
import TopMenubar from "./top-menubar/top-menubar";

// Context Providers
import { CourseUnitDataProvider } from "./top-menubar/context/course-unit-provider";
import AuthController from "@/authentication/components/auth-controller";
import { useUser } from "@/authentication/context/user-provider";

export default function Homepage() {
	const user = useUser().user;
	console.log(user);

	return (
		<>
			<AuthController />
			<CourseUnitDataProvider>
				<TopMenubar />
				<ContentPage />
			</CourseUnitDataProvider>
		</>
	);
}
