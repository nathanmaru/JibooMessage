
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import DialogComponent from '../../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import { TextField } from '@mui/material';
import { useParams, useLocation, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import queryString from "query-string";
import {
	addFolder,
	deleteFolder,
	editFolder,
	retrieveFolder,
} from "../../../../../../../../../../store/newFolderSlice";
import useFetch from "../../../../../../../../../../hooks/useFetch";
import DialogComponent from "../../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";

//mui
import { styled, alpha } from "@mui/material/styles";
import { TextField, Button, Menu, MenuItem, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const FolderMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const history = useHistory();
	const location = useLocation();
	const { folder } = queryString.parse(location.search);
	const folderState = useFetch;

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	useEffect(() => {
		if (folder) {
			dispatch(retrieveFolder(`/workspace/folder/change/${folder}`));
		}
	}, [folder]);
	const currentFolderData = useSelector((state) => state.folder.currentFolder);
	const [inputForm, setInputForm] = useState({
		name: "",
	});

	const onChange = (e) => setInputForm({ [e.target.name]: e.target.value });

	useEffect(() => {
		if (currentFolderData) {
			setInputForm({ name: currentFolderData.name });
		}
	}, [currentFolderData]);

	const dispatch = useDispatch();
	const { id } = useParams();
	const handleCreateFolder = () => {
		dispatch(addFolder(`/workspace/folder/${id}`, inputForm.name));
	};
	const handleEditFolder = () => {
		dispatch(editFolder(`/workspace/folder/change/${folder}`, inputForm.name));
	};
	const handleDeleteFolder = () => {
		dispatch(deleteFolder(`/workspace/folder/change/${folder}`));
		history.replace(`/classroom/researcher/workspace/${id}?tab=files`);
	};

	//validation
	const validationMsg = Yup.object().shape({
		name: Yup.string().required("Folder name is required."),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmit = (data) => {
		console.log(JSON.stringify(data, null, 2));

		dispatch(addFolder(`/workspace/folder/${id}`, data.name));
	};

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls="basic-menu"
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				variant="outlined"
				endIcon={<KeyboardArrowDownIcon />}
			>
				Folder
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem>
					<DialogComponent
						title="Add Folder"
						button={"Add Folder"}
						action={{ label: "Create", handler: handleCreateFolder }}
					>

						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col space-y-3"
						>
							<TextField
								// value={inputForm.name}
								// onChange={(e) => onChange(e)}
								sx={{ mt: 1 }}
								name="name"
								label="Folder Name"
								type="text"
								fullWidth
								variant="outlined"
								{...register("name")}
								error={errors.name ? true : false}
							/>
							<Typography
								sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
							>
								{errors.name?.message}
							</Typography>

							<div>
								<Button type="submit" variant="contained">
									Create
								</Button>
							</div>
						</form>

					</DialogComponent>
				</MenuItem>
				<MenuItem>
					<DialogComponent
						title="Edit Folder"
						button={"Edit Folder"}
						action={{ label: "Save Edit", handler: handleEditFolder }}
					>

						<div className='flex mt-4'>
							<TextField
								required
								value={inputForm.name}
								onChange={(e) => onChange(e)}
								name='name'
								label='Folder Name'
								type='text'
								fullWidth
								variant='outlined'
							/>
						</div>

					</DialogComponent>
				</MenuItem>
				<MenuItem>
					<DialogComponent
						title="Delete Folder"
						button={"Delete Folder"}
						action={{ label: "Proceed Delete", handler: handleDeleteFolder }}
					>
						<h4>
							Are you sure you want to delete this folder and its contents?
						</h4>
					</DialogComponent>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default FolderMenu;
