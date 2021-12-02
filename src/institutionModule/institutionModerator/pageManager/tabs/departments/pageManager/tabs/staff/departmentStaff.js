import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetch from '../../../../../../../../hooks/useFetch';
import { getStaffs } from '../../../../../../../../store/staffSlice';

const DepartmentStaff = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const staffsState = useFetch;
	useEffect(() => {
		dispatch(getStaffs(`/institution/department/staff?search=${id}`));
	}, []);
	const fetchedStaffs = useSelector((state) => state.staff.staffs);
	const { items: staffs } = staffsState(fetchedStaffs);
	console.log(staffs);
	return null;
};

export default DepartmentStaff;
