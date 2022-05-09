import styled from 'styled-components';

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: black;
	padding-top: 3vh;
	padding-bottom: 5vh;
	width: 100vw;
	height: auto;

	& .searchbar {
		margin-top: 20px;
		background-color: grey;
		height: 80px;
		width: 100%;
		padding-top: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	& .search {
	}
`;
