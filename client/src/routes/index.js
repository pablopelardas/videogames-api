import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../views/LandingPage';
import Home from '../views/Home';
import GameCard from '../components/GameCard';

import Layout from '../views/Layout';

const MainRoutes = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/home' element={<Home />} />
					<Route path='/detail/:id' />
					<Route path='/create' />
					<Route path='/card' element={<GameCard />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default MainRoutes;
