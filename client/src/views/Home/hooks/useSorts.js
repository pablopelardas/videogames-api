import { useState } from 'react';

const useSorts = (games) => {
	const [sort, setSort] = useState({});

	const applySort = {
		ALL: (array) => array,
		RATING: {
			ASC: (array) => array.sort((a, b) => a.rating - b.rating),
			DES: (array) => array.sort((a, b) => b.rating - a.rating),
		},
		NAME: {
			ASC: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
			DES: (array) => array.sort((a, b) => b.name.localeCompare(a.name)),
		},
	};

	return {};
};

export default useSorts;
