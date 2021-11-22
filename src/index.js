import React from "react";
import ReactDOM from "react-dom";
import "intro.js/introjs.css";

import App from "./App";

import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore";

import "./index.css";
import Navbar from "./components/navbar";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
