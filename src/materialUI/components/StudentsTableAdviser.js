import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export default function StudentsTableAdviser({ data, actions, isResearcher }) {
	const Actions = () => {
		return (
			<div className='space-x-4'>
				<Button variant='contained'>Accept</Button>
				<Button variant='outlined'>Reject</Button>
			</div>
		);
	};
	return (
		<>
			{data.length > 0 ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell
									variant='outlined'
									sx={{
										fontWeight: 'bold',
										textTransform: 'uppercase',
										color: '#5c5c5c',
									}}
								>
									Student Name
								</TableCell>
								<TableCell
									align='right'
									sx={{
										fontWeight: 'bold',
										textTransform: 'uppercase',
										color: '#5c5c5c',
									}}
								>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((row) => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component='th' scope='row' sx={{ color: '#6e6273' }}>
										{row.student_first_name} {row.student_last_name}
									</TableCell>
									<TableCell align='right' sx={{ color: '#6e6273' }}>
										{isResearcher === true ? (
											'hello'
										) : (
											<IconButton aria-label='delete'>
												<DeleteIcon />
											</IconButton>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				'No item on the list'
			)}
		</>
	);
}
