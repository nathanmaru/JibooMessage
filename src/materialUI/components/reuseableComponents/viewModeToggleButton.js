import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ViewToggleButton({ view, name, handleChange, buttons }) {
	return (
		<ToggleButtonGroup color='primary' value={view} exclusive onChange={handleChange}>
			{buttons.map((val) => (
				<ToggleButton name={name} value={val.value}>
					{val.label}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
