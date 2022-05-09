import styled from 'styled-components';
import bg from './assets/card-bg.png';

export const Card = styled.article`
	width: 250px;
	height: 300px;
	overflow: scroll;
	background-image: url(${bg});
	& h2 {
		font-size: 2rem;
		font-weight: bold;
		color: black;
		text-align: center;
		margin: 10px;
	}
	& p {
		font-size: 2rem;
		text-align: center;
		margin-top: 10px;
		& span {
			font-weight: bold;
		}
	}
`;
