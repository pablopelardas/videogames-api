import React from 'react';
import { Header } from './styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<Header>
			<nav>
				<Link to='/home'>
					<ul>Home</ul>
				</Link>
			</nav>
		</Header>
	);
};

export default Navbar;
