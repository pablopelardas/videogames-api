import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
	let nav;
	beforeEach(() => {
		nav = shallow(<Navbar />);
	});

	it('It should render two <Links>, one to "/home" and the other to "/create-game"', () => {
		expect(nav.find(Link).length).toBeGreaterThanOrEqual(2);
		expect(nav.find(Link).at(0).prop('to')).toEqual('/home');
		expect(nav.find(Link).at(1).prop('to')).toEqual('/create-game');
	});
});
