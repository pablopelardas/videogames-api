import React from 'react';
import { Header } from './StyledNavbar.js';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<Header>
			<nav>
				<Link to='/home'>
					<ul>Home</ul>
				</Link>
				<Link to='/create-game'>
					<ul>Create Game</ul>
				</Link>
			</nav>
		</Header>
	);
};

export default Navbar;
