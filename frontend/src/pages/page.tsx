// Theme
import { ThemeProvider } from "../components/theme-control/theme-provider";

// Page components
import ContentPage from "./course-unit-view/page";
import TopMenubar from "./top-menubar/top-menubar";

// Context Providers
import { CourseUnitDataProvider } from "./top-menubar/context/course-unit-provider";
import Auth from "@/authentication/authenticator";

export default function Homepage() {
	// console.log(useUser().user);
	return (
		<>
			<Auth />
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<CourseUnitDataProvider>
					<TopMenubar />
					<ContentPage />
				</CourseUnitDataProvider>
			</ThemeProvider>
		</>
	);
}
