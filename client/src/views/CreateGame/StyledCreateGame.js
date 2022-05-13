import styled from 'styled-components';
import { Main } from '../../styled-components/StyledMain';
import { Container } from '../../styled-components/StyledContainer.js';

export const CREATE_MAIN = styled(Main)`
	 ;
`;

export const CREATE_GAME_CONTAINER = styled(Container)`
	color: white;
	font-size: 2rem;
	& .error {
		color: red;
	}

	& .platform-button {
		border: solid 1px white;
		background-color: red;
		padding: 3px;
		margin: 5px;
	}
`;
