import FolderList from '../../../../../../../../materialUI/pages/workspaceModule/tabs/files/folderList';
import FileTable from '../../../../../../../../materialUI/pages/workspaceModule/tabs/files/fileTable';
import { useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router';
import queryString from 'query-string';
import useFetch from '../../../../../../../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { getFolders } from '../../../../../../../../store/newFolderSlice';
import { deletefile, getfiles } from '../../../../../../../../store/newFileSlice';

const AdviserResourceContent = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const folderState = useFetch;
	const fileState = useFetch;
	const location = useLocation();
	const { folder } = queryString.parse(location.search);

	// folder
	useEffect(() => {
		dispatch(getFolders(`resource/classroom/folder/${id}`));
	}, []);
	const fetchedFolders = useSelector((state) => state.folder.folders);
	const { items: folders, setItems: setFolders } = folderState(fetchedFolders);

	// Files
	useEffect(() => {
		if (folder) {
			dispatch(getfiles(`resource/classroom/file/${folder}`));
		}
	}, [folder]);
	const fetchedFiles = useSelector((state) => state.file.files);
	const { items: files, setItems: setFiles } = fileState(fetchedFiles);

	// Upload Files
	useEffect(() => {
		if (folder) {
			dispatch(getfiles(`resource/classroom/uploadfile/${folder}`));
		}
	}, [folder]);
	const fetchedUploadFiles = useSelector((state) => state.file.uploadFiles);
	const { items: uploadFiles, setItems: setUploadFiles } = fileState(fetchedUploadFiles);

	const handMeID = (item) => {
		if (item.hasOwnProperty('content')) {
			history.push(`/classroom/adviser/resources/file/${item.id}`);
			console.log(item);
		}
	};
	const delete_File = (item) => {
		if (item.hasOwnProperty('content')) {
			dispatch(deletefile(`resource/classroom/file/change/${item.id}`));
		}
	};
	return (
		<div className='grid grid-rows-7 grid-flow-row gap-2  min-w-full'>
			<div className='row-span-4 grid grid-cols-6 gap-4'>
				<div>
					<FolderList folders={folders} link={`/classroom/adviser/resources/${id}`} />
				</div>
				<div className=' col-span-5 border-2 rounded-md'>
					<FileTable
						files={files}
						uploadFiles={uploadFiles}
						handMeID={handMeID}
						delete_File={delete_File}
					/>
				</div>
			</div>
			<div className='row-span-2'></div>
		</div>
	);
};

export default AdviserResourceContent;
