import styled from 'styled-components';
import { Container } from '../../../../styled-components/StyledContainer';

export const CardsContainer = styled(Container)`
	background: transparent;
	flex-wrap: wrap;
	gap: 30px;
	padding: 0 100px 75px 100px;
	@media (max-width: 768px) {
		padding: 0 25px 75px 25px;
	}
`;
