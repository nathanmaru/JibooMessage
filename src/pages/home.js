import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import ArticleCards from '../materialUI/components/articlecards';

import { useSelector, useDispatch } from 'react-redux';
import { getArticles } from '../store/articleSlice';
import { addArticle } from '../store/librarySlice';
import { Button } from '@mui/material';

const Home = () => {
	// hooks
	const dispatch = useDispatch();

	// states
	const [articles, setArticles] = useState([]);

	// get states
	const fetchedArticles = useSelector((state) => state.article.articles);

	// fetch states
	useEffect(() => {
		dispatch(getArticles());
	}, []);

	// set states

	useEffect(() => {
		if (fetchedArticles) {
			setArticles(fetchedArticles);
		}
	}, [fetchedArticles]);

	const addToLibrary = (id) => {
		dispatch(addArticle(id));
	};

	return (
		<>
			<div className=''>
				<p className='text-2xl text-gray-800 font-semibold '>Recommended</p>
			</div>

			<Divider sx={{ mt: 3, mb: 1 }} />

			{articles.map((item) => (
				<ArticleCards
					article={item}
					retrieveID={item.id}
					button={<Button onClick={() => addToLibrary(item.id)}>Add To Library</Button>}
				/>
			))}
		</>
	);
};

export default Home;
