import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFolders, loadFiles } from '../store/classroomSlice.js';
import { HiOutlineFolderOpen } from 'react-icons/hi';
import { Link } from 'react-router-dom';
// naka limot ko thania asa ang export sa folders

const ResourceFilesSidebar = () => {
	const [folders, setFolders] = useState(null);
	const dispatch = useDispatch();
	const { resourceFolder, loadingFolders } = useSelector((state) => state.class);
	useEffect(() => {
		if (resourceFolder.length > 0) {
			localStorage.setItem('currentFolder', resourceFolder[0].id);
		}
		dispatch(loadFiles());
	}, [resourceFolder]);

	useEffect(() => {
		dispatch(loadFolders());
	}, []);
	useEffect(() => {
		if (!loadingFolders) {
			setFolders(resourceFolder);
			dispatch(loadFiles());
		}
	}, [loadingFolders]);
	const handleClick = (id) => {
		console.log(id);
		localStorage.setItem('currentFolder', id);
		dispatch(loadFiles());
	};

	return (
		<>
			<div class='flex flex-col justify-between'>
				{/* Files  */}
				<ul>
					{folders
						? folders.map((fold) => (
								<li onClick={() => handleClick(fold.id)} key={fold.id}>
									<div class='justify-start hover:bg-purple-100 hover:text-purple-600 rounded-md'>
										<div class='flex flex-row justify-between p-2  rounded-md cursor-pointer'>
											<HiOutlineFolderOpen class='justify-start text-2xl' />
											<p class='justify-between w-3/4'>{fold.name}</p>
										</div>
									</div>
								</li>
						  ))
						: 'loading folders'}
				</ul>
			</div>
		</>
	);
};

export default ResourceFilesSidebar;
