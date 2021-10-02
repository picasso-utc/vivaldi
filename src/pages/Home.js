import React from 'react'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import Rules from  '../components/home/Rules';
import Covid from  '../components/home/Covid';
import Calendar from '../components/home/Calendar';
import PriceDisplayer from '../components/home/PriceDisplayer';
import GoodiesDisplayer from '../components/home/GoodiesDisplayer';
import FichesPostes from '../components/home/FichesPostes';
// import Trombinoscope from '../components/home/Trombinoscope';
import Footer from '../components/Footer';
import IndexPolls from '../components/home/IndexPolls';
import PermRequest from '../components/home/PermRequest'



class Home extends React.Component {

	render() {

		const { classes } = this.props;

		return (
			<React.Fragment>
				<CssBaseline />

				<Container id="home" className={classes.root}>

					<Container className={classes.header} id="header" fixed>
						<Header/>
					</Container>

					<Container id="rules" className={classes.container}>
						<fieldset className={classes.component}>
							<legend className={classes.legend}>Les règles</legend>
							<Rules />
						</fieldset>
					</Container>

					<Container id="calendar" className={classes.container}>
						<fieldset className={classes.component} style={{minWidth: 1}}>
							<legend className={classes.legend}>Calendrier</legend>
							<Calendar />
						</fieldset>
					</Container>


					<Container id="polls" className={classes.container}>
						<fieldset className={classes.component} style={{minWidth: 1}}>
							<legend className={classes.legend}>Sondages</legend>
							<IndexPolls />
						</fieldset>
					</Container>

					<Container id="prices" className={classes.container}>
						<fieldset className={classes.component} style={{minWidth: 1}}>
							<legend className={classes.legend}>Tarifs</legend>
							<PriceDisplayer />
						</fieldset>
					</Container>

					<Container id="goodies" className={classes.container}>
						<fieldset className={classes.component}>
							<legend className={classes.legend}>Goodies</legend>
							<GoodiesDisplayer />
						</fieldset>
					</Container>

					<Container id="perm" className={classes.container}>
						<fieldset className={classes.component}>
							<legend className={classes.legend}>Perm au Pic</legend>
							<PermRequest />
						</fieldset>
					</Container>

					<Container id="postes" className={classes.container}>
						<fieldset className={classes.component} style={{minWidth: 1}}>
							<legend className={classes.legend}>Postes</legend>
							<FichesPostes />
						</fieldset>
					</Container>

					{/*<Container id="team" className={classes.container}>
						<fieldset className={classes.component}>
							<legend className={classes.legend}>La Team</legend>
							<Trombinoscope />
						</fieldset>
		</Container>*/}

				</Container>
				<Footer/>
			</React.Fragment>
		);
	}
}

const styles = theme => ({
	root: {
		width:'100%',
		maxWidth: '100%',
		margin: 0,
		paddingRight: '5%',
		paddingLeft: '5%',
		paddingBottom: 50,

	},
	header : {
		height : window.innerHeight+65,
		//display: "inline-block"
	},
	title: {
		color: 'white',
		textAlign: "center",
		marginTop: 50,
	},
	container: {
		padding: 0,
		overflowX: "overlay",
	},
	component: {
		marginTop: 40,
		padding: '5%',
		border: "var(--color-secondary) 1.5px solid",
		textAlign: 'left',
	},
	legend : {
		fontSize: 34,
		padding: 15,
		color: 'var(--color-primary)',
	},
});

export default withStyles(styles)(Home)
