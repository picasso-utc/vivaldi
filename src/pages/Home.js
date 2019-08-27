import React from 'react'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import Header from '../components/Header';
import Rules from  '../components/home/Rules';
import Calendar from '../components/home/Calendar';
import PriceDisplayer from '../components/home/PriceDisplayer';
import GoodiesDisplayer from '../components/home/GoodiesDisplayer';
import FichesPostes from '../components/home/FichesPostes';
import Trombinoscope from '../components/home/Trombinoscope';


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
					
					<Typography variant="h4" className={classes.title}>
						Les règles au Pic
                	</Typography>
					<Container className={classes.component}>
						<Rules />
					</Container>

					<Typography variant="h4" className={classes.title}>
						Calendrier
                	</Typography>
					<Container className={classes.component}>
						<Calendar />
					</Container>

					<Typography variant="h4" className={classes.title}>
						Tarifs
                	</Typography>
					<Container className={classes.component}>
						<PriceDisplayer />
					</Container>

					<Typography variant="h4" className={classes.title}>
						Goodies
                	</Typography>
					<Container className={classes.component}>
						<GoodiesDisplayer />
					</Container>
					
					<Typography variant="h4" className={classes.title}>
						Devenir membre du Pic
                	</Typography>
					<Container className={classes.component}>
						<FichesPostes />
					</Container>

					<Typography variant="h4" className={classes.title}>
						La Team
                	</Typography>
					<Container className={classes.component}>
						<Trombinoscope />
					</Container>
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
	component: {
		marginTop: 30,
		padding: '5%',
		border: "#B22132 2px solid",
	},
});

export default withStyles(styles)(Home)
