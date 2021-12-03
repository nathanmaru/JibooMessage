import { Route } from "react-router";

import NewMessages from "../materialUI/pages/messages/NewMesssages";
import Messages from "../messageModule/messages";
import Home from "../pages/home";
import Logout from "../pages/logout";
import Profile from "../pages/profile";

export default [
	<Route exact path="/messages" component={Messages} />,
	<Route exact path="/prev-messages" component={NewMessages} />,
	<Route path="/profile" component={Profile} />,
	<Route path="/home" component={Home} />,
	<Route path="/logout" component={Logout} />,
];
