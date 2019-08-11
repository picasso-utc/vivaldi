import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Input from "@material-ui/core/Input"
import { withStyles } from '@material-ui/core/styles'
import SideTab from './SideTab'

class Notation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      astr: ["","","",""],
      nom: "",
      nbAstr: 2,
      periode: "midi",
      contenuMenu: "",
      qualiteMenu: "passable",
      deco: "rien",
      ambiance: "mou",
      menage: "propre",
      respect: "gentil"
    }
  }

  buildNote() {
    const perm = {
      nom: this.state.nom,
      astreinteurs: this.state.astr,
      repas: {
        qualiteMenu: this.state.qualiteMenu,
        contenuMenu: this.state.contenuMenu
      },
      respect: this.state.respect
    }
    console.log(perm)
  }

  handleChange = name => event => {
    console.log(name)
    this.setState({[name]: event.target.value})
    this.buildNote()
  }

  handleChangeAstr= i => event => {
    let a = this.state.astr.slice()
    a[i] = event.target.value
    this.setState({astr: a})
    this.buildNote()
    //this.setState({astr[i]: event.target.value})
  }

  nbAstrForm() {
    const {classes} = this.props
    let astreinteurs = []
    for(let i=0;i<this.state.nbAstr;i++) {
      astreinteurs.push(
        <TextField className={classes.textField}
          key={i}
          id="astr[0]"
          label="Login astreinteur"
          value={this.state.astr[i]}
          onChange={this.handleChangeAstr(i)}
          variant="outlined"
          InputProps={{className: classes.input}}
        />
      )
    }
    return(astreinteurs)
  }

  journee() {
    const {classes} = this.props
    if(this.state.periode!=="matin") {
      return(
        <div className={classes.journee}>
          <TextField
            id="nom"
            label="Contenu du menu"
            value={this.state.contenuMenu}
            onChange={this.handleChange('contenuMenu')}
            className={classes.textField}
            variant="outlined"
            InputProps={{classes: {notchedOutline: classes.notchedOutline}, className: classes.input}}
          />
          <FormControl className={classes.select}>
            <InputLabel>Qualité du menu</InputLabel>
            <Select
              value={this.state.qualiteMenu}
              onChange={this.handleChange("qualiteMenu")}>
                <MenuItem value="burk">Buuuuurk</MenuItem>
                <MenuItem value="passable">Passable</MenuItem>
                <MenuItem value="bon">Bon</MenuItem>
                <MenuItem value="miam">Miam miam !</MenuItem>
            </Select>
          </FormControl>
        </div>
      )
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <SideTab/>
        <form className={classes.form}>
          <div className={classes.astreinte}>
            <FormControl className={classes.select} variant="outlined">
              <InputLabel>Nombre d'astreinteur</InputLabel>
              <Select
                value={this.state.nbAstr}
                onChange={this.handleChange("nbAstr")}
                input={
                  <Input variant="outlined"/>
                }
                inputProps={{classes: {icon: classes.icon}, className: classes.input}}
                MenuProps={{classes: {paper: classes.dropdownStyle}}}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.astreinteur}>
              {this.nbAstrForm()}
            </div>
          </div>
          <div className={classes.perm}>
          <TextField
            classNAme={classes.textField}
            id="nom"
            label="Nom de la Perm"
            value={this.state.nom}
            onChange={this.handleChange('nom')}
            variant="outlined"
            InputProps={{classes: {notchedOutline: classes.notchedOutline}, className: classes.input}}
          />
          <FormControl className={classes.select}>
            <InputLabel>Periode</InputLabel>
            <Select
              value={this.state.periode}
              onChange={this.handleChange("periode")}>
                <MenuItem value="matin">Matin</MenuItem>
                <MenuItem value="midi">Midi</MenuItem>
                <MenuItem value="soir">Soir</MenuItem>
            </Select>
          </FormControl>
          </div>
          {this.journee()}
          <div className={classes.note}>
          <FormControl className={classes.select}>
            <InputLabel>Decoration</InputLabel>
            <Select
              value={this.state.deco}
              onChange={this.handleChange("deco")}>
                <MenuItem value="rien">y a R</MenuItem>
                <MenuItem value="moche">pas bo</MenuItem>
                <MenuItem value="joli">c zoli</MenuItem>
                <MenuItem value="wagou">wagou c cro bo</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.select}>
            <InputLabel>Ambiance</InputLabel>
            <Select
              value={this.state.ambiance}
              onChange={this.handleChange("ambiance")}>
                <MenuItem value="naze">naaaaze</MenuItem>
                <MenuItem value="mou">tout mou</MenuItem>
                <MenuItem value="sympa">sympatoche</MenuItem>
                <MenuItem value="feu">le pic on fire</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.select}>
            <InputLabel>Menage</InputLabel>
            <Select
              value={this.state.menage}
              onChange={this.handleChange("menage")}>
                <MenuItem value="immonde">Degueuu</MenuItem>
                <MenuItem value="sale">ça colle encore</MenuItem>
                <MenuItem value="propre">ça sent bon</MenuItem>
                <MenuItem value="brillant">tout qui brille</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.select}>
            <InputLabel>Respect</InputLabel>
            <Select
              value={this.state.respect}
              onChange={this.handleChange("respect")}>
                <MenuItem value="bloque">hop c'est bloqué</MenuItem>
                <MenuItem value="delinquant">racaille des bacs à sable</MenuItem>
                <MenuItem value="gentil">ils sont mignons</MenuItem>
                <MenuItem value="parfait">élève modèle</MenuItem>
            </Select>
          </FormControl>
          </div>
        </form>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display:'flex',
    height: 750,
    backgroundColor: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',

  },
  astreinte: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  astreinteur: {
    display: 'flex',
    flexDirection: 'column'
  },
  perm: {
    display:'flex'
  },
  journee: {
    display:'flex'
  },
  note: {
    display: 'flex'
  },
  formGroup: {
    minWidth: 120
  },
  textField: {
    width: 200,
    marginLeft: 50,
    marginTop: 20,
    borderWidth: "1px",
    borderColor: 'red',
  },
  input: {
    color: 'red',
  },
  notchedOutline: {
    borderColor: 'blue !important',
  },
  select: {
    marginLeft: 50,
    marginTop: 20,
  },
  dropdownStyle: {
    border: '1px solid blue',
    borderRadius: '10%',
  },
  icon: {
    fill: 'red'
  },
})

Notation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles (styles) (Notation)
