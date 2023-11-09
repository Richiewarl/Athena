import { useState, useEffect } from "react";

// Stylesheets
import "./App.css";
import "./course-unit-view/page.css";

// Shadcn (atomic) components

// Theme
import { ThemeProvider } from "./components/theme-control/theme-provider";

// Lucide icons

// Page components
import ContentPage from "./course-unit-view/page";
import TopMenubar from "./top-menubar/top-menubar";

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			// console.log(import.meta.env.VITE_API_URL);

			try {
				const resp = await fetch(`${import.meta.env.VITE_API_URL}posts`);
				if (!resp.ok) {
					throw new Error("Network response was not ok.");
				}
				const result = await resp.json();
				setData(result);
				console.log(result);
			} catch (error) {
				console.log("Error fetching data:", error);
			}
		}

		fetchData();
	}, []);

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
