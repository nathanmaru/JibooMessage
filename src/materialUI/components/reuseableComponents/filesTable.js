import React, { useState, useEffect, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const FilesTable = ({ data }) => {
	const [rows, setRows] = useState([]);
	// const tableData = useMemo(() => setRows(data), [data])
	useEffect(() => {
		console.log(data, 'rows changed');
	}, [data]);

	return (
		<TableContainer className='border-2 rounded-xl'>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead className='bg-gray-200'>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell align='center'>Status</TableCell>
						<TableCell align='center'>Tags</TableCell>
						<TableCell align='center'>Assignee</TableCell>
						<TableCell align='center'>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.name}</TableCell>
							<TableCell align='center'>{row.status}</TableCell>
							<TableCell align='center'>{row.tags}</TableCell>
							<TableCell align='center'>{row.assignee_name}</TableCell>
							<TableCell align='center'>
								<IconButton aria-label='open'>
									<LaunchIcon
										onClick={() => {
											console.log(row.id);
										}}
									/>
								</IconButton>
								<IconButton aria-label='open'>
									<DeleteIcon
										onClick={() => {
											const selectedId = row.id;
											const newRows = rows.filter((newRow) => newRow.id !== selectedId);
											console.log(newRows);
											setRows(newRows);
										}}
									/>
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default FilesTable;
