import { useEffect, useState } from 'react';

//Material UI
import IconButton from '@mui/material/IconButton';

//Icons
import { CgFileDocument, CgFileRemove } from 'react-icons/cg';
import { TiDocumentAdd } from 'react-icons/ti';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { retrieveArticle } from '../../store/articleSlice';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button';

const AboutArticles = ({ match, location }) => {
	const { id } = match.params;
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(retrieveArticle(id));
	}, []);

	const fetchArticle = useSelector((state) => state.article.currentArticle);
	const [article, setArticle] = useState({
		id: '',
		title: '',
		abstract: '',
		publishedDate: '',
		author: '',
		file: '',
	});

	useEffect(() => {
		if (fetchArticle) {
			setArticle(fetchArticle);
		}
	}, [fetchArticle]);

	const viewPdf = () => {
		history.push('/fileViewer?filePath=' + article.file);
	};
	const addArticle = () => {
		console.log(article.id);
	};

	return (
		<>
			<div className='w-full'>
				<div className='border-l-2 border-b-2 border-gray-200 p-4'>
					<p className='text-3xl text-gray-800 font-bold tracking-wider'>{article.title}</p>
				</div>
				<div
					className='flex flex-row justify-between border-l-2 border-gray-200'
					style={{
						maxHeight: '670px',
						minHeight: '670px',
					}}
				>
					{/* Left Side */}
					<div
						className='justify-start w-full border-r-2 border-gray-200 p-3'
						style={{
							maxHeight: '670px',
							minHeight: '670px',
						}}
					>
						<div className='mb-3 flex flex-row justify-between'>
							<p className='text-xl text-gray-600 font-medium'>{article.author}</p>
						</div>
						<div className='flex flex-col justify-between mt-5'>
							<p className='justify-start text-xl text-gray-600'>Abstract</p>
							<div
								className='justify-between p-2 overflow-y-auto text-sm text-justify'
								style={{
									maxHeight: '530px',
									minHeight: '530px',
								}}
							>
								{article.abstract}
							</div>
						</div>
					</div>

					{/* Right Side */}
					<div
						className='justify-between w-full'
						style={{
							maxHeight: '670px',
							minHeight: '670px',
						}}
					>
						<div className='p-3 w-full h-1/6 border-b-2 border-gray-200'>
							<div className='w-full flex space-x-4'>
								<Button onClick={viewPdf} variant='outlined' endIcon={<PictureAsPdfIcon />}>
									View PDF
								</Button>
								<Button onClick={addArticle} variant='outlined' endIcon={<TiDocumentAdd />}>
									Add to Library
								</Button>
							</div>
						</div>

						<div className='w-full h-1/6 p-4 border-b-2 border-gray-200'>
							<p className='text-xl text-gray-400 mb-1'>Published</p>
							<p className='text-sm text-gray-400'> {article.publishedDate}</p>
						</div>

						<div className='w-full h-4/6 p-4 space-y-10'>
							{/* <div className="w-full h-80 p-4 space-y-10 border-b-2 border-gray-200"> */}
							<div className=''>
								<p className='text-xl text-gray-400 mb-1'>Issue</p>
								<p className='text-sm text-purple-400 underline cursor-pointer'>
									Ambot unsa ni naa diri lol
								</p>
							</div>

							<div className=''>
								<p className='text-xl text-gray-400 mb-1'>Section</p>
								<p className='text-sm text-gray-400'>Article</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutArticles;
