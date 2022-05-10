import styled from 'styled-components';

export const Section = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	margin-top: 5vh;
	width: 80%;
	height: auto;
	& h1 {
		color: white;
	}
`;

export const CardsContainer = styled.div`
	padding: 50px;
	display: flex;
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
