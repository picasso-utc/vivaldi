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
            },
            calendar : []
        }

        this.handleChange = this.handleChange.bind(this);
        this.savePerm = this.savePerm.bind(this);
        this.formateCalendarDate = this.formateCalendarDate.bind(this);

    }


    componentDidMount(){
        this.loadPerms();
        this.createCalender();
    }


    loadPerms(){
        ajaxGet('perms').then(res => {
            this.setState({perms: res.data})
        })
        .catch(error => {
            console.log(error)
        })
    }


    createCalender(){
        let startDate = new Date(2019, 0, 9);
        let stopDate = new Date(2019,5,30);
        let week_number = 0;
        // L'objet calendrier correspond à un tableau comprenant des tableaux de semaine
        // calendar[0] correspond à la semaine 0 du semestre
        // calendar[0][2] correspond au 3ème jour de la semaine 0
        // On anticipe la création de la première semaine dans calendar d'où [[]]
        let calendar = [[]];
        for (let dt = new Date(startDate); dt <= stopDate; dt.setDate(dt.getDate() + 1)) {
            // Création de la date et ajout des créneaux
            const date = new Date(dt);
            const creneaux = [{
                matin: {date: this.formatCreneauDate(date), creaneau: 'M', creaneau_detail: 'Matin', perm_id: null},
                midi: {date: this.formatCreneauDate(date), creaneau: 'D', creaneau_detail: 'Midi', perm_id: null},
                soir: {date: this.formatCreneauDate(date), creaneau: 'S', creaneau_detail: 'Soir', perm_id: null}
            }]
            const new_date = {
                date: date,
                creneaux: creneaux
            }
            const day = date.getDay();
            if (day == 1) {
                // Création d'une nouvelle semaine car correspond au lundi
                // En conséquence création d'un nouveau tableau dans le calendrier
                week_number += 1;
                calendar.push([])
            }
            if (day != 0) {
                // On ne prend pas les dimanches dans le planning
                calendar[week_number].push(new_date);
            }
        }

        // Pour la semaine 0 on ajoute manuellement les jours entre lundi et le premier jour donné
        const week_size = calendar[0].length;
        if (week_size < 6) {
            const missing_day = 6 - week_size;
            for (let index = 1; index <= missing_day; index++) {
                // const element = missing_day;
                const date = new Date(startDate.getTime() - 86400000 * index);
                // console.log(new Date((startDate.getDate() - 1)));
                const creneaux = [{
                    matin: {date: this.formatCreneauDate(date), creaneau: 'M', creaneau_detail: 'Matin', perm_id: null},
                    midi: {date: this.formatCreneauDate(date), creaneau: 'D', creaneau_detail: 'Midi', perm_id: null},
                    soir: {date: this.formatCreneauDate(date), creaneau: 'S', creaneau_detail: 'Soir', perm_id: null}
                }]
                const new_date = {
                    date: date,
                    creneaux: creneaux
                }
                calendar[0].splice(0,0, new_date);   
            }
        }
        console.log(calendar);
        this.setState({calendar: calendar})
    }




    formatCreneauDate(date){
        const day = date.getDate();
        const month_number = date.getMonth() +1;
        const year = date.getFullYear();
        return year + "-" + month_number + "-" + day;
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
                    <Grid item xs={12} md={5} lg={4}>
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
                                    InputProps={{ style: { fontSize: 12 } }}
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
                                    InputProps={{ style: { fontSize: 12 } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Mail resp"
                                    className={classes.textField}
                                    name="mail_resp"
                                    value={newPerm.mail_resp}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{ style: { fontSize: 12 } }}
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
                                    className={classes.btnAddPerm}
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
                                                // Déterminer dynamiquement le nombre de créneaux
                                                primary={perm.nom + " - 0/0/1"}
                                                secondary={perm.nom_resp + (perm.asso?(" - Association"):("")) }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" color="secondary">
                                                    {/* A désactiver quand des perms y sont associés */}
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
                    <Grid item xs={12} sm={7} lg={8}>
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
        fontSize: 12,
    },
    checkBox: {
        paddingTop: 10,
    },
    btnAddPerm: {
        marginTop: 10,
    },
    listPerms: {
        width: "100%",
        height: 300,
        overflowY: "scroll",
    },
});

export default withStyles (styles) (CalendarManagement)