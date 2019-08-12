import React from 'react'

import Header from '../components/Header';
import Rules from  '../components/home/Rules';
import Calendar from '../components/home/Calendar';
import PriceDisplayer from '../components/home/PriceDisplayer';
import GoodiesDisplayer from '../components/home/GoodiesDisplayer';
import FichesPostes from '../components/home/FichesPostes';
import Trombinoscope from '../components/home/Trombinoscope';


const HEADER_HEIGHT = 64;

class Home extends React.Component {
	render() {
		return (

			<div>
				<Header height={HEADER_HEIGHT} />
				<div className="container">
					<Rules />
					<Calendar />
					<PriceDisplayer />
					<GoodiesDisplayer />
					<FichesPostes />
					<Trombinoscope />	
				</div>
			</div>
		);
	}
}

export default Home
