import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from '../views/LandingPage';
import Home from '../views/Home';
import GameDetail from '../views/GameDetail';
import Layout from '../views/Layout';
import CreateGame from '../views/CreateGame';

const MainRoutes = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/home' element={<Home />} />
					<Route path='/detail/:id' element={<GameDetail />} />
					<Route path='/create-game' element={<CreateGame />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default MainRoutes;
