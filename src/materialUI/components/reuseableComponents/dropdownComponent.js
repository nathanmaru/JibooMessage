import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropDownComponent = ({ label, value, name, options, handleChange }) => {
	return (
		<>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>{label}</InputLabel>
				<Select
					name={name}
					value={value}
					label={label}
					onChange={handleChange}
					sx={{ height: '45px' }}
				>
					{options.map((val) => (
						<MenuItem value={val.value}>{val.label}</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
};

export default DropDownComponent;
