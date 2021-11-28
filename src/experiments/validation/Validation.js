import React from "react";

//mui
import { Paper, Box, Grid, TextField, Typography, Button } from "@mui/material";

export default function Validation() {
	return (
		<>
			<div className="bg-red-50 p-10">
				<Paper>
					<Box px={3} py={2}>
						<Typography variant="h6" align="center" margin="dense">
							React with MUI Form Validation
						</Typography>
					</Box>
				</Paper>
			</div>
		</>
	);
}
