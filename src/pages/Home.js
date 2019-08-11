import React from 'react'

import NewsDisplayer from '../components/home/NewsDisplayer';
import LeSaviezVous from '../components/home/LeSaviezVous';
import Calendar from '../components/home/Calendar';
import GoodiesDisplayer from '../components/home/GoodiesDisplayer';
import PriceDisplayer from '../components/home/PriceDisplayer';
import Trombinoscope from '../components/home/Trombinoscope';
import Rules from  '../components/home/Rules';
import Header from '../components/Header';
import FichesPostes from '../components/home/FichesPostes';

const HEADER_HEIGHT = 64;

class Home extends React.Component {
	render() {
		return (

			<div>
				<Header height={HEADER_HEIGHT} />
				<div className="container">
					<Rules />
					<LeSaviezVous />
					<NewsDisplayer />
					<GoodiesDisplayer />
					<Calendar />
					<PriceDisplayer />
					<Trombinoscope />
					<FichesPostes />
				</div>
			</div>
		);
	}
}

export default Home
