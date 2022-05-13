import styled from 'styled-components';
import { Main } from '../../styled-components/StyledMain.js';
import { Container } from '../../styled-components/StyledContainer.js';

export const HOME_SECTION = styled(Main)`
	& .searchbar {
		padding: 20px 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		& .searchbar--currentPage {
			color: white;
		}
	}

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
