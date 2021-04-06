import React from 'react'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';


import Footer from '../components/Footer';
import WebSocketManager from '../components/websocket'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
    position: positions.MIDDLE,
    timeout: 2000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }




class Badge extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
			infos : null,
		}
	}

	render() {

        const { classes} = this.props;

		return (
            <AlertProvider template={AlertTemplate} {...options}>

			<React.Fragment>

				<CssBaseline />

				<Container id="home" className={classes.root}>

					<Container className={classes.header} id="header" fixed>
                        <div styles={{padding:"50px"}}>
                            <h1 >Veuillez déposer votre (ancien) badge</h1>
							<p>Attendez de voir Bienvenue (Votre nom) pour vous aventurer dans le pic</p>
							<h2>Merci!!</h2>
                        </div>
					</Container>

                    <WebSocketManager/>



				</Container>
				<Container id="footer" direction="row">
					<Footer/>
				</Container>
			</React.Fragment>
            </AlertProvider>
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
