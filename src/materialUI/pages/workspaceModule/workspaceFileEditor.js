import FileEditor from '../../components/reuseableComponents/FileEditor';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import { editQuillFile, retrieveQuillFile } from '../../../store/fileManagerSlice';
import queryString from 'query-string';
import { useQuill } from 'react-quilljs';

const WorkspaceFileEditor = () => {
	// hooks
	const location = useLocation();
	const { id } = useParams();
	const dispatch = useDispatch();
	// states and onChange
	const [formData, setFormData] = useState({
		name: '',
		status: 'draft',
		view: 'default',
	});
	const [content, setContent] = useState();
	const onChange = (e) => {
		e.preventDefault();

		switch (e.target.name) {
			case 'name':
				setFormData({ ...formData, name: e.target.value });

				if (e.target.value != '') {
					dispatch(editQuillFile({ name: e.target.value }, id));
				}
				break;
			case 'status':
				setFormData({ ...formData, status: e.target.value });
				dispatch(editQuillFile({ status: e.target.value }, id));
				break;
			case 'view':
				setFormData({ ...formData, view: e.target.value });
				break;
			default:
				setFormData(formData);
		}
	};
	// Fetch File
	useEffect(() => {
		dispatch(retrieveQuillFile(id));
	}, []);
	// get Fetch
	const fetchedFile = useSelector((state) => state.fileManager.currentQuillFile);
	// set File
	useEffect(() => {
		if (fetchedFile) {
			const { name, status, contentF } = fetchedFile;
			setFormData({ ...formData, name: name, status: status });
			setContent(contentF);
		}
	}, [fetchedFile]);

	const getUpdate = (text) => {
		dispatch(editQuillFile({ content: text }, id));
		console.log(text, 'UPdated text');
	};

	return (
		<>
			<FileEditor
				setContent={setContent}
				fetchedFile={fetchedFile}
				formData={formData}
				onChange={onChange}
				getUpdate={getUpdate}
				setFormData={setFormData}
			/>
		</>
	);
};

export default WorkspaceFileEditor;
