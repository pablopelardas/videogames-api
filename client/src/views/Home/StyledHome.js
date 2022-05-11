import styled from 'styled-components';
import { Main } from '../../styled-components/StyledMain.js';

export const Main_home = styled(Main)`
	& .searchbar {
		margin-top: 20px;
		background-color: grey;
		height: auto;
		padding: 20px 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	& .search {
	}

	& .loading {
		color: white;
		height: 100vh;
		align-content: center;
	}
`;
