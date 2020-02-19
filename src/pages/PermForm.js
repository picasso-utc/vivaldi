import React from 'react'
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { ajaxGet, ajaxPost, ajaxPut } from '../utils/Ajax';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import Auth from '../utils/Auth';
import Paper from '@material-ui/core/Paper';
import {isStringEmpty} from '../utils/String';
import SnackbarComponent from '../utils/SnackbarComponent';


class PermForm extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            assos : [],
            autocomplete_users: [],
            loading: true,
            new_perm : {
                type: "friend",
                nom : "",
                asso_login: "",
                mail_asso : "",
                ambiance: 3,
                description: "",
                theme: "",
                nom_resp : "",
                mail_resp: "",
                nom_resp_2 : "",
                mail_resp_2: "",
                membres: "",
                periode : "",
                founder_login: ""
            },
            errors: [],
            saving: false,
            mode : "create",
            saved: false,
            snackbar: {
				open: false,
			},
        }
	}

	
	componentDidMount(){
        this.checkPermFormAvaibility();
        this.authUser();
    }


    checkPermFormAvaibility(){
        ajaxGet('perms/public/may/request').then(res => {
			if (res.data.perm_may_be_requested) {
                this.loadAssos();
            } else {
                window.location.href = "/"
            }
		}).catch(error => {
            this.openSnackbar();
		})
    }


    authUser(){
        const user = Auth.getUserInformation();
        this.setState({
            new_perm: {
                ...this.state.new_perm,
                nom_resp : user.first_name + " " + user.last_name,
                mail_resp: user.email,
                founder_login: user.login,
            }
        })
    }
    
    loadAssos(){
        ajaxGet('perms/assos').then(res => {
            let assos = res.data.assos;
            assos = assos.sort(function(a,b){
                if (a.shortname > b.shortname) {
                    return 1
                }
                return -1
            })
            this.setState({assos: assos})
            this.isFormExisting()
        }).catch(error => {
            this.openSnackbar();
        })
    }

    isFormExisting(){
        const query = new URLSearchParams(this.props.location.search);
        const form_id = query.get('form_id');
        if(form_id){
            ajaxGet('request/perm/' + form_id + "/").then(res => {
                let perm = res.data.perm;
                if (perm.asso) {
                    perm.type = "asso";
                    perm.asso_login = perm.mail_asso.split("@")[0]
                } else {
                    perm.type = "friend";
                }
                this.setState({new_perm: perm, loading: false, mode: "edit"})
            })
            .catch(error => {
                window.location.href = "/perm/form"
            })
        } else {
            this.setState({loading: false})
        }
    }

    handleNewPermChange(event){
        if (event.target.name == "membres" && event.target.value.length > 250) {return;} 
        else if (event.target.name == "theme" && event.target.value.length > 250) {return;}
        else if (event.target.name == "periode" && event.target.value.length > 250) {return;}
        else if (event.target.name == "nom" && event.target.value.length > 250) {return;}
        else if (event.target.name == "description" && event.target.value.length > 1000){return;}
        this.setState({
            new_perm: {
                ...this.state.new_perm,
                [event.target.name] : event.target.value
            }
        })
    }


    handleSliderChange(event, value){
        this.setState({
            new_perm: {
                ...this.state.new_perm,
                'ambiance' : value
            }
        })
    }

    handleAssoChange(event){
        const assos = this.state.assos;
        const results = assos.filter(a => a.login === event.target.value);
        if (results.length > 0) {
            this.setState({
                new_perm: {
                    ...this.state.new_perm,
                    [event.target.name] : event.target.value
                }
            })
        }
    }

    handleResp2Change(user){
        const data = user.split('-')
        const nom_resp_2 = data[0].split('(')[0]
        const mail_resp_2 = data[1]
        this.setState({
            new_perm: {
                ...this.state.new_perm,
                nom_resp_2: nom_resp_2,
                mail_resp_2: mail_resp_2
            },
            autocomplete_users: []
        })
    }

    handleAutocompleteChange(event){
        this.setState({
            new_perm: {
                ...this.state.new_perm,
                nom_resp_2: event.target.value
            }
        })
        if (event.target.value){
            this.autoCompleteQuery(event.target.value)
        } else {
            this.setState({autocomplete_users: []})
        }
    }

    openSnackbar(){
		this.setState({
			snackbar: {
				open: true,
			}
		})
	}

    autoCompleteQuery(query){
        ajaxGet('payutc/user/autocomplete/' + query).then(res => {
            this.setState({autocomplete_users: res.data.users});
        })
        .catch(error => {

        })
    }


    saveRequestedPerm(){
        
        this.setState({saving: true});

        if(this.isFormValid()){

            let new_perm = this.state.new_perm;
            if (new_perm.type === "friend") {
                new_perm.asso = false
            } else {
                new_perm.asso = true;
                new_perm.mail_asso = new_perm.asso_login + "@assos.utc.fr";
            }

            if (this.state.mode === "create") {
                ajaxPost('request/perm/', new_perm).then(res => {
                    new_perm.id = res.data.id;
                    this.setState({saving: false, saved: true, new_perm: new_perm, mode: "edit"});
                }).catch(error => {
                    this.openSnackbar();
                    this.setState({saving: false});
                })
            } else {
                ajaxPut('request/perm/' + new_perm.id + '/', new_perm).then(res => {
                    this.setState({saving: false, saved: true});
                })
                .catch(error => {
                    this.openSnackbar();
                    this.setState({saving: false});
                })
            }        
        } else {
            this.setState({saving: false});
        }
    }


    isFormValid(){
        const new_perm = this.state.new_perm;
        let errors = [];
        if (new_perm.type === "asso" && isStringEmpty(new_perm.asso_login)){
            errors.push("Vous devez préciser l'association.")
        }
        if (isStringEmpty(new_perm.nom)){
            errors.push("Le nom de la perm est requis.")
        }
        if(isStringEmpty(new_perm.description)){
            errors.push('La description de la perm est requise.')
        }
        if(isStringEmpty(new_perm.periode)){
            errors.push('La période la perm n\'a pas été renseignée.')
        }
        if(isStringEmpty(new_perm.nom_resp_2)){
            errors.push('Il faut un deuxième responsable de perm.')
        }
        if (isStringEmpty(new_perm.membres)) {
            errors.push('Aucun permanencier n\'a été rentré.')
        }
        this.setState({errors: errors})
        if (errors.length > 0) { 
            return false;
        }
        return true;
    }


    backToForm(){
        this.setState({saved: false})
    }

    newForm(){
        this.setState({
            new_perm : {
                type: "friend",
                nom : "",
                asso_login: "",
                mail_asso : "",
                ambiance: 3,
                description: "",
                theme: "",
                nom_resp : "",
                mail_resp: "",
                nom_resp_2 : "",
                mail_resp_2: "",
                membres: "",
                periode : "",
                founder_login: ""
            },
            mode: "create",
            saved: false
        })
    }


	render() {

        const { loading, assos, new_perm, autocomplete_users, errors, saving, saved, mode, snackbar } = this.state;
        const { classes } = this.props;

		return (
			<React.Fragment>
				<CssBaseline />

                {loading?(
					<Grid 
						container 
						className={classes.loader}
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item>
							<CircularProgress  className={classes.progress} color="secondary"/>
						</Grid>
					</Grid>
				):(
				
                    <Container className={classes.root}>
                        <Link to="/" color="inherit" className={classes.exit_link}>
                            <Button
                                variant="contained"
                                size="small"
                                margin="dense"
                                className={classes.exit_btn}
                            >
                                <ExitToAppIcon className={classes.exit_icon}/> Retour à l'accueil
                            </Button>
						</Link>
                        <Container className={classes.container}>
                            <fieldset className={classes.component} style={{minWidth: 1}}>
                                <legend className={classes.legend}>Demande de permanence</legend>
                                
                                {saved ? (
                                    <React.Fragment>
                                        <Grid container direction="row" justify="center" alignItems="center">
                                            <Typography variant="h6" className={classes.perm_title}>
                                                Demande enregitrée avec succès !
                                            </Typography>
                                        </Grid>
                                        <Grid 
                                            container 
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Button 
                                                variant="contained" 
                                                className={classes.btn}
                                                onClick={() => this.backToForm()}
                                            >
                                                Revenir au formulaire
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                className={classes.btn}
                                                onClick={() => this.newForm()}
                                            >
                                                Nouveau
                                            </Button>
                                        </Grid> 
                                    </React.Fragment> 
                                ): (

                                    <div style={{overflowY: 'auto', padding: 5, marginTop: -20}}>

                                        <Grid container direction="row" justify="center" alignItems="center">
                                            <Typography variant="h6" className={classes.perm_title}>
                                                Organisateur
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <RadioGroup 
                                                style={{display:'inline-block', textAlign: 'left'}} 
                                                value={new_perm.type} 
                                                name="type"
                                                onChange={(event) => this.handleNewPermChange(event)}
                                            >
                                                <FormControlLabel 
                                                    value="friend" 
                                                    labelPlacement="start"
                                                    label="Groupe de potes" 
                                                    control={
                                                        <Radio 
                                                            color="primary" 
                                                            icon={
                                                                <RadioButtonUncheckedIcon 
                                                                    fontSize="small" 
                                                                    style={{color:'white'}}
                                                                />
                                                            }
                                                        />
                                                    } 
                                                />
                                                <FormControlLabel 
                                                    value="asso" 
                                                    labelPlacement="start"
                                                    control={
                                                        <Radio 
                                                            color="primary" 
                                                            icon={
                                                                <RadioButtonUncheckedIcon 
                                                                    fontSize="small" 
                                                                    style={{color:'white'}}
                                                                />
                                                            }
                                                        />
                                                    } 
                                                    label="Associations UTC" 
                                                />
                                            </RadioGroup>
                                            <Grid container direction="row">
                                                <Grid container item xs={12} sm={6} lg={4}>
                                                    <TextField 
                                                        label="Nom" 
                                                        variant="filled" 
                                                        value={new_perm.nom}
                                                        name="nom"
                                                        onChange={(event) => this.handleNewPermChange(event)}
                                                        className={classes.perm_input}
                                                        size="small"
                                                        margin="dense"
                                                        fullWidth
                                                        InputProps={{style: {
                                                            backgroundColor: 'white',
                                                            borderRadius: 4
                                                        }}}
                                                    />
                                                </Grid>
                                            </Grid>
                                            {new_perm.type === "asso" && 
                                                <Grid container direction="row">
                                                    <Grid container item xs={12} sm={6} lg={4}>
                                                        <TextField
                                                            select
                                                            label="Association"
                                                            value={new_perm.asso_login}
                                                            onChange={(event) => this.handleAssoChange(event)}
                                                            variant="filled"
                                                            name="asso_login"
                                                            className={classes.perm_input}
                                                            size="small"
                                                            margin="dense"
                                                            fullWidth
                                                            InputProps={{style: {
                                                                backgroundColor: 'white',
                                                                borderRadius: 4
                                                            }}}
                                                        >
                                                            {assos.map(asso => (
                                                                <MenuItem key={asso.login} value={asso.login}>
                                                                    {asso.shortname}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                            }
                                            <Typography variant="body1" style={{fontSize: 12}} className={classes.perm_input}>
                                                ** Note : Si la perm recoupe plusieurs associations une seule doit être designée comme responsable ici.
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row" justify="center" alignItems="center">
                                            <Typography variant="h6" className={classes.perm_title}>
                                                Perm
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Typography variant="body1" className={classes.perm_label}>
                                                Thème de la perm : 
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Grid container item xs={12} sm={6} lg={4}>
                                                <TextField 
                                                    label="Thème" 
                                                    variant="filled" 
                                                    name="theme"
                                                    value={new_perm.theme}
                                                    onChange={(event) => this.handleNewPermChange(event)}
                                                    className={classes.perm_input}
                                                    size="small"
                                                    margin="dense"
                                                    fullWidth
                                                    InputProps={{style: {
                                                        backgroundColor: 'white',
                                                        borderRadius: 4
                                                    }}}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Typography variant="body1" className={classes.perm_label}>
                                                Description de la perm (anim, repas, etc ...) 
                                                <span className={classes.form_field_length}>{new_perm.description.length}/1000 caractères max</span>
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Grid container item xs={12}>
                                                <TextField 
                                                    label="Description" 
                                                    variant="filled" 
                                                    value={new_perm.description}
                                                    name="description"
                                                    onChange={(event) => this.handleNewPermChange(event)}
                                                    className={classes.perm_input}
                                                    size="small"
                                                    margin="dense"
                                                    fullWidth
                                                    rowsMax="6"
                                                    rows="4"
                                                    multiline
                                                    InputProps={{style: {
                                                        backgroundColor: 'white',
                                                        borderRadius: 4
                                                    }}}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Typography variant="body1" className={classes.perm_label}>
                                                Lourdeur de la perm (de posé à giga fat): 
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Grid container item xs={12} sm={6} lg={4}>
                                                <Slider
                                                    name="ambiance"
                                                    value={new_perm.ambiance}
                                                    onChange={(event, value) => this.handleSliderChange(event, value)}
                                                    step={1}
                                                    valueLabelDisplay="on"
                                                    min={1}
                                                    max={5}
                                                    className={classes.slider_input}
                                                />
                                            </Grid>
                                        </Grid> 
                                        <Grid container direction="row">
                                            <Typography variant="body1" className={classes.perm_label}>
                                                Période privilégiée dans le semestre 
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Grid container item xs={12} sm={6} lg={4}>
                                                <TextField 
                                                    label="Période" 
                                                    variant="filled" 
                                                    name="periode"
                                                    value={new_perm.periode}
                                                    onChange={(event) => this.handleNewPermChange(event)}
                                                    className={classes.perm_input}
                                                    size="small"
                                                    margin="dense"
                                                    fullWidth
                                                    InputProps={{style: {
                                                        backgroundColor: 'white',
                                                        borderRadius: 4
                                                    }}}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" justify="center" alignItems="center">
                                            <Typography variant="h6" className={classes.perm_title}>
                                                Responsables
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Typography variant="body1" className={classes.perm_label}>
                                                Responsable 1 : {new_perm.nom_resp} 
                                            </Typography>
                                        </Grid>

                                        <Grid container direction="row">
                                            <Typography variant="body1" className={classes.perm_label}>
                                                Responsable 2 : 
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Grid container item xs={12} sm={6} lg={4}>
                                                <TextField
                                                    variant="filled" 
                                                    size="small"
                                                    margin="dense"
                                                    fullWidth
                                                    label="Nom de l'étudiant"
                                                    value={new_perm.nom_resp_2}
                                                    onChange={(event) => this.handleAutocompleteChange(event)}
                                                    autoComplete="off"
                                                    InputProps={{style: {
                                                        backgroundColor: 'white',
                                                        borderRadius: 4
                                                    }}}
                                                />
                                                <Paper className={classes.suggestions}>
                                                    {autocomplete_users.map((suggestion, index)=> (
                                                        <MenuItem
                                                            className={classes.suggestionItem}
                                                            key={index}
                                                            component="div"
                                                            onClick={()=>this.handleResp2Change(suggestion.name)}
                                                        >
                                                            {suggestion.name.split('-')[0]}
                                                        </MenuItem>
                                                    ))}
                                                    
                                                </Paper>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row" justify="center" alignItems="center">
                                            <Typography variant="h6" className={classes.perm_title}>
                                                Permanenciers
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Typography variant="body1" className={classes.perm_label}>
                                                Noms et prénoms des permanenciers (au minimum 10) 
                                                <span className={classes.form_field_length}>{new_perm.membres.length}/250 caractères max</span>
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Grid container item xs={12}>
                                                <TextField 
                                                    variant="filled" 
                                                    value={new_perm.membres}
                                                    name="membres"
                                                    onChange={(event) => this.handleNewPermChange(event)}
                                                    className={classes.perm_input}
                                                    size="small"
                                                    margin="dense"
                                                    fullWidth
                                                    rowsMax="20"
                                                    rows="10"
                                                    multiline
                                                    InputProps={{style: {
                                                        backgroundColor: 'white',
                                                        borderRadius: 4
                                                    }}}
                                                />
                                            </Grid>
                                        </Grid>
                                        {errors.length > 0 &&
                                            <Grid container direction="row" justify="center" alignItems="center">
                                                <Paper className="errors_paper">
                                                    <Typography variant="h6">
                                                    Erreurs lors de l'insertion
                                                    </Typography>
                                                    <ul>
                                                        {errors.map((error, index)=> (
                                                            <li key={index}>{error}</li>
                                                        ))}
                                                    </ul>
                                                </Paper>
                                            </Grid>
                                        }
                                        <Grid 
                                            container 
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Button 
                                                variant="contained" 
                                                className={classes.btn}
                                                disabled={saving}
                                                onClick={() => this.saveRequestedPerm()}
                                            >
                                                {mode === "edit" ? (<span>Editer</span>) : (<span>Envoyer</span>)}
                                            </Button>
                                        </Grid>  
                                    </div>
                                )}
                            </fieldset>   
                        </Container>

				    </Container>
                )}
                <SnackbarComponent 
                    open={snackbar.open} 
                    variant="error" 
                    message="Une erreur est survenue. Si cette dernière se reproduit, contacte directement le Pic !"
					duration={10000}
					horizontal='right'
					vertical='top'
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
		);
	}
}

const styles = theme => ({
	root: {
        width:'100%',
        minHeight: '100vh',
		maxWidth: '100%',
		margin: 0,
		paddingRight: '5%',
        paddingLeft: '5%',
        paddingTop: 10,
		paddingBottom: 50,
		backgroundColor: '#000223',
        color: 'white',
        height: '100%',
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
	},
	component: {
        padding: '5%',
        paddingBottom: 20,
		border: "#B22132 1.5px solid",
		textAlign: 'center',
	},
	legend : {
		fontSize: 34,
		padding: 15,
    },
    loader: {
        marginTop: 200,
    },
    perm_title : {
        maxWidth: 500,
        overflowWrap : 'break-word',
        marginBottom: 20,
        fontWeight: 400,
        textDecoration: 'underline'
    },
    radio_btn : {
        icon : {
            color: 'white'
        }
    },
    perm_label : {
        textAlign: 'left'
    },
    perm_input : {
        marginBottom: 20
    },
    slider_input : {
        width: '90%',
        marginBottom: 30,
        marginTop: 40
    },
    exit_link : {
        textDecoration: 'none',
    },
    exit_btn : {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 400,
        textTransform: 'none',
    },
    exit_icon : {
        marginRight: 5,
    },
    btn : {
        margin: 10
    },
    add_item : {
        marginLeft: 10,
    },
    suggestions: {
        zIndex: 100,
        maxHeight: 200,
        overflowY: 'scroll',
        marginBottom: 30
    },
    suggestionItem: {
        paddingLeft: 15,
        paddingBottom: 0,
        paddingTop: 0,
        fontSize: 14,
        minHeight: 30,
    },
    form_field_length:{
        fontWeight: 200,
        fontSize: 12,
        marginLeft: 10
    }
});

export default withStyles(styles)(PermForm)
