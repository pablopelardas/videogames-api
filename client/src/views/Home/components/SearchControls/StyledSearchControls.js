import styled from 'styled-components';

export const SEARCH_CONTROLS_DIV = styled.div`
	padding: 20px 0;
	width: 320px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;

	.search,
	.filters,
	.pages,
	.sorts {
		display: flex;
		width: 100%;
		justify-content: center;
		gap: 15px;
	}
	.pages {
		gap: 5px;
	}

	.search--bar,
	.filters--select {
		font-size: 1.5rem;
		border-radius: 10px;
		padding: 5px;
		border: 0px;
		background-color: #ffffff;
		&::placeholder {
			color: #505352;
		}
	}

	.filters--select:disabled {
		background-color: #ffffff73;
		color: black;
	}

	.search--button,
	.pages--next-button,
	.pages--prev-button,
	.sorts--button {
		font-size: 1.5rem;
		font-weight: bold;
		letter-spacing: 0.5px;
		border-radius: 10px;
		padding: 5px;
		border: 0px;
		background-color: #59fcc9;
		color: black;
		&:disabled {
			background-color: #59fcc97d;
		}
	}
	.sorts--button {
		background-color: #ffffff;
		width: 150px;
	}

	.pages--page-button {
		font-size: 1.5rem;
		font-weight: bold;
		letter-spacing: 0.5px;
		border-radius: 10px;
		padding: 5px 7px;
		border: 0px;
	}

	.selected {
		background-color: #59fcc9;
	}
`;

//searchbar font-size 1.5 mobile
