import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import { ajaxGet, ajaxPost } from '../../../utils/Ajax';

class Settings extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            settings : {
                GINGER_URL : '', 
                GINGER_KEY : '',  
                PAYUTC_CONNECTION_UID : '', 
                PAYUTC_CONNECTION_PIN: '', 
                PAYUTC_APP_KEY: '', 
                PAYUTC_APP_URL: '', 
                SEMESTER: ''
            },
            user : {
                login : ''
            },
            autoCompleteUsers: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSetting = this.handleChangeSetting.bind(this);
        this.loadSettings = this.loadSettings.bind(this);
        this.autoCompleteQuery = this.autoCompleteQuery.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.updateBadge = this.updateBadge.bind(this);
    }


    componentDidMount(){
        this.loadSettings();
    }

    updateBadge(name){
        const login = name.match(/\(.*\)/).toString()
        const query = login.substring(1,9)
        ajaxGet('core/user?login='+query).then(res => {
            const new_user = {
                login : '',
            }
            this.setState({
                settings: {
                    ...this.state.settings,
                    PAYUTC_CONNECTION_UID : res.data.badge_uid,
                    PAYUTC_CONNECTION_PIN :  res.data.badge_pin
                }
            })
            this.setState({user : new_user, autoCompleteUsers:[]})

        })

    }

    saveSettings(){
        ajaxPost('admin/settings', {settings: this.state.settings}).then(res => {
    
        })
        .catch(error=>{
            console.log(error)
        })
    }


    handleChange(event){
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
        if (event.target.name === 'login' && event.target.value) {
            this.autoCompleteQuery(event.target.value)
        }
    }

    handleChangeSetting(event){
        this.setState({
            settings: {
                ...this.state.settings,
                [event.target.name]: event.target.value
            }
        })
    }


    // Méthode pour obtenir de Payutc des auto complétions
    // via la valeur entrée
    autoCompleteQuery(query){
        ajaxGet('payutc/user/autocomplete/' + query).then(res => {
            this.setState({autoCompleteUsers: res.data.users});
        })
        .catch(error => {
            console.log(error)
        })
    }

    loadSettings(){

        ajaxGet('admin/settings', this.state.settings).then(res => {
            console.log(res.data.settings)
            const new_user = {
                login : '',
                badge : res.data.settings.PAYUTC_CONNECTION_UID,
                pin : res.data.settings.PAYUTC_CONNECTION_PIN
            }
            this.setState({settings:res.data.settings, user : new_user}) 
        })
        .catch(res => {
            console.log(res)  
        })
 
    }




 

    render(){
        
        const { classes } = this.props;

        const {settings, autoCompleteUsers, user} = this.state;

        return (
            <div className={classes.container}>
                <Grid container className={classes.section}>
                    <Typography variant="h5" noWrap className={classes.subTitle}>
                        <ChevronRightIcon className={classes.subTitleIcon}/>
                        Badge PayUTC
                    </Typography>
                    <Grid container className={classes.note}>
                        Ce badge permet de définir avec quels identifiants la connexion à PayUTC est réalisée. <br/><br/>
                        Bien que cette méthode de connexion à PayUTC pour le serveur aie une configuration contraignante (il faut, pour se connecter, l'identifiant du badge et le PIN, à la façon d'une connexion sur les caisses), c'est celle qui une fois installée permet le fonctionnement le plus rapide du logiciel.
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                label="Chercher un utilisateur ..."
                                className={classes.textField}
                                name="login"
                                value={user.login|| ''}
                                onChange={this.handleChange}
                                autoComplete="off"
                                margin="dense"
                                variant="outlined"
                            />
                            <Paper className={classes.suggestions}>
                                {autoCompleteUsers.map((suggestion, index)=> (
                                    <MenuItem
                                        className={classes.suggestionItem}
                                        key={index}
                                        component="div"
                                        onClick={()=>this.updateBadge(suggestion.name.split('-')[0])}
                                        
                                    >
                                        {suggestion.name.split('-')[0]}
                                    </MenuItem>
                                ))}     
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Badge de connexion (UID)"
                                className={classes.textField}
                                name="PAYUTC_CONNECTION_UID"
                                value={settings.PAYUTC_CONNECTION_UID|| ''}
                                onChange={this.handleChangeSetting}
                                autoComplete="off"
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Code PIN de l'utilisateur"
                                className={classes.textField}
                                name="PAYUTC_CONNECTION_PIN"
                                value={settings.PAYUTC_CONNECTION_PIN|| ''}
                                onChange={this.handleChangeSetting}
                                autoComplete="off"
                                margin="dense"
                                variant="outlined"
                                type="password"
                            />
                            
                        </Grid>
                    </Grid>
                    
                </Grid>

                <Grid container className={classes.section}>
                    <Typography variant="h5" noWrap className={classes.subTitle}>
                        <ChevronRightIcon className={classes.subTitleIcon}/>
                        API Ginger
                    </Typography>
                    <Grid container className={classes.note}>
                        Ces paramètres permettent de définir d'où les informations sur les utilisateurs sont récupérées.
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="URL de l'API"
                                className={classes.textField}
                                name="GINGER_URL"
                                value={settings.GINGER_URL}
                                onChange={this.handleChangeSetting}
                                autoComplete="off"
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Clé de connexion"
                                className={classes.textField}
                                name="GINGER_KEY"
                                value={settings.GINGER_KEY}
                                onChange={this.handleChangeSetting}
                                autoComplete="off"
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>              
                    </Grid>
                </Grid>

                <Grid container className={classes.section}>
                    <Typography variant="h5" noWrap className={classes.subTitle}>
                        <ChevronRightIcon className={classes.subTitleIcon}/>
                        API PayUTC
                    </Typography>
                    <Grid container className={classes.note}>
                        Ces paramètres permettent de définir la connexion au serveur PayUTC.
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="URL de l'API"
                                className={classes.textField}
                                name="PAYUTC_APP_URL"
                                value={settings.PAYUTC_APP_URL}
                                onChange={this.handleChangeSetting}
                                autoComplete="off"
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Clé de connexion"
                                className={classes.textField}
                                name="PAYUTC_APP_KEY"
                                value={settings.PAYUTC_APP_KEY}
                                onChange={this.handleChangeSetting}
                                autoComplete="off"
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>              
                    </Grid>
                </Grid>

                
                <Button variant="outlined" color="primary" className={classes.addButton} onClick={this.saveSettings}> 
                    Sauvegarder
                </Button>
            
                
                
            </div>
        );
    };

}

const styles = theme => ({
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: "2px solid #B22132",
    },
    section:{
        paddingBottom :70,
    },
    paper: {
        padding: 10
    },
    note: {
        backgroundColor: 'rgba(0,0,0, 0.05)',
        padding: 10,
        border: 'thin solid grey',
        marginTop: 16,
        marginBottom: 8,
    },
    textField: {
        marginTop: 16,
        // paddingRight: 15,
        width: "100%",
    },
    suggestions: {
        zIndex: 100,
        position: 'absolute',
        maxHeight: 200,
        overflowY: 'scroll',
        marginRight: 15,
    },
    suggestionItem: {
        paddingLeft: 15,
        paddingBottom: 0,
        paddingTop: 0,
        fontSize: 14,
        minHeight: 30,
    },
    addButton: {
        marginTop: 16,
        marginBottom: 8,
        height: 49,
        width: "100%",
    },
    subTitle: {
        marginTop: 10,
        marginBottom: 10,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    row: {
        height: 40,
    },
    cell: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    btn: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
    },
});

export default withStyles (styles) (Settings)


