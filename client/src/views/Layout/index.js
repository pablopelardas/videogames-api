import React from 'react';
import { useLocation } from 'react-router-dom';

import { MAIN_CONTAINER } from './StyledLayout.js';

import Navbar from '../../components/Navbar';
// import Footer from '../Footer';

const Layout = ({ children }) => {
	const location = useLocation();
	return (
		<div className='Main'>
			{location.pathname !== '/' ? <Navbar /> : null}
			{children}
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
