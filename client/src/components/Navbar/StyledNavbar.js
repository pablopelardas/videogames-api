import styled from 'styled-components';

const Header = styled.header`
	position: absolute;
	display: flex;
	justify-content: center;
	height: 3vh;
	width: 100vw;
	background-color: black;
	border: 2px solid #0cd8fe45;
	align-items: center;
	padding: 30px;

	& nav {
		font-size: 2rem;
		display: flex;
		gap: 20px;
		text-decoration: none;
		& a {
			text-decoration: none;
		}
		& .nav-item {
			border: 2px solid #0cd8fe45;
			padding: 5px 10px;
			color: #deffff;
			background: #02394bc2;
		}
	}
`;

export { Header };
