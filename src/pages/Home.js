import React from 'react'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import Rules from  '../components/home/Rules';
import Calendar from '../components/home/Calendar';
import PriceDisplayer from '../components/home/PriceDisplayer';
import GoodiesDisplayer from '../components/home/GoodiesDisplayer';
// import FichesPostes from '../components/home/FichesPostes';
import Trombinoscope from '../components/home/Trombinoscope';
import Footer from '../components/Footer';
import IndexPolls from '../components/home/IndexPolls';


class Home extends React.Component {
	render() {

		const { classes } = this.props;

		return (
			<React.Fragment>
				<CssBaseline />
				
				<Container className={classes.root}>
					<Container className={classes.header} id="header" fixed>
						<Header/>
					</Container>
					
					<Container className={classes.container}>
						<fieldset className={classes.component}>
							<legend className={classes.legend}>Les règles</legend>
							<Rules />
						</fieldset>
					</Container>
					
					{/* <Typography variant="h4" className={classes.title}>
						Les règles au Pic
                	</Typography>
					<Container className={classes.component}>
						<Rules />
					</Container> */}


					<Container className={classes.container}>
						<fieldset className={classes.component} style={{minWidth: 1}}>
							<legend className={classes.legend}>Calendrier</legend>
							<Calendar />
						</fieldset>
					</Container>


					<Container className={classes.container}>
						<fieldset className={classes.component} style={{minWidth: 1}}>
							<legend className={classes.legend}>Sondages</legend>
							<IndexPolls />
						</fieldset>
					</Container>

					<Container className={classes.container}>
						<fieldset className={classes.component} style={{minWidth: 1}}>
							<legend className={classes.legend}>Tarifs</legend>
							<PriceDisplayer />
						</fieldset>
					</Container>

					<Container className={classes.container}>
						<fieldset className={classes.component}>
							<legend className={classes.legend}>Goodies</legend>
							<GoodiesDisplayer />
						</fieldset>
					</Container>

					{/* <Container className={classes.container}>
						<fieldset className={classes.component}>
							<legend className={classes.legend}>Devenir membre du Pic</legend>
							<FichesPostes />
						</fieldset>
					</Container> */}

					<Container className={classes.container}>
						<fieldset className={classes.component}>
							<legend className={classes.legend}>La Team</legend>
							<Trombinoscope />
						</fieldset>
					</Container>

				</Container>
				<Container direction="row">
					<Footer/>
				</Container>
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
		backgroundColor: '#000223',
		color: 'white',
	},
	header : {
		height: window.innerHeight,
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
		marginTop: 30,
		padding: '5%',
		border: "#B22132 1.5px solid",
		textAlign: 'left',
	},
	legend : {
		fontSize: 34,
		padding: 15,
	},
});

export default withStyles(styles)(Home)
