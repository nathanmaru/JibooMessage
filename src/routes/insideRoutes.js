import { Route } from "react-router";
import StepperExp from "../experiments/stepperExp";
import AboutArticles from "../materialUI/pages/AboutArticles";
import ClassroomManager from "../materialUI/pages/classroomModule/pageManagers/classroomManager";
import ClassroomManagerResearcher from "../materialUI/pages/classroomModule/pageManagers/classroomManagerResearcher";
import ClassroomResourceManager from "../materialUI/pages/classroomModule/pageManagers/resourceManager";
import ManageProfile from "../materialUI/pages/ManageInstitution/ManageProfile";
import NewMesssages from "../materialUI/pages/messages/NewMesssages";
import NewLibrary from "../materialUI/pages/NewLibrary";
import Notes from "../materialUI/pages/notes/Notes";
import ProjectManager from "../materialUI/pages/workspaceModule/pageManagers/projectManager";
import WorkspaceFileEditor from "../materialUI/pages/workspaceModule/workspaceFileEditor";
import Classroom from "../classroomModule/classroom";
import FileViewer from "../pages/fileViewer";
import Home from "../pages/home";
import OldInstitution from "../pages/institution";
import Logout from "../pages/logout";
import Profile from "../pages/profile";
import TempFile from "../pages/TempFile";
import WorkSpace from "../pages/workspace";
import JoinProfile from "../materialUI/pages/JoinedInstitution/JoinProfile";
import Institution from "../materialUI/pages/institutionModule/newInstitution";
import MyInstitutionManager from "../materialUI/pages/institutionModule/pageManager/myInstitutionManager";
import AdviserClassroomManager from "../classroomModule/classroomUser/classroomAdviser/classroomManager/adviserClassroomManager";

import Intro from "../experiments/shepherd/Intro";

export default [
	<Route
		exact
		path="/classroom/adviser/resources/:id"
		component={ClassroomResourceManager}
	/>,
	<Route path="/about-article/:id" component={AboutArticles} />,
	<Route path="/intro" component={Intro} />,
	<Route exact path="/temp" component={TempFile} />,
	<Route exact path="/experiments" component={StepperExp} />,
	<Route exact path="/works/fileEditor/:id" component={WorkspaceFileEditor} />,
	<Route exact path="/works/:id" component={ProjectManager} />,
	<Route exact path="/fileViewer" component={FileViewer} />,
	<Route exact path="/works" component={WorkSpace} />,
	<Route exact path="/messages" component={NewMesssages} />,
	// <Route exact path='/classroom/researcher/:id' component={ClassroomManagerResearcher} />,
	<Route
		exact
		path="/classroom/adviser/:id"
		component={AdviserClassroomManager}
	/>,
	<Route exact path="/classroom" component={Classroom} />,
	<Route path="/library" component={NewLibrary} />,
	<Route exact path="/notes" component={Notes} />,
	<Route path="/profile" component={Profile} />,
	<Route path="/home" component={Home} />,
	<Route path="/joined/:id" component={JoinProfile} />,
	<Route path="/myinstitution/:id" component={MyInstitutionManager} />,
	<Route path="/institutions" component={Institution} />,
	<Route path="/old-institutions" component={OldInstitution} />,
	<Route path="/logout" component={Logout} />,
];
