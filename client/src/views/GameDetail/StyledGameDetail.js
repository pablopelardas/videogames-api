import styled from 'styled-components';
import { Main } from '../../styled-components/StyledMain.js';
import { Container } from '../../styled-components/StyledContainer.js';

export const DETAIL_MAIN = styled(Main)`
	color: black;
	& h1 {
		color: white;
	}
	& h2 {
		font-size: 3rem;
	}
`;

export const DETAIL_CONTAINER = styled(Container)`
	width: 60vw;
	min-width: 320px;
	display: grid;
	justify-items: center;
	& .game-details {
		font-size: 2rem;
		text-align: center;
		& .details--released-rating {
			font-weight: bold;
		}
		& h3 {
			margin-bottom: 20px;
		}
		& p {
			margin-bottom: 15px;

			& span {
				font-weight: bold;
			}
		}
	}
	& .img-container {
		margin: 20px 0;
		width: 100%;
		display: flex;
		justify-content: center;
		& img {
			width: 100%;
			min-width: 300px;
			max-width: 800px;
			height: auto;
		}
	}
`;
