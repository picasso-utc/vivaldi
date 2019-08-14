import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


import { ajaxGet, ajaxPost } from '../../../utils/Ajax';


class CalendarManagement extends Component{
 
    
    constructor(props) {
        super(props)
        this.state = {
            perms: [],
            newPerm: {
                nom: '',
                nom_resp: '',
                mail_resp: '',
                asso: false,
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.savePerm = this.savePerm.bind(this);

    }


    componentDidMount(){
        this.loadPerms();
    }


    loadPerms(){
        ajaxGet('perms').then(res => {
            this.setState({perms: res.data})
        })
        .catch(error => {
            console.log(error)
        })
    }


    handleChange(event){
        this.setState({
            newPerm: {
                ...this.state.newPerm,
                [event.target.name]: event.target.value
            }
        })
    }


    savePerm(){
        ajaxPost('perms/', this.state.newPerm).then(res => {
            let perms = this.state.perms;
            perms.push(res.data.perm);
            this.setState({perms: perms})
        })
        .catch(res => {

        })
        this.setState({
            newPerm : { nom: '', nom_resp: '', mail_resp: '', asso: false }
        });
    }


    render(){
        
        const { classes } = this.props;

        const { perms, newPerm } = this.state 

        return (
            <div className={classes.container}>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <Typography variant="h5" noWrap>
                            <ChevronRightIcon className={classes.titleIcon}/>
                            Perms
                        </Typography>
                        <Grid container className={classes.redBox}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" noWrap className={classes.subTitle}>
                                    Ajouter une nouvelle perm
                                </Typography>
                            </Grid>  
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Nom"
                                    className={classes.textField}
                                    name="nom"
                                    value={newPerm.nom}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    className={classes.checkBox}
                                    name="asso"
                                    value={newPerm.asso}
                                    onChange={this.handleChange}
                                    control={<Checkbox color="primary" />}
                                    label="Association ?"
                                    labelPlacement="start"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Responsable"
                                    className={classes.textField}
                                    name="nom_resp"
                                    value={newPerm.nom_resp}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Mail responsable"
                                    className={classes.textField}
                                    name="mail_resp"
                                    value={newPerm.mail_resp}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    color="secondary" 
                                    onClick={this.savePerm}
                                >
                                    Ajouter
                                </Button>
                            </Grid> 
                        </Grid>
                        <Grid container className={classes.redBox}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" noWrap className={classes.subTitle}>
                                    Liste des perms
                                </Typography>
                            </Grid>
                            <List className={classes.listPerms}>
                                {perms.map((perm, index)=> (
                                    <React.Fragment key={index}>
                                        <ListItem
                                            className={classes.suggestionItem}
                                            component="div"
                                        >
                                            <ListItemText
                                                primary={perm.nom + " - 0/0/1"}
                                                secondary={perm.nom_resp + (perm.asso?(" - Association"):("")) }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" color="secondary">
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>

                                        </ListItem>
                                        <Divider/>
                                    </React.Fragment>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Typography variant="h5" noWrap>
                            <ChevronRightIcon className={classes.titleIcon}/>
                            Calendrier
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    };

}

const styles = theme => ({
    container: {
        margin: 30,
        marginTop: 100,
    },
    titleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    subTitle:{
        paddingLeft: 10,
    },
    redBox: {
        border: "1.5px solid #B22132",
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
    },
    textField: {
        margin: 10,
    },
    checkBox: {
        paddingTop: 10,
    },
    listPerms: {
        width: "100%",
        height: 300,
        overflowY: "scroll",
    },
});

export default withStyles (styles) (CalendarManagement)