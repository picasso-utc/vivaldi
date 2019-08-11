import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

class Charte extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nom: '',
      perm: '',
      date: '',
      login: ''
    }
  }

  dispDate() {
    let date = new Date()
    return(
      <p>Fait le {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} à Compiègne</p>
    )
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  submit() {
    const signature = {
      nom: this.state.nom,
      perm: this.state.perm,
      date: this.state.date,
      login: this.state.login
    }
    axios.post("http://localhost:8000/api/signatures/", signature)
    this.setState({nom:"",  perm:"", date:"", login:""})
  }

  render() {
    const {classes} = this.props
    return(
      <div className={classes.container}>
        <form>
        <h1>Charte du permanencier</h1>
        <h3>Important</h3>
        <p>Ce document est valable pour toute la durée du semestre en cours et sera susceptible d’être utilisé comme justificatif de responsabilité de l’étudiant en cas de dégradation ou de comportement inapproprié lors d’une de ses permanences dans le foyer étudiant. Je soussigné
          <TextField
            required
            onChange={this.handleChange('nom')}
            id='name'
            placeholder='Nom / prénom'
            className={classes.textField}
            value={this.state.nom}
            InputProps={{className: classes.input}}/>
          membre de l’association / membre du groupe
          <TextField
            required
            id='perm'
            onChange={this.handleChange('perm')}
            placeholder='Nom de la perm'
            className={classes.textField}
            value={this.state.perm}
            InputProps={{className: classes.input}}/>
          , engage ma personne et le reste de mon équipe à respecter les règles suivantes lors de toutes les permanences tenues au Pic’asso durant le semestre.
          Respecter les décisions de l’équipe d’astreinte. Notamment en ce qui concerne les horaires de fermeture, le volume sonore et l’utilisation de la licence de cercle privé.
          Respecter le matériel mis à disposition des permanenciers.
          Respecter les étudiants présents dans l’enceinte du foyer.
          Payer mes consommations pendant mes permanences. En effet, les permanences sont tenues bénévolement. Leur but est d’assurer un service aux étudiants et non de permettre à ceux qui les tiennent d’en tirer des avantages.
          Ne pas servir une personne qui a trop bu et prévenir l’astreinteur si l’état de la personne nécessite l’intervention de personnel qualifié.
          Distribuer des éthylotests aux conducteurs le demandant. Ceux-ci seront à disposition derrière le bar durant les heures de services d’alcool (18h30 à 21h30).
          Rester sobre car nous vous rappelons que vous êtes responsable du bon déroulement de la permanence.
          Effectuer les tâches ménagères de manière correcte en suivant les consignes des astreinteurs.
          La caution est un chèque de 200€ à l’ordre du BDE UTC Pic’asso par groupe de permanence, que ce soit groupe d’amis ou association.
          Le non-respect d’une des règles citées ci-dessus pourra entraîner l’encaissement de la caution, totale ou partielle selon la gravité du problème.
        </p>
        <p>Date de la permanence du soir :
        <TextField
          required
          id='date'
          type='date'
          onChange={this.handleChange('date')}
          placeholder='Nom de la perm'
          className={classes.textField}
          value={this.state.date}
          InputProps={{className: classes.input}}/>
        </p>
        {this.dispDate()}
        <TextField
          required
          onChange={this.handleChange('login')}
          id='login'
          placeholder="Login"
          className={classes.textField}
          value={this.state.login}
          InputProps={{className: classes.input}}/>
        <Button variant="contained" className={classes.button} onClick={() => this.submit()}>
          Valider
        </Button>
      </form>
      </div>

    )
  }
}

const styles = theme => ({
  container: {
    padding: 50,
    textAlign: 'justify'
  },
  textField: {
    paddingLeft: 10,
    paddingRight: 10,
    color: 'red'
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    color: 'red'
  }
})

Charte.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles (styles) (Charte)
