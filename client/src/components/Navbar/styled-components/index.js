import styled from 'styled-components';

const Header = styled.header`
	position: absolute;
	display: flex;
	justify-content: center;
	height: 3vh;
	width: 100vw;
	background: red;

	& nav {
		background: green;
		font-size: 2rem;
	}
`;

export { Header };
