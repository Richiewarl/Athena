// Page components
import ContentPage from "./course-unit-view/page";
import TopMenubar from "./top-menubar/top-menubar";

// Context Providers
import { CourseUnitDataProvider } from "./top-menubar/context/course-unit-provider";
import AuthController from "@/authentication/components/auth-controller";
import PageFooter from "./bottom-footer/footer";

export default function Homepage() {
	return (
		<>
			<AuthController />
			<CourseUnitDataProvider>
				<TopMenubar />
				<ContentPage />
				<PageFooter />
			</CourseUnitDataProvider>
		</>
	);
}
