import { useState, useEffect } from 'react';

const useSorts = (games) => {
	const [sortedGames, setSortedGames] = useState(games);
	const [sort, setSort] = useState(); // rating(false/true), name(false/true), null

	useEffect(() => {
		if (!!sort) {
			setSortedGames(
				...Object.entries(sort).map(([key, value]) =>
					applySort[key]([...games], value)
				)
			);
		} else setSortedGames([...games]);
	}, [sort, games]); // eslint-disable-line react-hooks/exhaustive-deps

	const applySort = {
		RATING: (games, asc) =>
			asc
				? games.sort((a, b) => a.rating - b.rating)
				: games.sort((a, b) => b.rating - a.rating),
		NAME: (games, asc) =>
			asc
				? games.sort((a, b) => a.name.localeCompare(b.name))
				: games.sort((a, b) => b.name.localeCompare(a.name)),
	};

	const handleSortSelection = (value) => {
		if (!value) setSort();
		if (value === 'RATING')
			setSort((prevState) =>
				prevState
					? {
							RATING: !prevState.RATING,
					  }
					: { RATING: true }
			);
		if (value === 'NAME')
			setSort((prevState) =>
				prevState
					? {
							NAME: !prevState.NAME,
					  }
					: { NAME: true }
			);
	};

	return {
		handleSortSelection,
		sortedGames,
		sort,
	};
};

export default useSorts;
