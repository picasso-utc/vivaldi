import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';




import { ajaxGet, ajaxPost, ajaxDelete } from '../../../utils/Ajax';


class CalendarManagement extends Component{
 
    
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            perms: [],
            newPerm: {
                nom: '',
                nom_resp: '',
                mail_resp: '',
                asso: false,
            },
            calendar : [],
            current_semester: {},
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlePlanningChange = this.handlePlanningChange.bind(this);
        this.handleDeleteCreneau = this.handleDeleteCreneau.bind(this);
        this.savePerm = this.savePerm.bind(this);
        this.deletePerm = this.deletePerm.bind(this);
        this.formateCalendarDate = this.formateCalendarDate.bind(this);

    }


    componentDidMount(){
        this.loadCurrentSemester();
    }


    loadCurrentSemester(){
        ajaxGet('current/semester').then(res => {
            this.setState({current_semester: res.data})
            this.loadPerms();
        })
        .catch(error => {
            console.log(error)
        })
    }


    loadPerms(){
        ajaxGet('perms').then(res => {
            const perms = res.data
            let creneaux = [];
            this.setState({perms: perms})
            for (let index = 0; index < perms.length; index++) {

                for (let index_creneau = 0; index_creneau < perms[index].creneaux.length; index_creneau++) {
                    // Créneau au format AAAA-MM-dd:Creneau:id
                    const creneau_array = perms[index].creneaux[index_creneau].split(':');
                    let creneau = {
                        id: creneau_array[2],
                        date: new Date(creneau_array[0]),
                        creneau: creneau_array[1],
                        perm_id: perms[index].id,
                        perm_nom: perms[index].nom,
                    }
                    switch (creneau_array[1]) {
                        case 'M':
                            creneau.creneau_detail = "Matin"
                            break;
                        case 'D':
                            creneau.creneau_detail = "Midi"
                            break;
                        case 'S':
                            creneau.creneau_detail = "Soir"
                            break;            
                        default:
                            break;
                    }
                    creneaux.push(creneau);
                }
            }
            this.createCalender(creneaux)          
        })
        .catch(error => {
            console.log(error)
        })
    }

    compareDates(d1, d2){
        if (d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()) {
            return true;
        }
        return false;
    }


    createCalender(existing_creneaux){
        let startDate = new Date(this.state.current_semester.start_date);
        let stopDate = new Date(this.state.current_semester.end_date);
        let week_number = 0;
        // L'objet calendrier correspond à un tableau comprenant des tableaux de semaine
        // calendar[0] correspond à la semaine 0 du semestre
        // calendar[0][2] correspond au 3ème jour de la semaine 0
        // On anticipe la création de la première semaine dans calendar d'où [[]]
        let calendar = [[]];
        for (let dt = new Date(startDate); dt <= stopDate; dt.setDate(dt.getDate() + 1)) {
            // Création de la date et ajout des créneaux
            const date = new Date(dt);
            let creneaux = this.createCreneaux(date, existing_creneaux);
            const new_date = {
                date: date,
                creneaux: creneaux
            }

            const day = date.getDay();
            if (day === 1 && !this.compareDates(startDate, date)) {
                // Création d'une nouvelle semaine car correspond au lundi
                // En conséquence création d'un nouveau tableau dans le calendrier
                week_number += 1;
                calendar.push([])
            }
            if (day !== 0) {
                // On ne prend pas les dimanches dans le planning
                calendar[week_number].push(new_date);
            }
        }

        // Pour la semaine 0 on ajoute manuellement les jours entre lundi et le premier jour donné
        const week_size = calendar[0].length;
        if (week_size < 6) {
            const missing_day = 6 - week_size;
            for (let index = 1; index <= missing_day; index++) {

                const date = new Date(startDate.getTime() - 86400000 * index);
                let creneaux = this.createCreneaux(date, existing_creneaux);
                const new_date = {
                    date: date,
                    creneaux: creneaux
                }
                calendar[0].splice(0,0, new_date);   
            }
        }
        this.setState({loading: false, calendar: calendar})
    }


    createCreneaux(date, existing_creneaux){
        let creneaux = {};

        const creneau_matin_index = existing_creneaux.findIndex(c => (this.compareDates(c.date, date) && c.creneau === 'M'))
        if (creneau_matin_index >= 0) {
            creneaux.matin = existing_creneaux[creneau_matin_index]
        } else {
            creneaux.matin = {date: this.formatCreneauDate(date), creneau: 'M', creneau_detail: 'Matin', perm_id: ""}
        }
        
        const creneau_midi_index = existing_creneaux.findIndex(c => (this.compareDates(c.date, date) && c.creneau === 'D'))
        if (creneau_midi_index >= 0) {
            creneaux.midi = existing_creneaux[creneau_midi_index]
        } else {
            creneaux.midi = {date: this.formatCreneauDate(date), creneau: 'D', creneau_detail: 'Midi', perm_id: ""}
        }
        
        const creneau_soir_index = existing_creneaux.findIndex(c => (this.compareDates(c.date, date) && c.creneau === 'S'))
        if (creneau_soir_index >= 0) {
            creneaux.soir = existing_creneaux[creneau_soir_index]
        } else {
            creneaux.soir = {date: this.formatCreneauDate(date), creneau: 'S', creneau_detail: 'Soir', perm_id: ""}
        }

        return creneaux;
    }


    formateCalendarDate(date){
        const months_list = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ]
        const day = date.getDate();
        const month = months_list[date.getMonth()];
        return day + " " + month;
    }


    formatCreneauDate(date){
        const day = ("0" + (date.getDate())).slice(-2);
        // const month_number = date.getMonth() +1;
        const month_number = ("0" + (date.getMonth() + 1)).slice(-2)
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


    handlePlanningChange(event, week_index, day_index, creneau_type){

        if (!event.target.value) {
            return
        }
        let calendar = [...this.state.calendar];
        let perms = [...this.state.perms];
        const perm_id = event.target.value;
        let perm_index = perms.findIndex(p => p.id.toString() === perm_id);
        
        calendar[week_index][day_index].creneaux[creneau_type].perm_nom = perms[perm_index].nom;
        calendar[week_index][day_index].creneaux[creneau_type].perm_id = perm_id;
        ajaxPost('creneau/', calendar[week_index][day_index].creneaux[creneau_type]).then(res => {
            const creneau_date = calendar[week_index][day_index].creneaux[creneau_type].date;
            const creneau_period = calendar[week_index][day_index].creneaux[creneau_type].creneau;
            calendar[week_index][day_index].creneaux[creneau_type].id = res.data.id;
            perms[perm_index].creneaux.push(creneau_date + ":" + creneau_period + ":" + res.data.id);
            this.setState({
                calendar: calendar,
                perms: perms,
            })
        })
        .catch(error => {
            console.log(error);
        }) 
    }


    handleDeleteCreneau(event, week_index, day_index, creneau_type, perm_id){
        let calendar = [...this.state.calendar];
        let perms = [...this.state.perms];
        let perm_index = perms.findIndex(p => p.id.toString() === perm_id.toString());

        
        const creneau = calendar[week_index][day_index].creneaux[creneau_type]
        
        ajaxDelete('creneau/' + creneau.id).then(res => {
            // Suppression du créneau dans le calendrier
            calendar[week_index][day_index].creneaux[creneau_type].perm_nom = "";
            calendar[week_index][day_index].creneaux[creneau_type].perm_id = "";
            // Suppression du créneau dans les perms
            perms[perm_index].creneaux = perms[perm_index].creneaux.filter(c => c !== creneau.date + ":" + creneau.creneau + ":" + creneau.id)
            this.setState({
                calendar: calendar,
                perms: perms,
            })
        })
        .catch(error => {
            console.log(error);
        })
        
    }


    savePerm(){
        ajaxPost('perms/', this.state.newPerm).then(res => {
            let perms = this.state.perms;
            perms.push(res.data);
            this.setState({perms: perms})
            
        })
        .catch(error => {
            console.log(error);
        })
        this.setState({
            newPerm : { nom: '', nom_resp: '', mail_resp: '', asso: false }
        });
    }


    deletePerm(event, perm){
        ajaxDelete('perms/' + perm.id).then(res => {
            let perms = this.state.perms;
            perms = perms.filter(p => p.id.toString() !== perm.id);
            this.setState({perms: perms});
        })
        .catch(error => {
            console.log(error);
        })
    }


    render(){
        
        const { classes } = this.props;

        const { perms, newPerm, calendar, loading } = this.state 

        if(loading){
            return (
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
            )
        }

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
                                {perms.map((perm, index)=> {
                                    const M_creneaux = perm.creneaux.filter(c => c.split(':')[1] === 'M').length
                                    const D_creneaux = perm.creneaux.filter(c => c.split(':')[1] === 'D').length
                                    const S_creneaux = perm.creneaux.filter(c => c.split(':')[1] === 'S').length
                                    const canDelete = (M_creneaux + D_creneaux + S_creneaux) === 0;
                                    return (
                                        <React.Fragment key={index}>
                                            <ListItem
                                                className={classes.suggestionItem}
                                                component="div"
                                            >
                                                <ListItemText
                                                    // Déterminer dynamiquement le nombre de créneaux
                                                    primary={
                                                        perm.nom + " (" +
                                                        M_creneaux + '/' +
                                                        D_creneaux + '/' +
                                                        S_creneaux + ')'                                                  
                                                    }
                                                    secondary={perm.nom_resp + (perm.asso?(" - Association"):("")) }
                                                />
                                                {canDelete && 
                                                    <ListItemSecondaryAction>
                                                        <IconButton 
                                                            edge="end" 
                                                            aria-label="delete" 
                                                            color="secondary"
                                                            onClick={(e) => this.deletePerm(e, perm)}
                                                        >
                                                            <DeleteOutlineIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                }
                                            </ListItem>
                                            <Divider/>
                                        </React.Fragment>
                                    )
                                })}
                            </List>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={7} lg={8}>
                        <Typography variant="h5" noWrap>
                            <ChevronRightIcon className={classes.titleIcon}/>
                            Calendrier
                        </Typography>
                        <Grid container className={classes.calendar}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Lundi</TableCell>
                                        <TableCell>Mardi</TableCell>
                                        <TableCell>Mercredi</TableCell>
                                        <TableCell>Jeudi</TableCell>
                                        <TableCell>Vendredi</TableCell>
                                        <TableCell>Samedi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {calendar.map((week, index) => (
                                        // console.log(week)
                                        <TableRow key={index}>
                                            {week.map((day, index_day) => (
                                                // console.log(day)
                                                <TableCell key={index_day}>
                                                    <Typography variant="caption" display="block" gutterBottom className={classes.day} noWrap>
                                                        <strong>{this.formateCalendarDate(day.date)}</strong>
                                                    </Typography>
                                                    <div className={classes.creneau_card}>
                                                        {day.creneaux.matin.perm_id? (
                                                            <Chip 
                                                                size="small" 
                                                                label={day.creneaux.matin.perm_nom} 
                                                                color="primary" 
                                                                className={classes.perm_chip}
                                                                onDelete={(e) => this.handleDeleteCreneau(e, index, index_day, 'matin', day.creneaux.matin.perm_id)}
                                                            />
                                                        ) : (
                                                            <FormControl className={classes.form}>
                                                                <select 
                                                                    className={classes.perm_select}
                                                                    onChange={(e) => this.handlePlanningChange(e, index, index_day, 'matin')}
                                                                >
                                                                    <option value="" defaultValue/>
                                                                    {perms.map((perm, index) => (
                                                                        <option value={perm.id} key={index}>
                                                                            {perm.nom}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </FormControl>
                                                        )}
                                                    </div>
                                                    <div className={classes.creneau_card}>
                                                        {day.creneaux.midi.perm_id?(
                                                            <Chip 
                                                                size="small" 
                                                                label={day.creneaux.midi.perm_nom} 
                                                                color="primary" 
                                                                className={classes.perm_chip} 
                                                                onDelete={(e) => this.handleDeleteCreneau(e, index, index_day, 'midi', day.creneaux.midi.perm_id)}
                                                            />
                                                        ):(
                                                            <FormControl className={classes.form}>
                                                                <select 
                                                                    className={classes.perm_select}
                                                                    onChange={(e) => this.handlePlanningChange(e, index, index_day, 'midi')}
                                                                >
                                                                    <option value="" defaultValue/>
                                                                    {perms.map((perm, index) => (
                                                                        <option value={perm.id} key={index}>
                                                                            {perm.nom}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </FormControl>
                                                        )}
                                                    </div>
                                                    <div className={classes.creneau_card}>
                                                        {day.creneaux.soir.perm_id? (
                                                            <Chip 
                                                                size="small" 
                                                                label={day.creneaux.soir.perm_nom} 
                                                                color="primary"
                                                                className={classes.perm_chip} 
                                                                onDelete={(e) => this.handleDeleteCreneau(e, index, index_day, 'soir', day.creneaux.soir.perm_id)}
                                                            />
                                                        ) : (
                                                            <FormControl className={classes.form}>                                                 
                                                                <select 
                                                                    className={classes.perm_select}
                                                                    onChange={(e) => this.handlePlanningChange(e, index, index_day, 'soir')}
                                                                >
                                                                    <option value="" defaultValue/>
                                                                    {perms.map((perm, index) => (
                                                                        <option value={perm.id} key={index}>
                                                                            {perm.nom}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </FormControl>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    };

}

const styles = theme => ({
    loader: {
        marginTop: 200,
    },
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
        // borderRadius: 5,
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
    calendar: {
        margin: 10,
        height: window.innerHeight - 150,
        overflowY: "scroll",
    },
    day: {
        fontSize: 12,
    },
    input: {
        fontSize: 12,
    },
    perm_chip : {
        fontSize: 11,
        height: 24,
        marginTop:0,
        marginBottom: 6,
        width: '100%',
        padding: 5,
    },
    creneau_card : {
        height: 30,
    },
    perm_select : {
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    form: {
        width: '100%',
    },
});

export default withStyles (styles) (CalendarManagement)