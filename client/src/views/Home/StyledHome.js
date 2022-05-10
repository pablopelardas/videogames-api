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
		height: auto;
		padding: 20px 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	& .search {
	}

	& .loading {
		color: white;
		height: 100vh;
		align-content: center;
	}
`;
