import * as React from 'react';

//Search Imports
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

//Select Imports
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Divider from '@mui/material/Divider';
import { ReactReduxContext } from 'react-redux';

import { useSelector, useDispatch } from 'react-redux';
import { getArticles, removeArticle } from '../../store/librarySlice';
import ArticleCards from '../components/articlecards';
import Button from '@mui/material/Button';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: '.5rem',
	// backgroundColor: "#d6d6d6",
	backgroundColor: 'rgba(229, 231, 235, 1)',
	borderStyle: 'solid',
	borderColor: '#6d0cad',
	// borderColor: "#838CFF",
	border: '2px',
	'&:hover': {
		backgroundColor: 'rgba(229, 231, 235, 1)',
	},
	// marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',

	[theme.breakpoints.up('sm')]: {
		// marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '40ch',
		},
	},
}));

const NewLibrary = ({ item }) => {
	const dispatch = useDispatch();
	const [age, setAge] = React.useState('');
	const [articles, setArticles] = React.useState([]);

	React.useEffect(() => {
		dispatch(getArticles());
	}, []);

	const fetchLibrary = useSelector((state) => state.library.articles);

	React.useEffect(() => {
		if (fetchLibrary) {
			setArticles(fetchLibrary);
		}
	}, [fetchLibrary]);

	const handleChange = (event) => {
		setAge(event.target.value);
	};
	const deleteItem = (id) => {
		dispatch(removeArticle(id));
		dispatch(getArticles());
	};

	return (
		<>
			<div className='w-full p-1 mb-4 items-center lg:flex lg:flex-row lg:justify-between lg:space-y-0 space-y-6'>
				<div className=''>
					<Search variant='outlined'>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
					</Search>
				</div>
				<div className='lg:flex lg:flex-row lg:justify-between items-center'>
					<p className='text-gray-400 text-sm mr-2 lg:text-base'>Sort By :</p>

					<div className=''>
						<Box sx={{ minWidth: 120, maxHeight: '30px' }}>
							<FormControl fullWidth>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={age}
									onChange={handleChange}
									sx={{ maxHeight: '30px' }}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>
				</div>
			</div>
			<Divider sx={{ mt: 3, mb: 1 }} />
			{/* Cards are here */}
			<div
				className='max-w-full p-2 space-y-5'
				style={{
					minHeight: '595px',
					maxHeight: '595px',
				}}
			>
				{articles.map((item) => (
					<ArticleCards
						article={item}
						retrieveID={item.itemID}
						button={<Button onClick={() => deleteItem(item.id)}>Remove</Button>}
					/>
				))}
			</div>
		</>
	);
};

export default NewLibrary;
