import React from 'react';
import loader from '../../assets/loader.gif';
import styled from 'styled-components';

const LOADER_CONTAINER = styled.div`
	width: 20%;
	height: auto;
	& img {
		object-fit: cover;
		width: 100%;
	}

	@media (max-width: 425px) {
		width: 150px;
	}
`;

const Loading = () => {
	return (
		<LOADER_CONTAINER>
			<img src={loader} alt='loader-spinner' />
		</LOADER_CONTAINER>
	);
};

export default Loading;
