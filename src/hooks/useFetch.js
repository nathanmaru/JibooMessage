import { useEffect, useState } from 'react';

const useFetch = (fetchedItem) => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		if (fetchedItem) {
			setItems(fetchedItem);
		}
	}, [fetchedItem]);
	return { items, setItems };
};

export default useFetch;
