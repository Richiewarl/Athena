import { useState, useEffect } from "react";

// Stylesheets
import "./App.css";

// Theme
import { ThemeProvider } from "./components/theme-control/theme-provider";

// Page components
import ContentPage from "./course-unit-view/page";
import TopMenubar from "./top-menubar/top-menubar";

function App() {
	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<TopMenubar />
				<ContentPage />
			</ThemeProvider>
		</>
	);
}

export default App;
