import { Button, TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const CreateArticle = () => {
	const [article, setArticle] = useState({
		title: '',
		abstract: '',
		privacy: 'private',
		department: '',
		categories: [],
		file: '',
	});
	const [categories, setCategories] = useState([
		{ id: 1, name: 'Sciences' },
		{ id: 2, name: 'Philosophy' },
	]);
	const [departments, setDepartments] = useState([
		{ id: 1, name: 'Cebu Technological University' },
	]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
	};
	const onChange = (e) => {
		if (e.target.name == 'category') {
			console.log(e.target.value);
			let copyCategory = article.categories;
			copyCategory.push(e.target.value);
			setArticle({ ...article, categories: copyCategory });
		} else {
			setArticle({ ...article, [e.target.name]: e.target.value });
		}
	};
	const handleClick = () => {
		let ids = [];
		selectedCategories.map((val) => {
			// console.log(categories);
			categories.map((i) => {
				if (val == i.name) {
					ids.push(i.id);
				}
			});
		});
		console.log(ids);
	};

	return (
		<>
			<div className='flex flex-col space-y-4 mt-4'>
				<TextField
					label='Article Title'
					variant='outlined'
					name='title'
					value={article.title}
					onChange={(e) => onChange(e)}
				/>
				<TextField
					label='Abstract'
					variant='outlined'
					name='abstract'
					value={article.abstract}
					onChange={(e) => onChange(e)}
					multiline
					minRows={4}
				/>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Select Department</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={article.department}
						label='Select Department'
						name='department'
						onChange={(e) => onChange(e)}
					>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						{departments.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id='demo-multiple-checkbox-label'>Category</InputLabel>
					<Select
						labelId='demo-multiple-checkbox-label'
						id='demo-multiple-checkbox'
						multiple
						value={selectedCategories}
						onChange={handleChange}
						name='category'
						input={<OutlinedInput label='Category' />}
						renderValue={(selected) => selected.join(', ')}
						MenuProps={MenuProps}
					>
						{categories.map((category) => (
							<MenuItem key={category.id} value={category.name}>
								{/* {category.name} */}
								<Checkbox checked={selectedCategories.includes(category.name)} />
								<ListItemText primary={category.name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Privacy</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={article.privacy}
						label='Privacy'
						name='privacy'
						onChange={(e) => onChange(e)}
					>
						<MenuItem value='private'>Private</MenuItem>
						<MenuItem value='public'>Public</MenuItem>
					</Select>
				</FormControl>

				<FormControlLabel
					control={<Checkbox defaultChecked />}
					label='Make this Article Featured'
				/>
				<DialogComponent title='Hello' button={<Button>Submit</Button>}></DialogComponent>
			</div>
		</>
	);
};

export default CreateArticle;
