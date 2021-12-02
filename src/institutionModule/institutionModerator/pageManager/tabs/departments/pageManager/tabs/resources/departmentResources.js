import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetch from '../../../../../../../../hooks/useFetch';
import { getResources } from '../../../../../../../../store/newResourceSlice';

const DepartmentResources = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const resourcesStates = useFetch;
	useEffect(() => {
		dispatch(getResources(`/resource/institution/department?search=${id}`));
	}, []);
	const fetchedResources = useSelector((state) => state.newResource.resources);
	const { items: resources } = resourcesStates(fetchedResources);
	// use resources variable to map
	return null;
};

export default DepartmentResources;
