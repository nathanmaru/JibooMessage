import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
// import queryString from 'query-string';
import { useSelector, useDispatch } from "react-redux";
// import {
// 	getFiles,
// 	getUploadedFiles,
// 	deleteFile,
// 	deleteUploadFile,
// } from '../../../../store/classResourceSlice';
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const FilesTable = () => {
	return (
		<>
			<TableContainer component={"div"}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Title </TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">Tags</TableCell>
							<TableCell align="center">Assignee</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ minHeight: "300px" }}>
						{/* {files.map((val, key) => ( */}
						<TableRow
							// key={val.id}
							sx={{
								"&:last-child td, &:last-child th": { border: 0 },
							}}
						>
							{/* <TableCell component="th" scope="row">
								{val.name}
							</TableCell>
							<TableCell align="center">{val.status}sdg</TableCell>
							<TableCell align="center">{val.tags}</TableCell>
							<TableCell align="center">
								{val.assignee_name}sdg
							</TableCell> */}
							<TableCell align="center">
								<OpenInNewIcon
									// onClick={() => handMeID(val)}
									className="cursor-pointer hover:text-purple-400"
								/>{" "}
								<DeleteIcon
									// onClick={() => delete_File(val)}
									className="cursor-pointer hover:text-purple-400"
								/>
							</TableCell>
						</TableRow>
						{/* ))}{' '} */}
						{/* {uploadFiles.map((val, key) => ( */}
						<TableRow
							// key={val.id}
							sx={{
								"&:last-child td, &:last-child th": { border: 0 },
							}}
						>
							{/* <TableCell component='th' scope='row'>
									{val.name}
								</TableCell>
								<TableCell align='center'>{val.status}</TableCell>
								<TableCell align='center'>{val.tags}</TableCell>
								<TableCell align='center'>{val.assignee_name}</TableCell> */}
							<TableCell align="center">
								<OpenInNewIcon
									// onClick={() => handMeID(val)}
									className="cursor-pointer hover:text-purple-400"
								/>{" "}
								<DeleteIcon
									// onClick={() => delete_File(val)}
									className="cursor-pointer hover:text-purple-400"
								/>
							</TableCell>
						</TableRow>
						{/* ))}{' '} */}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default FilesTable;
