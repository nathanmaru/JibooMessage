import React, { Component, useState } from "react";
import { Steps } from "intro.js-react";
import { styled, alpha } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	Badge,
	MenuItem,
	Menu,
	TextField,
	InputAdornment,
} from "@mui/material";

import {
	MdDeleteOutline,
	MdSegment,
	MdShoppingCart,
	MdToll,
	MdNotificationsNone,
	MdOutlineAccountCircle,
} from "react-icons/md";
import PrimarySearchAppBar from "../../materialUI/components/toolbar";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: "1.5rem",
	backgroundColor: "rgba(229, 231, 235, 1)",
	borderStyle: "solid",
	borderColor: "#838CFF",
	border: "2px",
	"&:hover": {
		backgroundColor: "rgba(229, 231, 235, 1)",
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",

	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",

		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function Intro(props) {
	const [stepsEnabled, setStepsEnabled] = useState("true");
	const [initialStep, setInitialStep] = useState(0);

	const steps = [
		{
			element: ".search",
			intro: "You can search anything related to research here.",
		},
		{
			element: ".notifications",
			intro:
				"You'll find your notifications here, it will vary depending on how another user notifies you.",
		},
		{
			element: ".account",
			intro: "Find out more about what you can do to your account here.",
		},
	];

	const onExit = () => {
		setStepsEnabled(false);
	};

	function toggleSteps() {
		setStepsEnabled((prevState) => ({ stepsEnabled: !prevState.stepsEnabled }));
	}

	//toolbar
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	let history = useHistory();

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const goToProfile = () => {
		history.push("/profile?tab=published-works");
	};
	const goToLogout = () => {
		history.push("/logout");
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			// anchorOrigin={{
			// 	vertical: 'top',
			// 	horizontal: 'right',
			// }}
			id={menuId}
			keepMounted
			// transformOrigin={{
			// 	vertical: 'top',
			// 	horizontal: 'right',
			// }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem
				onClick={() => {
					handleMenuClose();
					goToProfile();
				}}
			>
				My Profile
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleMenuClose();
					goToLogout();
				}}
			>
				Logout
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={0} color="error">
						<MdShoppingCart />
					</Badge>
				</IconButton>
				<p>Search</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={0} color="error">
						<MdNotificationsNone />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<MdOutlineAccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<>
				<Steps
					enabled={stepsEnabled}
					steps={steps}
					initialStep={initialStep}
					onExit={onExit}
				/>

				<Box sx={{ flexGrow: 1 }}>
					<AppBar
						position="sticky"
						sx={{
							backgroundColor: "#FFFF",
							borderBottom: "1px solid",
							borderBottomColor: "#e1e1e1",
							color: "rgba(55, 65, 81, 1)",
						}}
						elevation={0}
					>
						<Toolbar>
							{props.children}
							<Box sx={{ flexGrow: 1 }} />
							{/* <TextField
						id='input-with-icon-textfield'
						placeholder='Search...'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<AccountCircle />
								</InputAdornment>
							),
						}}
						sx={{ borderRadius: 4 }}
						variant='outlined'
					/> */}
							<Search sx={{ display: { xs: "none", md: "flex" } }}>
								<SearchIconWrapper sx={{ display: { xs: "none", md: "flex" } }}>
									<MdShoppingCart class="search" />
								</SearchIconWrapper>
								<StyledInputBase
									placeholder="Search…"
									inputProps={{ "aria-label": "search" }}
								/>
							</Search>
							<Box sx={{ display: { xs: "none", md: "flex" } }}>
								<IconButton
									size="large"
									aria-label="show 17 new notifications"
									color="inherit"
								>
									<Badge badgeContent={0} color="error">
										<MdNotificationsNone class="notifications" />
									</Badge>
								</IconButton>
								<IconButton
									size="large"
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<MdOutlineAccountCircle class="account" />
								</IconButton>
							</Box>
							<Box sx={{ display: { xs: "flex", md: "none" } }}>
								<IconButton
									size="large"
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<MdSegment />
								</IconButton>
							</Box>
						</Toolbar>
					</AppBar>
					{renderMobileMenu}
					{renderMenu}
				</Box>
			</>
		</>
	);
	// }
}
