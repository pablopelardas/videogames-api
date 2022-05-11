import styled from 'styled-components';
import { Container } from '../../../../styled-components/StyledContainer';

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

export const CardsContainer = styled(Container)`
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
