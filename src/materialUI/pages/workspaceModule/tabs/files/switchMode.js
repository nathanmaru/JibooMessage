import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const SwitchMode = ({ checked, handleChange, label }) => {
	return (
		<>
			<FormControlLabel
				control={<Switch checked={checked} onChange={handleChange} />}
				label={label}
			/>
		</>
	);
};

export default SwitchMode;
