import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Main } from './StyledLandingPage.js';

import bgLanding from './assets/landing-bg-desktopHD.jpg';

const LandingPage = () => {
	return (
		<Main>
			<img src={bgLanding} alt='Landing background' />
			<div className='landing--container'>
				<h3 className='landing--title'>Videogames Library</h3>
				<Link to='/home'>
					<Button>Enter Now</Button>
				</Link>
			</div>
		</Main>
	);
};

export default LandingPage;
