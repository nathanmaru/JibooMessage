import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import useFetch from '../../../../../../../../../hooks/useFetch';
import queryString from 'query-string';
import { useEffect } from 'react';
import FolderList from '../../../../../../../../../materialUI/pages/workspaceModule/tabs/files/folderList';
import FileTable from '../../../../../../../../../materialUI/pages/workspaceModule/tabs/files/fileTable';
import { deletefile, getfiles } from '../../../../../../../../../store/newFileSlice';
import { getFolders } from '../../../../../../../../../store/newFolderSlice';

const ResearcherWorkspaceFiles = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const folderState = useFetch;
	const fileState = useFetch;
	const location = useLocation();
	const { folder } = queryString.parse(location.search);

	// folder
	useEffect(() => {
		dispatch(getFolders(`workspace/folder/${id}`));
		// dispatch(getfiles(`workspace/file/${folder}`));
		// dispatch(getfiles(`workspace/upload-file/${folder}`));
	}, []);
	const fetchedFolders = useSelector((state) => state.folder.folders);
	const { items: folders, setItems: setFolders } = folderState(fetchedFolders);

	// Files
	useEffect(() => {
		if (folder) {
			dispatch(getfiles(`workspace/file/${folder}`));
		}
	}, [folder]);
	const fetchedFiles = useSelector((state) => state.file.files);
	const { items: files, setItems: setFiles } = fileState(fetchedFiles);

	// Upload Files
	useEffect(() => {
		if (folder) {
			dispatch(getfiles(`workspace/upload-file/${folder}`));
		}
	}, [folder]);
	const fetchedUploadFiles = useSelector((state) => state.file.uploadFiles);
	const { items: uploadFiles, setItems: setUploadFiles } = fileState(fetchedUploadFiles);

	const handMeID = (item) => {
		if (item.hasOwnProperty('content')) {
			history.push(`/classroom/researcher/workspace/file/${item.id}`);
			console.log(item);
		}
	};
	const handleDelete = (item) => {
		if (item.hasOwnProperty('content')) {
			dispatch(deletefile(`workspace/file/change/${item.id}`));
		}
	};

	return (
		<div className='grid grid-rows-7 grid-flow-row gap-2  min-w-full'>
			<div className='row-span-4 grid grid-cols-6 gap-4'>
				<div>
					<FolderList
						folders={folders}
						link={`/classroom/researcher/workspace/${id}`}
						additionalLink={`&tab=files`}
					/>
				</div>
				<div className=' col-span-5 border-2 rounded-md'>
					<FileTable
						files={files}
						uploadFiles={uploadFiles}
						handMeID={handMeID}
						delete_File={handleDelete}
					/>
				</div>
			</div>
			<div className='row-span-2'></div>
		</div>
	);
};

export default ResearcherWorkspaceFiles;
