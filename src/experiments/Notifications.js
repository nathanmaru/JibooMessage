import React from "react";

import {
	Divider,
	Paper,
	MenuList,
	MenuItem,
	ListItemText,
	ListItemIcon,
	Typography,
} from "@mui/material";

import { GoCommentDiscussion } from "react-icons/go";
import { HiOutlineSpeakerphone, HiOutlineClock } from "react-icons/hi";
import { MdOutlineFactCheck, MdOutlineSchool } from "react-icons/md";

const Notifications = () => {
	return (
		<>
			<Paper
				sx={{
					width: 1300,
					maxWidth: "100%",
					border: 1,
					borderColor: "#e3e3e3",
					maxHeight: "600px",
					minHeight: "600px",
					overflowY: "auto",
				}}
			>
				<MenuList>
					<MenuItem>
						<ListItemIcon>
							<GoCommentDiscussion fontSize="large" />
						</ListItemIcon>
						<div className="flex w-full items-center">
							<p className="font-semibold mr-1">Name</p>
							<p className="text-sm text-gray-500">
								commented on chuchuhcuhcuhu
							</p>
							<p className="ml-auto text-xs text-gray-400"> MM-DD-YYYY ●</p>
						</div>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<HiOutlineSpeakerphone fontSize="large" />
						</ListItemIcon>
						<div className="flex w-full items-center">
							<p className="font-semibold mr-1">Name</p>
							<p className="text-sm text-gray-500 mr-1">
								called for a revision on
							</p>
							<p className="text-sm text-gray-500">this part</p>
							<p className="ml-auto text-xs text-gray-400"> MM-DD-YYYY ● </p>
						</div>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<MdOutlineFactCheck fontSize="large" />
						</ListItemIcon>
						<div className="flex w-full items-center">
							<p className="font-semibold mr-1">Name</p>
							<p className="text-sm text-gray-500 mr-1">
								has approved of your admission
							</p>
							<p className="ml-auto text-xs text-gray-400"> MM-DD-YYYY ● </p>
						</div>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<MdOutlineSchool fontSize="large" />
						</ListItemIcon>
						<div className="flex w-full items-center">
							{/* <p className="font-semibold mr-1">Name</p> */}
							<p className="text-sm text-gray-500 mr-1">
								Your page is now verified. You have now successfully created
								your insititutional page
							</p>
							<p className="ml-auto text-xs text-gray-400"> MM-DD-YYYY ● </p>
						</div>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<HiOutlineClock fontSize="large" />
						</ListItemIcon>
						<div className="flex w-full items-center">
							<p className="text-sm text-gray-500 mr-1">
								The deadline for this task is fast approaching. Please be
								mindful.
							</p>
							<p className="ml-auto text-xs text-gray-400"> MM-DD-YYYY ● </p>
						</div>
					</MenuItem>
				</MenuList>
			</Paper>
		</>
	);
};

export default Notifications;
