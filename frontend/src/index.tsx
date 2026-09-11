import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("The application root element is missing.");
}

createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);