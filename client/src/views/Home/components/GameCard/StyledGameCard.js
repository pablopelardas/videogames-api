import styled from 'styled-components';
import bg from './assets/card-bg.png';

export const Card = styled.article`
	width: 250px;
	height: 300px;
	overflow-x: hidden;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
	background-image: url(${bg});
	border-radius: 20px;
	border: 1px solid black;
	box-shadow: -3px 5px #3c98f88f;
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

	.card--game-img {
		width: 250px;
		height: 150px;
		object-fit: cover;
		object-position: center;
	}
	&:hover {
		box-shadow: 0px 0px 5px 7px #59fcc980;
		cursor: pointer;
	}
`;
