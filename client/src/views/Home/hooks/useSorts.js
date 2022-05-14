import { useState, useEffect } from 'react';

const useSorts = (games) => {
	const [sortedGames, setSortedGames] = useState([...games]);
	const applySort = {
		ALL: (array) => array,
		RATING: {
			ASC: (array) => array.sort((a, b) => b.rating - a.rating),
			DES: (array) => array.sort((a, b) => a.rating - b.rating),
		},
		NAME: {
			ASC: (array) => array.sort((a, b) => b.name.localeCompare(a.name)),
			DES: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
		},
	};

	const handleSortSelection = (e) => {
		if (e.target.innerText === 'RESET') {
			setSortedGames(applySort.ALL([...games]));
			return;
		}

		const type = e.target.innerText.slice(0, -2);
		let op = e.target.innerText[e.target.innerText.length - 1];
		const option = {
			'▲': 'ASC',
			'▼': 'DES',
		};
		//TYPE ▲, TYPE ▼
		setSortedGames(applySort[type][option[op]]([...games]));
		if (op === '▲') op = '▼';
		else op = '▲';

		e.target.innerText = `${type} ${op}`;
	};

	return {
		handleSortSelection,
		sortedGames,
	};
};

export default useSorts;
