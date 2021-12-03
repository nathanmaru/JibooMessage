import { Route } from "react-router";

import NewMesssages from "../materialUI/pages/messages/NewMesssages";
import Home from "../pages/home";
import Logout from "../pages/logout";
import Profile from "../pages/profile";

export default [
	<Route exact path="/messages" component={NewMesssages} />,
	<Route path="/profile" component={Profile} />,
	<Route path="/home" component={Home} />,
	<Route path="/logout" component={Logout} />,
];
