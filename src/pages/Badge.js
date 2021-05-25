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
							<h1>Politique d'utilisation des données</h1>
							<h2>Responsables</h2>
							<p>L'équipe informatique du Pic'Asso met en place cette collecte de donnée pour l'administration et la médecine de l'UTC.</p>
							<h2>Finalités du traitement</h2>
							<p>Dispositif de prévention sanitaire dans le cadre de la crise sanitaire de la covid 19.</p>
							<h2>Personnes visées par cette collecte</h2>
							<p>Tout membre de l'UTC (étudiants, professeurs, salariés) entrant dans le Pic'asso.</p>
							<h2>Les données stockées</h2>
							<p>Les données sont : date et heure du scan, login étudiant, nom et prénom de l'étudiant.</p>
							<h2>Destinataires et utilisation des données</h2>
							<ul>
								<li>Médecine : contacter les potentiels cas contacts en cas d'une contamination à la COVID 19 avérée.</li>
								<li>Administration : connaitre le nombre d'entrées (anonymement).</li>
							</ul>
							<p>Les données seront communiquées par l'équipe du Pic'Asso aux destinataires</p>
							<h2>Transferts</h2>
							<p>Les données ne feront pas objet d'un transfert dans un pays tiers ou une organisation internationale.</p>
							<h2>Conservation des données</h2>
							<p>Les données seront conservées 21 jours.</p>
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
