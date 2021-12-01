import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ProductDetailComponent from '../../../../materialUI/components/reuseableComponents/dashboardComponent';
import PageManagerComponent from '../../../../materialUI/components/reuseableComponents/pageManagerComponent';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { getCurrentClassroom, retrieveClassroom } from '../../../../store/newClassroomSlice';
import useFetch from '../../../../hooks/useFetch';
import ResearcherResourceTab from './tabs/resources/researcherResourceTab';
import ResearcherWorkspaceTab from './tabs/workspaces/researcherWorkspaceTab';
import ResearcherClassroomStudentTab from './tabs/students/researcherClassroomStudentTab';
const ResearcherClassroomManager = () => {
	const dispatch = useDispatch();

	const { id } = useParams();
	const location = useLocation();
	const { tab } = queryString.parse(location.search);
	const [value, setValue] = useState(tab);
	const classroomState = useFetch;

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	useEffect(() => {
		dispatch(retrieveClassroom(`/classroom/change/${id}`));
	}, []);
	const fetchedClassroom = useSelector((state) => state.newClass.currentClassroom);
	const { items: classroom, setItems: setClassroom } = classroomState(fetchedClassroom);

	const tabs = [
		{
			label: 'Dashboard',
			link: `/classroom/researcher/${id}?tab=dashboard`,
			value: 'dashboard',
			component: 'Dashboard',
		},
		{
			label: 'Resources',
			link: `/classroom/researcher/${id}?tab=resources`,
			value: 'resources',
			component: <ResearcherResourceTab />,
		},
		{
			label: 'Students',
			link: `/classroom/researcher/${id}?tab=students`,
			value: 'students',
			component: <ResearcherClassroomStudentTab />,
		},
		{
			label: 'Workspaces',
			link: `/classroom/researcher/${id}?tab=workspaces`,
			value: 'workspaces',
			component: <ResearcherWorkspaceTab />,
		},
	];
	return (
		<>
			<div className='flex flex-col space-y-4'>
				<ProductDetailComponent
					dialogTitle='Classroom Detail'
					isEdit={false}
					productType='Classroom'
					setProduct={setClassroom}
					product={classroom}
				>
					<div className='flex flex-col space-y-4 ml-4'>
						<div className='grid grid-cols-4 gap-4'>
							<div className='flex '>
								<p>
									<b>Name:</b>
								</p>
							</div>
							<div className='col-span-3'>
								<p>{classroom.name}</p>
							</div>
						</div>
						<div className='grid grid-cols-4 gap-4'>
							<div className='flex '>
								<p>
									<b>Adviser:</b>
								</p>
							</div>
							<div className='col-span-3'>
								<p>{classroom.owner}</p>
							</div>
						</div>
						<div className='grid grid-cols-4 gap-4'>
							<div className='flex '>
								<p>
									<b>Subject:</b>
								</p>
							</div>
							<div className='col-span-3'>
								<p>{classroom.subject}</p>
							</div>
						</div>
						<div className='grid grid-cols-4 gap-4'>
							<div className='flex '>
								<p>
									<b>Code:</b>
								</p>
							</div>
							<div className='col-span-3'>
								<p>{classroom.code}</p>
							</div>
						</div>
						<div className='grid grid-cols-4 gap-4'>
							<div className='flex '>
								<p>
									<b>Description:</b>
								</p>
							</div>
							<div className='col-span-3'>
								<p>{classroom.description}</p>
							</div>
						</div>
					</div>
				</ProductDetailComponent>
				<PageManagerComponent value={value} handleChange={handleChange} tabs={tabs} />
			</div>
		</>
	);
};

export default ResearcherClassroomManager;
