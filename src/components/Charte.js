import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { ajaxGet, ajaxPost } from '../utils/Ajax'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { formateToDjangoDate } from '../utils/Date';
import SnackbarComponent from '../utils/SnackbarComponent';

class Charte extends Component {

  	constructor(props) {
		super(props)
		this.state = {
			newSignature : {
				nom: '',
				creneau_id: {},
				date: new Date(),
				login: '',
			},
			currentCreneau: {},
			loading: true,
			snackbar: {
				open: false,
				variant: 'success',
				message: '',
			},
			saving: false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.saveSignature = this.saveSignature.bind(this);
		this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
		this.changeSnackbarState = this.changeSnackbarState.bind(this);
	}


	componentDidMount(){
		this.loadCurrentPerm()
	}

	loadCurrentPerm(){
		ajaxGet('perms/current/public/creneau').then(res => {
			this.setState({
				newSignature : {
					...this.state.newSignature,
					creneau_id: res.data.id,
					date: formateToDjangoDate(new Date())
				},
				currentCreneau: res.data,
				loading: false,
			})
		})
		.catch(error => {
			this.setState({
				loading: false,
			})
			this.changeSnackbarState(true, 'error', 'Erreur lors du chargement.');
		})
	}

	displayDate() {
		let date = new Date()
		return(
			<Typography variant="body1">
				Fait le {("0" + (date.getDate())).slice(-2)}/{("0" + (date.getMonth() + 1)).slice(-2)}/{date.getFullYear()} à Compiègne
				<br/>
			</Typography>
		)
	}

	handleChange(event) {
		this.setState({
            newSignature: {
                ...this.state.newSignature,
                [event.target.name]: event.target.value
            }
        })
	}

	saveSignature() {
		const new_signature = this.state.newSignature;
		if (new_signature.nom && new_signature.login) {
			this.setState({saving: true})
			ajaxPost('signatures/', new_signature).then(res => {
				const current_creneau = this.state.currentCreneau;
				this.setState({
					newSignature: {
						nom: '',
						login: '',
						creneau_id: current_creneau.id,
						date: formateToDjangoDate(new Date()),
					},
					saving: false,
				})
				this.changeSnackbarState(true, 'success', 'Signature de la charte enregistrée.');
			})
			.catch(error => {
				this.setState({
					saving: false,
				})
				this.changeSnackbarState(true, 'error', 'Une erreur est survenue.');
			})
		} else {
			this.changeSnackbarState(true, 'error', 'Il manque des informations.');
		}
	}


	handleSnackbarClose(){
		this.setState({
			snackbar: {
                ...this.state.snackbar,
            	open: false
			}
		})
	}

	changeSnackbarState(open, variant, message){
		this.setState({
			snackbar: {
				open: open,
				variant: variant,
				message: message
			}
		})
	}

  	render() {
		  const { currentCreneau, newSignature, loading, snackbar, saving } = this.state
		const {classes} = this.props
		return(
			<React.Fragment>
				{loading ? (
					<Grid
						container
						className={classes.loader}
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item>
							<CircularProgress className={classes.progress} />
						</Grid>
					</Grid>
				):(
					<div className="basic_container">
						<Typography variant="h4" className={classes.title}>
							Charte du permanencier
						</Typography>
						{currentCreneau.perm?(
							<React.Fragment>
								<Typography variant="body1" className={classes.text}>
									Ce document est valable pour toute la durée du semestre en cours et sera susceptible d’être utilisé comme justificatif de
									responsabilité de l’étudiant en cas de dégradation ou de comportement inapproprié lors d’une de ses permanences dans le
									foyer étudiant.<br/><br/>
									Je soussigné
								</Typography>
								<TextField
										required
										onChange={this.handleChange}
										id='name'
										placeholder='Prénom / Nom'
										name="nom"
										className={classes.textField}
										value={newSignature.nom}
								/>
								<Typography variant="body1" className={classes.text}>
									membre de l’association / membre du groupe, <strong>{currentCreneau.perm.nom}</strong> engage ma
									personne et le reste de mon équipe à respecter les règles suivantes lors de toutes les permanences
									tenues au Pic’asso durant le semestre. Respecter les décisions de l’équipe d’astreinte. Notamment en ce qui
									concerne les horaires de fermeture, le volume sonore et l’utilisation de la licence de cercle privé. Respecter le
									matériel mis à disposition des permanenciers. Respecter les étudiants présents dans l’enceinte du foyer.
									Payer mes consommations pendant mes permanences. En effet, les permanences sont tenues bénévolement.
									Leur but est d’assurer un service aux étudiants et non de permettre à ceux qui les tiennent d’en tirer des avantages.
									Ne pas servir une personne qui a trop bu et prévenir l’astreinteur si l’état de la personne nécessite
									l’intervention de personnel qualifié. Distribuer des éthylotests aux conducteurs le demandant. Ceux-ci
									seront à disposition derrière le bar durant les heures de services d’alcool (18h30 à 21h30).
									Rester sobre car nous vous rappelons que vous êtes responsable du bon déroulement de la permanence.
									Effectuer les tâches ménagères de manière correcte en suivant les consignes des astreinteurs.
									La caution est un chèque de 200€ à l’ordre du BDE UTC Pic’asso par groupe de permanence, que ce soit
									groupe d’amis ou association. Le non-respect d’une des règles citées ci-dessus pourra entraîner l’encaissement
									de la caution, totale ou partielle selon la gravité du problème.<br/><br/>
								</Typography>

								{this.displayDate()}
								<TextField
									required
									onChange={this.handleChange}
									id='login'
									placeholder="Login"
									name="login"
									className={classes.textField}
									value={newSignature.login}
								/>
								{saving? (
									<CircularProgress className={classes.progress} />
								):(
									<Button variant="contained" color="primary" onClick={this.saveSignature}>
										Valider
									</Button>
								)}

							</React.Fragment>
						):(
							<Typography variant="body1">
								Pas de perm en cours ...
							</Typography>
						)}

					</div>
				)}
			<SnackbarComponent
				open={snackbar.open}
				variant={snackbar.variant}
				message={snackbar.message}
				closeSnackbar={
					()=>{
						this.setState({
							snackbar: {
								...this.state.snackbar,
								open: false,
							}
						})
					}
				}
			/>

			</React.Fragment>
		)
  	}
}

const styles = theme => ({
	container: {
		textAlign: 'justify',
		padding: 20,
		margin: 30,
		border: "1.5px solid var(--color-primary)",
	},
	title : {
		textAlign: 'center',
		textDecoration : 'underline var(--color-primary)',
		marginBottom: 30,
	},
	textField: {
		paddingLeft: 10,
		paddingRight: 10,
		color: 'red',
		display: 'inline-block',
		verticalAlign: 'text-bottom',
	},
	text : {
		display: 'inline',
	},
	loader: {
        marginTop: 200,
    },
})

Charte.propTypes = {
 	classes: PropTypes.object.isRequired
}

export default withStyles (styles) (Charte)
