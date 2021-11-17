import { Route } from "react-router";
import Dummy from "../experiments/Dummy";
import ArticleCards from "../materialUI/components/articlecards";
import AboutArticles from "../materialUI/pages/AboutArticles";
import Experiment from "../pages/experiment";
import LandingPage from "../pages/landingPage";
import Login from "../pages/login";
import NewPassword from "../pages/newPassword";
import ResetPassword from "../pages/resetPassword";
import Signup from "../pages/signup";

export default [
	<Route path="/login" component={Login} />,
	<Route path="/signup" component={Signup} />,
	<Route exact path="/" component={LandingPage} />,
	<Route exact path="/experiment" component={Experiment} />,
	<Route path="/about-article" component={AboutArticles} />,
	<Route exact path="/email-verify" component={Experiment} />,
	<Route path="/reset-password" component={ResetPassword} />,
	<Route path="/password-reset-confirm" component={NewPassword} />,
	<Route path="/chatExp" component={ArticleCards} />,
	<Route path="/dummy" component={Dummy} />,
];
