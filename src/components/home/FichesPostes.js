import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// TODO : A récupérer depuis l'api
const POSTES = {
	'prez' : { title: 'Prez', description: '', point:'' },
	'vice_prez': { title: 'Vice Prez', description: '', point:''  },
	'treso': { title: 'Tréso' },
	'vice_treso': { title: 'Vice Tréso', description: '', point:''  },
	'com': { title: 'Com' },
	'anim': { title: 'Anim', description: '', point:''  },
	'appro_biere': { title: 'Appro Bière', description: '', point:''  },
	'appro_soft': { title: 'Appro Soft' , description: '', point:'' },
	'info': { title: 'Info', description: '', point:''  },
	'bob': { title: 'Bob', description: '', point:''  },
	'locaux': { title: 'Locaux', description: '', point:''  },
	'green': { title: 'Green', description: '', point:''  },
	'estu': { title: 'Estu Parking', description: '', point:''  },
}

const POINTSPIC = {
	'point_1' : { contenu : 'Prendre des responsabilités'},
	'point_2' : { contenu : 'S’investir/donner de son temps pour les autres'},
	'point_3' : { contenu : 'Kiffer son semestre'},
	'point_4' : { contenu : 'Dire à Garance que c’est la plus belle de l’UTC'},
	'point_5' : { contenu : 'Innover pour améliorer le pic de semestre en semestre.'},
	'point_6' : { contenu : 'Remplir les softs et profiter de sa 2eme maison'},
}

class FichesPostes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPost: null,
			dialogOpen: false,
		};
	}

	openDialog = () => this.setState({ dialogOpen: true })
	closeDialog = () => this.setState({ dialogOpen: false })
	openPost = event => {
		const value = event.currentTarget.value;
		this.setState({ currentPost: value });
	}


	render() {
		const { classes } = this.props;
		const { currentPost } = this.state;
		return (
			<section id="FichesPostes" className={classes.FichesPostes}>
				<h1 className={classes.sectionTitle}>Les postes du Pic </h1>
				<div className={classes.frame}>
					<p className={classes.textNormal}> Être membre du pic: c&rsquo;est quoi ?</p>
					<div className={classes.center}>
						<Button className={classes.button} onClick={this.openDialog}>Découvrir</Button>
						<Dialog disableTypography classes={{root: classes.Dialog}} open={this.state.dialogOpen} onClose={this.closeDialog}>
			        <DialogTitle disableTypography classes={{ root: classes.titreDialog }}>{"Le Picasso"}</DialogTitle>
			        <DialogContent>
			          <DialogContentText>
			            <ul className={classes.liste}>
									{Object.keys(POINTSPIC).map(key => (
										<p className={classes.textDialog}> {POINTSPIC[key].contenu} </p>
									))}
									</ul>
			          </DialogContentText>
			        </DialogContent>
      			</Dialog>
					</div>
					<p className={classes.textNormal}>Les postes</p>
					<div className={classes.dividerContainer}>
						<ul className={classes.liste}>
							{Object.keys(POSTES).map(key => (
								<Button key={key} onClick={this.openPost} value={key}>{POSTES[key].title}</Button>
							))}
						</ul>
						<div className={classes.descriptionContainer}>
								{currentPost ? (
								<div className={classes.fiche}>
									<h2>{POSTES[currentPost].title}</h2>
									<p>Description du poste: {POSTES[currentPost].description}</p>
									<p>Les points à retenir: </p>
									<ul>
										{POSTES[currentPost].point}
									</ul>
								</div>
								) : (
									<p>Choisis un poste à découvrir dans la liste !</p>
								)}
							</div>

					</div>
				</div>
			</section>
		);
	}
}
export const styles = theme => ({
	FichesPostes: {
		paddingTop: 64,
		display: "block",
	},
	frame: {
		padding: '1em 2em',
		border: '#B22132 2px solid',
	},
	textNormal: {
		width: "100%",
		fontSize: 30,
		fontFamily: "Sans-serif",
		textAlign: "left",
	},
	textDialog: {
		width: "100%",
		fontSize: 20,
		fontFamily: "Sans-serif",
		textAlign: "left",
	},
	center: {
		textAlign: 'center',
	},
	sectionTitle: {
		fontSize: 60,
		fontFamily: "Roboto",
		textAlign: "center",
		display: "block",
		marginBottom: "20px",
	},
	dividerContainer: {
		display: 'flex',
		maxHeigth: '90vh',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
	},
	liste: {
		padding: 0,
		margin:0,
		display: 'flex',
		justifyContent: 'center',
		overflow: 'auto',
		[theme.breakpoints.up('sm')]: {
			flexDirection: 'column',
			paddingRight: '1em',
		},
	},
	titreDialog: {
		fontSize: 40,
		fontFamily: "Roboto",
		textAlign: "center",
		display: "block",
		marginBottom: "20px",
		primary: "blue"
	},
	descriptionContainer: {
		flex: 10,
	},
	button: {
		paddingTop: "4px",
		paddingBottom: "4px",
		color: "white",
		border: "#B22132 1px solid",
	},
});
export default withStyles(styles)(FichesPostes);
