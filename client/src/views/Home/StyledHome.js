import styled from 'styled-components';
import { Main } from '../../styled-components/StyledMain.js';
import { Container } from '../../styled-components/StyledContainer.js';

export const HOME_SECTION = styled(Main)`
	& .search {
	}

	& .loading {
		color: white;
		height: 84vh;
		align-content: center;
	}
`;

export const HOME_GAME_CONTAINER = styled(Container)`
	flex-direction: column;
	align-items: center;
`;
