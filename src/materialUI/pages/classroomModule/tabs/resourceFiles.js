import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

const ResourceFiles = ({ id, filteredRows }) => {
	// const filteredRows = data.filter((datos) => datos.folder_id === id);
	const [rows, setRows] = useState([]);
	useEffect(() => {
		if (filteredRows.length > 0) {
			setRows(filteredRows);
			console.log(rows);
		}
	}, [filteredRows]);

	return (
		<>
			{filteredRows.length > 0 ? (
				<TableContainer component={'div'}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Title </TableCell>
								<TableCell align='center'>Status</TableCell>
								<TableCell align='center'>Tags</TableCell>
								<TableCell align='center'>Assignee</TableCell>
								<TableCell align='center'>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
									<TableCell align='center'>{row.status}</TableCell>
									<TableCell align='center'>{row.tags}</TableCell>
									<TableCell align='center'>{row.assignee_name}</TableCell>
									<TableCell align='center'>Hello</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<div className='flex justify-center items-center h-full'>
					Select Folder or create File
				</div>
			)}
		</>
	);
};

export default ResourceFiles;
