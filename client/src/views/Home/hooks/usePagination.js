import { useState, useEffect } from 'react';

const usePagination = (games, games_per_page = 15) => {
	const [page, setPage] = useState(0);
	const [paginatedGames, setPaginatedGames] = useState([]);
	const [pageButtons, setPageButtons] = useState(0);
	const limit = Math.ceil(games.length / games_per_page);

	useEffect(() => {
		setPaginatedGames([...games].splice(page * games_per_page, games_per_page));
		let auxPages = [];
		for (let i = 0; i < limit; i++) {
			auxPages.push(
				<button
					className={`pages--page-button ${page == i && 'selected'}`}
					key={`Page ${i + 1}`}
					onClick={pageButtonHandler}
				>
					{i + 1}
				</button>
			);
		}
		setPageButtons([...auxPages]);
	}, [games, page]);

	const nextHandler = () => {
		return page < limit - 1 && setPage(page + 1);
	};

	const pageButtonHandler = (e) => {
		const targetPage = parseInt(e.target.innerText) - 1;
		setPage(targetPage);
	};

	const prevHandler = () => {
		return page > 0 && setPage(page - 1);
	};

	return {
		nextHandler,
		prevHandler,
		pageButtonHandler,
		pageButtons,
		setPage,
		paginatedGames,
		limit,
	};
};

export default usePagination;
