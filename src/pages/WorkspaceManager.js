import React from "react";
import Tabs from "../components/Tabs";
import { Route } from "react-router-dom";
import WorkspaceFiles from "./WorkspaceFiles";
import WorkspaceMembers from "./WorkspaceMembers";
import WorkspaceDashboard from "./WorkspaceDashboard";

const WorkspaceManager = () => {
	const items = [
		{
			key: 1,
			name: "Dashboard",
			link: "/works/dashboard",
		},
		{
			key: 2,
			name: "Files",
			link: "/works/files",
		},
		{
			key: 3,
			name: "Members",
			link: "/works/members",
		},
	];
	return (
		<>
			<div className="w-full">
				<div></div>
				<Tabs items={items} />

				<Route exact path="/works/dashboard" component={WorkspaceDashboard} />
				<Route exact path="/works/files" component={WorkspaceFiles} />
				<Route exact path="/works/members" component={WorkspaceMembers} />
			</div>
		</>
	);
};

export default WorkspaceManager;
