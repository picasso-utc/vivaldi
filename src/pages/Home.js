import React from 'react'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import Footer from '../components/Footer';



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
