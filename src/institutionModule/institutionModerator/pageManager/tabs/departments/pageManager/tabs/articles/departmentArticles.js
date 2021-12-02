import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetch from '../../../../../../../../hooks/useFetch';
import { getArticles, getnewArticles } from '../../../../../../../../store/articleSlice';

const DepartmentArticles = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const articlesState = useFetch;
	useEffect(() => {
		dispatch(getnewArticles(`/post/?search=${id}`));
	}, []);
	const fetchedArticles = useSelector((state) => state.article.articles);
	const { items: articles } = articlesState(fetchedArticles);

	// use articles variable to map articles
	return null;
};

export default DepartmentArticles;
