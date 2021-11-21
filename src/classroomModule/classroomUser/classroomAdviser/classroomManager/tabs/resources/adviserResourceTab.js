import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BannerComponent from '../../../../../../materialUI/components/reuseableComponents/bannerComponent';
import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import { Button, TextField } from '@mui/material';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import CardComponent from '../../../../../../materialUI/components/reuseableComponents/cardComponent';
import useFetch from '../../../../../../hooks/useFetch';
import { addResource, getResources } from '../../../../../../store/newResourceSlice';

const AdviserResourceTab = () => {
	const dispatch = useDispatch();
	const fetchClassroom = useFetch;
	const { id } = useParams();

	useEffect(() => {
		dispatch(getResources('resource/classroom/' + id));
	}, []);
	const fetchedResources = useSelector((state) => state.newResource.resources);
	const { items: resources, setItems: setResources } = fetchClassroom(fetchedResources);
	const [inputForm, setInputForm] = useState({
		name: '',
		description: '',
	});
	const onChange = (e) => {
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	};
	const handleCreate = () => {
		const { name, description } = inputForm;
		dispatch(addResource(`resource/classroom/${id}`, name, description));
	};
	return (
		<>
			<div class='flex flex-col w-full space-y-4'>
				<BannerComponent
					title=' Hello dear, Adviser !'
					subtitle='Here is where you can set up something to help your students.'
				>
					{/* title, context, action, maxWidth, name, button */}
					<DialogComponent
						button={<Button variant='contained'>Create Resource Package</Button>}
						title='Create Resource Package'
						context='Guide your students to grow.'
						action={{ label: 'Create', handler: handleCreate }}
					>
						<div className='flex flex-col space-y-4 mt-4'>
							<TextField
								fullWidth
								id='outlined-search'
								label='Resource Name'
								variant='outlined'
								name='name'
								value={inputForm.name}
								onChange={(e) => onChange(e)}
							/>
							<TextField
								fullWidth
								id='outlined-search'
								label='Description'
								variant='outlined'
								name='description'
								value={inputForm.description}
								onChange={(e) => onChange(e)}
								multiline
								minRows={4}
							/>
						</div>
					</DialogComponent>
				</BannerComponent>

				<CardHolder>
					{resources.length > 0
						? resources.map((item) => (
								<CardComponent
									link={`/classroom/adviser/resources/${item.id}`}
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

export default AdviserResourceTab;
