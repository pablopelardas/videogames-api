import styled from 'styled-components';

export const CardsContainer = styled.div`
	margin-top: 5vh;
	padding: 50px;
	display: flex;
	width: 80%;
	height: auto;
	background-color: salmon;
	justify-content: center;
	flex-wrap: wrap;
	gap: 30px;

	& h1 {
		color: white;
	}
`;

export const Box = styled.div`
	width: 250px;
	height: 300px;
	background-color: white;
`;
