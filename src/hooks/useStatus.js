import { useState, useEffect } from 'react';

const useStatus = (status) => {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (status.includes('idle')) setLoading(false);
		if (status.includes('loading')) setLoading(true);
		if (status.includes('success')) setLoading(false);
		if (status.includes('failed')) setLoading(false);
	}, [status]);
	return { loading };
};

export default useStatus;
