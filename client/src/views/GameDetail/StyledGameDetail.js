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
	min-width: 320px;
	display: flex;
	flex-direction: column;
	gap: 5px;
	color: white;
	justify-items: center;
	.loading {
		height: 84vh;
	}
	.details--released-rating {
		font-weight: bold;
		font-size: 2rem;
	}
	.game-details {
		font-size: 2rem;
		text-align: center;
		display: flex;
		margin: 30px;
		gap: 20px;
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
	.game-details--img-container {
		width: 80%;
		min-width: 200px;
		min-height: 500px;
		display: flex;
		& img {
			max-height: 100%;
			max-width: 100%;
			object-fit: contain;
		}
	}

	.game-details--info-container {
		background-color: #0978c930;
		display: flex;
		flex-direction: column;
		width: 80%;
		min-width: 300px;
		padding: 30px;
		min-height: 500px;
		place-content: center;
	}

	.delete-button {
		font-size: 1.5rem;
		font-weight: bold;
		letter-spacing: 0.5px;
		border-radius: 10px;
		padding: 5px;
		border: 0px;
		margin-bottom: 20px;
		background-color: #ff6565;
		color: black;
		cursor: pointer;
	}

	@media (max-width: 1024px) {
		.game-details {
			flex-direction: column-reverse;
			align-items: center;
		}
		.game-details--img-container {
			min-height: auto;
		}
	}

	@media (max-width: 768px) {
		width: 100vw;
		.game-details--img-container {
			width: 100%;
		}
		.game-details--info-container {
			font-size: 1.6rem;
		}
	}
`;
