import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Main } from './styled-components';

import bgDesktop from './assets/landing-bg-desktopHD.jpg';

const LandingPage = () => {
	return (
		<Main>
			<h3>Videogames Library</h3>
			<img src={bgDesktop} alt='Landing background' />
			<Link to='/home'>
				<Button>Enter Now</Button>
			</Link>
		</Main>
	);
};

export default LandingPage;
