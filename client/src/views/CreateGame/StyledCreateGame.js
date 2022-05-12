import styled from 'styled-components';
import { Main } from '../../styled-components/StyledMain';

export const CREATE_MAIN = styled(Main)`
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
