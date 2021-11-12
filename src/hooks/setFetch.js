import { useState, useEffect } from 'react';
const setFetch = (fetchedItem) => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		if (fetchedItem) {
			setItems(fetchedItem);
		}
	}, [fetchedItem]);
	return { items };
};

export default setFetch;
