import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetch from '../../../../../../../../hooks/useFetch';
import { addStaff, getStaffs, getStaffTypes } from '../../../../../../../../store/staffSlice';

const DepartmentStaff = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const staffsState = useFetch;
	const staffTypeState = useFetch;
	useEffect(() => {
		dispatch(getStaffs(`/institution/department/staff?search=${id}`));
		dispatch(getStaffTypes(`/institution/staff-type`));
	}, []);
	const fetchedStaffs = useSelector((state) => state.staff.staffs);
	const fetchedStaffTypes = useSelector((state) => state.staff.staffTypes);
	const currentDepartment = useSelector((state) => state.department.currentDepartment);
	const { items: staffs } = staffsState(fetchedStaffs);
	const { items: staffTypes } = staffTypeState(fetchedStaffTypes);
	console.log(staffs);

	/**
	 * *Instructions for Adding Staff:
	 * Create this text Field(s) : username
	 * Create this dropdown: stafftype (map the variable staffTypes and use the name as item value) Please use react-hook-form for this
	 * Use/Modify the function: "handleAddStaff"
	 *
	 */

	function handleAddStaff() {
		let formData = new FormData();
		formData.append('institution', currentDepartment.institution);
		formData.append('department', currentDepartment.id);
		formData.append('type', currentDepartment.id);
		formData.append('username', currentDepartment.id);
		dispatch(addStaff(`/institution/staff`, formData));
	}
	return null;
};

export default DepartmentStaff;
