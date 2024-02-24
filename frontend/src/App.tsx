import { useState, useEffect } from "react";

// Stylesheets
import "./App.css";

// Theme
import { ThemeProvider } from "./components/theme-control/theme-provider";

// Page components
import ContentPage from "./course-unit-view/page";
import TopMenubar from "./top-menubar/top-menubar";
import { CourseUnitDataProvider } from "./top-menubar/context/course-unit-provider";

function App() {
	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<CourseUnitDataProvider>
					<TopMenubar />
					<ContentPage />
				</CourseUnitDataProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
