import styled from 'styled-components';
import { Container } from '../../../../styled-components/StyledContainer';

export const CardsContainer = styled(Container)`
	display: flex;
	background: transparent;
	min-height: auto;
	flex-wrap: wrap;
	gap: 30px;
	padding: 0 100px 75px 100px;
	margin-top: 20px;

	.empty-container {
		width: 100%;
		max-width: 500px;
		background-color: #00ffcf52;
		border-radius: 20px;
		border: 1px solid black;
		box-shadow: -3px 5px #3c98f88f;
		padding: 10px 20px;
	}
	.empty--message {
		font-size: 2rem;
		margin: 20px 0px;
		font-weight: bold;
		letter-spacing: 0.5px;
		border-radius: 10px;
		padding: 5px;
		border: 0px;
		background-color: #59fcc9;
		color: black;
	}
	.empty--img {
		width: 100%;
		margin: 20px 0px;
	}

	@media (max-width: 768px) {
		padding: 0 25px 75px 25px;
	}
`;
