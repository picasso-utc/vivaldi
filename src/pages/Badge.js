import React from 'react'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';

import Footer from '../components/Footer';
import { CenterFocusStrong } from '@material-ui/icons';
import WebSocketManager from '../components/websocket'
import { Provider } from 'react-redux';
import {createStore} from 'redux';


class Badge extends React.Component {

	render() {

        const { classes } = this.props;

		return (
			<React.Fragment>
                <WebSocketManager/>
				<CssBaseline />
				
				<Container id="home" className={classes.root}>

					<Container className={classes.header} id="header" fixed>
                        <div styles={{padding:"50px"}}>
                            <h1>Veuillez déposer votre badge</h1>
                        </div>
					</Container>



				</Container>
				<Container id="footer" direction="row">
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
        height : window.innerHeight+65,
        textAlign: "center",
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
		border: "#B22132 1.5px solid",
		textAlign: 'left',
	},
	legend : {
		fontSize: 34,
		padding: 15,
	},
});

export default withStyles(styles)(Badge)
