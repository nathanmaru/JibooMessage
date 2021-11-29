import { useState } from 'react';

const useForm = (inputForm) => {
	const [errors, setErrors] = useState({ default: '' });
	const [showError, setShowError] = useState(false);
	if (inputForm.hasOwnProperty('name')) {
		if (inputForm.name.length == 0) setErrors({ ...errors, name: 'This field is Required' });
		// if (typeof inputForm.name === 'string') setErrors({ ...errors, name: 'Name needs to be a string' });
	}
	if (inputForm.hasOwnProperty('title')) {
		if (inputForm.title.length == 0) setErrors({ ...errors, title: 'This field is Required' });
	}
	if (inputForm.hasOwnProperty('first_name')) {
		if (inputForm.first_name.length == 0)
			setErrors({ ...errors, first_name: 'This field is Required' });
	}
	if (inputForm.hasOwnProperty('last_name')) {
		if (inputForm.last_name.length == 0)
			setErrors({ ...errors, last_name: 'This field is Required' });
	}
	if (inputForm.hasOwnProperty('password')) {
		if (inputForm.password.length == 0)
			setErrors({ ...errors, password: 'This field is Required' });
	}

	return { errors, showError, setShowError };
};

export default useForm;
