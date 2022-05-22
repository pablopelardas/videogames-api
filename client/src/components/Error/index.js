import React from 'react';
import styled from 'styled-components';
import errorImg from '../../assets/error.gif';
import { useNavigate, useLocation } from 'react-router-dom';

const ERROR_CONTAINER = styled.div`
	width: 80%;
	.error--message,
	img {
		width: 100%;
		max-width: 1000px;
		color: white;
		font-size: 2rem;
		background-color: red;
		margin: 20px 0px;
	}
`;

const RETURN_BUTTON = styled.button`
	font-size: 1.5rem;
	font-weight: bold;
	letter-spacing: 0.5px;
	border-radius: 10px;
	padding: 5px;
	border: 0px;
	background-color: #59fcc9;
	color: black;
	cursor: pointer;
	margin-bottom: 20px;
`;

const Error = ({ gamesError }) => {
	console.log(gamesError);
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<ERROR_CONTAINER>
			{location.pathname !== '/home' ? (
				<RETURN_BUTTON
					onClick={() => {
						navigate(`/home`);
					}}
				>
					Return to all games
				</RETURN_BUTTON>
			) : null}

			<p className='error--message'>
				{`Error ${gamesError?.response.status || `404`}: ${
					gamesError?.response.data ||
					`Sorry, the page you're searching for doesn't exist.`
				}`}
			</p>
			<img src={errorImg} alt='error-gif' />
		</ERROR_CONTAINER>
	);
};

export default Error;
