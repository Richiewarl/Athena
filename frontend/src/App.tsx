import { BrowserRouter, Routes, Route } from "react-router-dom";

// Stylesheets
import "./App.css";

// Page components
import Homepage from "./pages/page";
import AuthenticationPage from "./authentication/page";
import UoMAuth from "./authentication/components/authenticator";

// Context Providers
import { ThemeProvider } from "./components/theme-control/theme-provider";
import SettingsProfilePage from "./pages/profile-settings/page";
import { paths } from "./enums/paths";
import { Toaster } from "./components/ui/toaster";
import { UserDataProvider } from "./authentication/context/user-provider";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<UserDataProvider>
				<BrowserRouter>
					<Routes>
						<Route path={paths.LoginPage} element={<AuthenticationPage />} />
						<Route path={paths.UoMAuth} element={<UoMAuth />} />

						<Route
							path={paths.ProfileSettings}
							element={<SettingsProfilePage />}
						/>
						<Route path={paths.Homepage} element={<Homepage />} />
					</Routes>
				</BrowserRouter>
				<Toaster />
			</UserDataProvider>
		</ThemeProvider>
	);
}

export default App;
