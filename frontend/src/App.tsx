import { BrowserRouter, Routes, Route } from "react-router-dom";

// Stylesheets
import "./App.css";

// Page components
import Homepage from "./pages/page";
import AuthenticationPage from "./authentication/page";
import UoMAuth from "./authentication/components/authenticator";

// Context Providers
import { ThemeProvider } from "./components/theme-control/theme-provider";

import { homepage, logInPage, uomAuth } from "./authentication/data/paths";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<BrowserRouter>
				<Routes>
					<Route path={logInPage} element={<AuthenticationPage />} />
					<Route path={uomAuth} element={<UoMAuth />} />
					<Route path={homepage} element={<Homepage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
