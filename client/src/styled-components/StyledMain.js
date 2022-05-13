import styled from 'styled-components';

import bgMain from '../assets/main_background.jpg';

export const Main = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-image: url(${bgMain});
	background-position: center;
	padding-top: 3vh;
	padding-bottom: 5vh;
	width: 100vw;
	height: auto;
	min-height: 100vh;
`;
