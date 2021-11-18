import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../../../hooks/useFetch";
import ProfileCardComponent from "../../../components/reuseableComponents/profileCardComponent";
import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
	editInstitution,
	retrieveInstitution,
} from "../../../../store/newInstitutionSlice";
import queryString from "query-string";
import PageManagerComponent from "../../../components/reuseableComponents/pageManagerComponent";
import DiscoverArticles from "../../ManageInstitution/tabs/DiscoverArticles";
import FeaturedArticles from "../../ManageInstitution/tabs/FeaturedArticles";
import Staff from "../../ManageInstitution/tabs/Staff";
import Resources from "../../ManageInstitution/tabs/Resources";
import DialogComponent from "../../../components/reuseableComponents/dialogComponent";
import { Button, TextField, Chip, Avatar } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

//Chartjs
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

const storagedata = {
	labels: ["Storage Used", "Storage Left"],
	datasets: [
		{
			label: "Storage Data",
			data: [34, 19],
			fill: false,
			backgroundColor: ["#904CB3", "#D2B6E0"],
			borderColor: ["#904CB3", "#D2B6E0"],
			borderWidth: 1,
			hoverOffset: 2,
			cutout: "80%",
			options: {
				animation: {
					animateScale: true,
				},
			},
		},
	],
};

const linedata = {
	labels: [
		"Education",
		"Political Science",
		"Engineering",
		"IT",
		"Biology",
		"Theology",
	],
	datasets: [
		{
			label: "Staff",
			data: [23, 12, 9, 25, 16, 11],
			fill: false,
			backgroundColor: "#2EA3D1",
			borderColor: "#57B5DB",
			yAxisID: "y-axis-staff",
		},

		{
			label: "Students",
			data: [102, 84, 23, 125, 48, 8],
			fill: false,
			backgroundColor: "#1DE2A4",
			borderColor: "#4AE8B7",
			yAxisID: "y-axis-students",
		},
	],
};

const lineoptions = {
	scales: {
		yAxes: [
			{
				type: "linear",
				display: "true",
				position: "left",
				id: "y-axis-staff",
			},
			{
				type: "linear",
				display: "true",
				position: "right",
				id: "y-axis-students",
				gridLines: {
					drawOnArea: false,
				},
			},
		],
	},
};

const MyInstitutionManager = () => {
	const location = useLocation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		dispatch(retrieveInstitution(id));
	}, []);
	const fetchProfile = useSelector(
		(state) => state.institution.currentInstitution
	);
	const { items: profile, setItems: setProfile } = useFetch(fetchProfile);

	const handleSubmit = (form_data) => {
		dispatch(editInstitution(id, form_data));
		// dispatch(editProfileImage(user.id, form_data));
	};
	const tabs = [
		{
			label: "Dashboard",
			link: `/myinstitution/${id}?tab=dashboard`,
			value: "dashboard",
			component: (
				<>
					<div className="p-2 flex flex-row">
						<div className="w-3/5">
							<p className="bg-purple-200 text-purple-500 text-xs w-28 px-2 py-1 flex items-center justify-center rounded-md">
								Institution
							</p>

							<p className="mt-3 text-2xl">Institution Name</p>

							<div className="mt-1 flex flex-row items-center">
								<Avatar
									alt="Remy Sharp"
									src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
									sx={{ width: 20, height: 20 }}
								/>

								<p className="text-sm text-gray-600 ml-2">Raymond Mangumpit</p>
							</div>

							<p className="mt-4 mb-1 text-base">description</p>
						</div>

						<div className="w-2/5 py-6">
							<div className="flex flex-row items-center px-4 float-right mb-2 mt-2">
								<p className="text-sm text-gray-400 mr-3">Update</p>
								<p className="text-sm text-gray-400 mr-3">
									━━━━━━━━━━━━━━━━━━━━━
								</p>
								<Chip
									label="3 new"
									variant="outlined"
									sx={{ mr: 1, height: "20px", color: "#97a0a8" }}
								/>
								<p className="text-sm text-gray-400">3</p>
							</div>

							<div className="flex flex-row items-center px-4 float-right mb-2">
								<p className="text-sm text-gray-400 mr-3">Recommendations</p>
								<p className="text-sm text-gray-400 mr-3">
									━━━━━━━━━━━━━━━━━━━━━
								</p>
								<Chip
									label="3 new"
									variant="outlined"
									sx={{ mr: 1, height: "20px", color: "#97a0a8" }}
								/>
								<p className="text-sm text-gray-400">3</p>
							</div>

							<div className="flex flex-row items-center px-4 float-right mb-2">
								<p className="text-sm text-gray-400 mr-3">Published</p>
								<p className="text-sm text-gray-400 mr-3">
									━━━━━━━━━━━━━━━━━━━━━
								</p>
								<Chip
									label="3 new"
									variant="outlined"
									sx={{ mr: 1, height: "20px", color: "#97a0a8" }}
								/>
								<p className="text-sm text-gray-400">3</p>
							</div>

							<div className="flex flex-row items-center px-4 float-right mb-2">
								<p className="text-sm text-gray-400 mr-3">Reads</p>
								<p className="text-sm text-gray-400 mr-3">
									━━━━━━━━━━━━━━━━━━━━━
								</p>
								<Chip
									label="3 new"
									variant="outlined"
									sx={{ mr: 1, height: "20px", color: "#97a0a8" }}
								/>
								<p className="text-sm text-gray-400">3</p>
							</div>
						</div>
					</div>

					<div className="w-full flex flex-row space-x-4 p-1">
						<div
							className="p-4 shadow-lg border border-gray-100"
							style={{ width: "400px", height: "450px" }}
						>
							<p className="text-lg text-center text-gray-400 mb-1">
								Storage Data
							</p>

							<Doughnut data={storagedata} />
						</div>
						<div
							className="p-4 shadow-lg border border-gray-100"
							style={{ width: "820px", height: "450px" }}
						>
							<p className="text-lg text-center text-gray-400 mb-1">
								Staff & Students
							</p>
							<Line data={linedata} options={lineoptions} />
						</div>
					</div>
				</>
			),
		},
		{
			label: "Articles",
			link: `/myinstitution/${id}?tab=articles`,
			value: "articles",
			component: <FeaturedArticles />,
		},
		{
			label: "Staff",
			link: `/myinstitution/${id}?tab=staff`,
			value: "staff",
			component: <Staff />,
		},
		{
			label: "Resources",
			link: `/myinstitution/${id}?tab=resourcess`,
			value: "resources",
			component: <Resources />,
		},
		{
			label: "Publishing",
			link: `/myinstitution/${id}?tab=publishing`,
			value: "publishing",
			component: <div>File not found</div>,
		},
		{
			label: "Settings",
			link: `/myinstitution/${id}?tab=settings`,
			value: "settings",
			component: <div>Settings Here</div>,
		},
	];
	const handleEdit = () => {
		const { name, description } = profile;
		let form_data = new FormData();
		form_data.append("name", name);
		form_data.append("description", description);
		dispatch(editInstitution(id, form_data));
	};
	const onChange = (e) => {
		e.preventDefault();
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className="flex flex-col space-y-4">
				<ProfileCardComponent
					item={profile}
					setItem={setProfile}
					dispatchAction={handleSubmit}
					editButton={
						<DialogComponent
							maxWidth="sm"
							button={
								<Button variant="outlined" startIcon={<ModeEditIcon />}>
									Edit
								</Button>
							}
							title="Edit Institution Profile"
							action={{ label: "Edit", handler: handleEdit }}
						>
							<div className="flex flex-col w-full mt-4 space-y-4">
								<TextField
									id="outlined-basic"
									label="Name"
									name="name"
									value={profile.name}
									onChange={(e) => onChange(e)}
									variant="outlined"
								/>
								<TextField
									id="outlined-basic"
									label="Description"
									name="description"
									multiline
									minRows={5}
									value={profile.description}
									onChange={(e) => onChange(e)}
									variant="outlined"
								/>
							</div>
						</DialogComponent>
					}
				/>
				<PageManagerComponent
					value={value}
					handleChange={handleChange}
					tabs={tabs}
				/>
			</div>
		</>
	);
};

export default MyInstitutionManager;
