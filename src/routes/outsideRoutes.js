import { Route } from "react-router";
import LandingPage from "../pages/landingPage";
import Login from "../pages/login";
import NewPassword from "../pages/newPassword";
import ResetPassword from "../pages/resetPassword";
import Signup from "../pages/signup";

import Tour from "../experiments/intro/Tour";

export default [
	<Route path="/login" component={Login} />,
	<Route path="/signup" component={Signup} />,
	<Route exact path="/" component={LandingPage} />,
	<Route path="/reset-password" component={ResetPassword} />,
	<Route path="/password-reset-confirm" component={NewPassword} />,
];
