import React from 'react';
import styled from 'styled-components';
import Error from '../../components/Error';
import { Main } from '../../styled-components/StyledMain.js';
import { Container } from '../../styled-components/StyledContainer.js';

const DEFAULT = styled(Main)``;
const ERROR_CONTAINER = styled(Container)`
	padding-top: 100px;
`;

const Default404 = () => {
	return (
		<DEFAULT>
			<ERROR_CONTAINER>
				<Error />
			</ERROR_CONTAINER>
		</DEFAULT>
	);
};

export default Default404;
