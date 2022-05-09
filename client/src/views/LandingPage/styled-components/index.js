import styled from 'styled-components';

const Button = styled.button`
	width: 20%;
	height: 20%;
	margin-left: 40vw;
	margin-top: 60vh;
	background: #02394bd4;
	border: 2px solid cyan;
	color: #deffff;
	font-size: 2.5rem;
`;

const Main = styled.main`
	height: 100vh;
	& img {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: -1;
	}
	& h3 {
		position: absolute;
		right: 15vw;
		top: 15vh;
		width: 70vw;
		color: #eafff6;
		background: #02394bc2;
		height: auto;
		text-align: center;
		font-size: 10rem;
	}
`;

export { Button, Main };
