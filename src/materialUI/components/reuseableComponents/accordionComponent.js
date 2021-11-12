import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
const AccordionComponent = (props) => {
	const { label } = props;
	return (
		<>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography
						sx={{
							fontWeight: 600,
							letterSpacing: '1px',
						}}
					>
						{label}
					</Typography>
				</AccordionSummary>
				<Divider />
				<AccordionDetails>{props.children}</AccordionDetails>
			</Accordion>
		</>
	);
};

export default AccordionComponent;
