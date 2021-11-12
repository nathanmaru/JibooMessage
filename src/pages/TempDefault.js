import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

const TempDefault = () => {
	return (
		<>
			<div className="mt-5">
				<div class="grid grid-cols-3 gap-4">
					<div
						class="flex col-span-2 p-2 rounded-lg bg-yellow-400"
						style={{ minHeight: "600px", maxHeight: "600px" }}
					></div>

					<div
						class="flex flex-col p-2 rounded-lg overflow-y-auto"
						style={{ minHeight: "600px", maxHeight: "600px" }}
					>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography
									sx={{
										fontWeight: 600,
										letterSpacing: "1px",
									}}
								>
									Comments
								</Typography>
							</AccordionSummary>
							<Divider />
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>

						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel2a-content"
								id="panel2a-header"
							>
								<Typography
									sx={{
										fontWeight: 600,
										letterSpacing: "1px",
									}}
								>
									Notes
								</Typography>
							</AccordionSummary>
							<Divider />
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>

						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel2a-content"
								id="panel2a-header"
							>
								<Typography
									sx={{
										fontWeight: 600,
										letterSpacing: "1px",
									}}
								>
									General
								</Typography>
							</AccordionSummary>
							<Divider />
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
									eget.
								</Typography>
							</AccordionDetails>
						</Accordion>

						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel2a-content"
								id="panel2a-header"
							>
								<Typography
									sx={{
										fontWeight: 600,
										letterSpacing: "1px",
									}}
								>
									Resources
								</Typography>
							</AccordionSummary>
							<Divider />
							<AccordionDetails>
								{/* Inner Accordion */}
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography
											sx={{
												fontWeight: 600,
												letterSpacing: "1px",
											}}
										>
											Video
										</Typography>
									</AccordionSummary>
									<Divider />
									<AccordionDetails>
										<Typography>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Suspendisse malesuada lacus ex, sit amet blandit leo
											lobortis eget.
										</Typography>
									</AccordionDetails>
								</Accordion>

								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography
											sx={{
												fontWeight: 600,
												letterSpacing: "1px",
											}}
										>
											Pro Tip
										</Typography>
									</AccordionSummary>
									<Divider />
									<AccordionDetails>
										<Typography>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Suspendisse malesuada lacus ex, sit amet blandit leo
											lobortis eget.
										</Typography>
									</AccordionDetails>
								</Accordion>
							</AccordionDetails>
						</Accordion>
					</div>
				</div>
			</div>
		</>
	);
};

export default TempDefault;
