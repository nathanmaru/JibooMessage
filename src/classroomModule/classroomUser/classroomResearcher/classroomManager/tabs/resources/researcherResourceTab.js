import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../hooks/useFetch';
import CardComponent from '../../../../../../materialUI/components/reuseableComponents/cardComponent';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import { getResources } from '../../../../../../store/newResourceSlice';

const ResearcherResourceTab = () => {
	const dispatch = useDispatch();
	const resourceState = useFetch;
	const { id } = useParams();

	useEffect(() => {
		dispatch(getResources('resource/classroom/' + id));
	}, []);
	const fetchedResources = useSelector((state) => state.newResource.resources);
	const { items: resources, setItems: setResources } = resourceState(fetchedResources);
	return (
		<>
			<div class='flex flex-col w-full space-y-4'>
				<CardHolder>
					{resources.length > 0
						? resources.map((item) => (
								<CardComponent
									link={`/classroom/researcher/resources/${item.id}`}
									image={item.cover}
									item={item}
								/>
						  ))
						: 'no resources created yet'}
				</CardHolder>
			</div>
		</>
	);
};

export default ResearcherResourceTab;
