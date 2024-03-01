import { BrowserRouter, Routes, Route } from "react-router-dom";

// Stylesheets
import "./App.css";

// Page components
import Homepage from "./pages/page";
import Auth from "./authentication/authenticator";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/homepage" element={<Homepage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
