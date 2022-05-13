import styled from 'styled-components';

const Button = styled.button`
	width: 150px;
	height: 50px;
	background: #02394bd4;
	border: 4px solid #0cd8fe45;
	box-shadow: 0px 0px 16px 8px #00fffd4d;
	color: #deffff;
	font-size: 2.5rem;
`;

const Main = styled.main`
	height: 100vh;
	& img {
		position: absolute;
		object-fit: cover;
		height: 100vh;
		width: 100%;
		z-index: -1;
	}
	& .landing--container {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 50px;
	}
	& .landing--title {
		padding: 20px;
		margin: 0 30px;
		min-width: 280px;
		text-align: center;
		font-size: 5rem;
		border: 4px solid #0cd8fe45;
		box-shadow: 0px 0px 16px 8px #00fffd4d;
		color: #deffff;
		background: #02394bc2;
	}
`;

export { Button, Main };
