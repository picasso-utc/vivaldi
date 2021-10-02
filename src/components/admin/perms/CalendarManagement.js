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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import SendIcon from '@material-ui/icons/Send';
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
                nom_resp_2: '',
                mail_resp_2: '',
                asso: false,
                asso_login: '',
            },
            calendar : [],
            current_semester: {},
            open_mail: false,
            selected_perms: [],
            unselected_perms: [],
            autocomplete_users_1: [],
            autocomplete_users_2 : [],
            assos : []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handlePlanningChange = this.handlePlanningChange.bind(this);
        this.handleDeleteCreneau = this.handleDeleteCreneau.bind(this);
        this.savePerm = this.savePerm.bind(this);
        this.deletePerm = this.deletePerm.bind(this);
        this.formateCalendarDate = this.formateCalendarDate.bind(this);
        this.handleChangeOnMail = this.handleChangeOnMail.bind(this);
        this.sendPermsMail = this.sendPermsMail.bind(this);
    }


    componentDidMount(){
        this.loadAssos();
    }


    loadAssos(){
        ajaxGet('perms/assos').then(res =>{
            let assos = res.data.assos;
            assos = assos.sort(function(a,b){
                if (a.shortname > b.shortname) {
                    return 1
                }
                return -1
            })
            this.setState({assos: assos});
            this.loadCurrentSemester();
        })
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
            let perms = res.data;
            perms = perms.sort(function(a,b){
                if (a.nom.toLowerCase() > b.nom.toLowerCase()) {
                    return 1
                }
                return -1
            })

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


    isDatePast(date){
        if(date < new Date()){return true;}
        return false;
    }   


    handleChange(event){
        this.setState({
            newPerm: {
                ...this.state.newPerm,
                [event.target.name]: event.target.value
            }
        })
    }

    handleCheckboxChange(event){
        const asso = this.state.newPerm.asso;
        this.setState(
            {newPerm:{
                ...this.state.newPerm,
                [event.target.name]: !asso,
                nom: ''
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


    handleAssoChange(event){
        const assos = this.state.assos;
        const results = assos.filter(a => a.login === event.target.value);
        if (results.length > 0) {
            this.setState({
                newPerm: {
                    ...this.state.newPerm,
                    [event.target.name] : event.target.value
                }
            })
        }
    }


    handleRespChange(user, nom_resp_type, mail_resp_type){
        const data = user.split('-')
        const nom_resp = data[0].split('(')[0]
        const mail_resp = data[1]
        this.setState({
            newPerm: {
                ...this.state.newPerm,
                [nom_resp_type]: nom_resp,
                [mail_resp_type]: mail_resp
            },
            autocomplete_users_1: [],
            autocomplete_users_2: []
        })
    }


    autoCompleteQuery(query, autocomplete_type){
        ajaxGet('payutc/user/autocomplete/' + query).then(res => {
            this.setState({[autocomplete_type]: res.data.users});
        })
        .catch(error => {

        })
    }


    handleAutocompleteChange(event, autocomplete_type){
        this.setState({
            newPerm: {
                ...this.state.newPerm,
                [event.target.name]: event.target.value
            }
        })
        if (event.target.value){
            this.autoCompleteQuery(event.target.value, autocomplete_type)
        } else {
            this.setState({[autocomplete_type]: []})
        }
    }


    savePerm(){
        let mail_asso = ""
        if (this.state.newPerm.asso) {
            mail_asso = this.state.newPerm.asso_login + "@assos.utc.fr";
        }
        const perm = {
            nom: this.state.newPerm.nom,
            asso: this.state.newPerm.asso,
            nom_resp: this.state.newPerm.nom_resp,
            mail_resp: this.state.newPerm.mail_resp,
            nom_resp_2: this.state.newPerm.nom_resp_2,
            mail_resp_2: this.state.newPerm.mail_resp_2,
            mail_asso: mail_asso,
        }
        ajaxPost('perms/', perm).then(res => {
            let perms = this.state.perms;
            perms.push(res.data);
            this.setState({
                perms: perms,
                newPerm : { nom: '', nom_resp: '', mail_resp: '', asso: false, asso_login: '', nom_resp_2: '', mail_resp_2: '' }
            })
        })
        .catch(error => {
            console.log(error);
        })
    }


    deletePerm(event, perm){
        ajaxDelete('perms/' + perm.id).then(res => {
            let perms = this.state.perms;
            perms = perms.filter(p => p.id.toString() !== perm.id.toString());
            this.setState({perms: perms});
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleChangeOnMail(){
        const open_mail = this.state.open_mail;
        this.setState({open_mail: !open_mail});
        ajaxGet('perms').then(res => {
            this.setState({selected_perms: res.data});
        })
        .catch(error => {
            console.log(error)
        })
    }


    selectPerm(event, perm){
        let selected_perms = [...this.state.selected_perms];
        let unselected_perms = [...this.state.unselected_perms];
        selected_perms = selected_perms.filter(p => p.id !== perm.id);
        unselected_perms.push(perm);
        this.setState({selected_perms: selected_perms, unselected_perms: unselected_perms});
    }


    unselectPerm(event, perm){
        let selected_perms = [...this.state.selected_perms];
        let unselected_perms = [...this.state.unselected_perms];
        unselected_perms = unselected_perms.filter(p => p.id !== perm.id);
        selected_perms.push(perm);
        this.setState({selected_perms: selected_perms, unselected_perms: unselected_perms});
    }


    sendPermsMail(){
        ajaxPost('perms/mail', this.state.selected_perms).then(res => {
            
        })
        .catch(error => {
            console.log(error)
        })
    }


    render(){
        
        const { classes } = this.props;

        const { perms, newPerm, calendar, loading, open_mail, selected_perms, unselected_perms, assos, autocomplete_users_1, autocomplete_users_2 } = this.state 

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
            <div className="admin_container">
                <Grid container direction="row">
                    <Typography variant="h6" className={classes.subTitle}>
                        <ChevronRightIcon className={classes.titleIcon}/>
                        Ajouter une perm
                    </Typography>
                </Grid>
                <Paper className={classes.paper_box}>
                    <Grid container>
                        <Grid item xs={12} sm={6} lg={3} className={classes.textFieldContainer}>
                            <FormControlLabel
                                className={classes.checkBox}
                                name="asso"
                                value={newPerm.asso}
                                onChange={this.handleCheckboxChange}
                                control={<Checkbox color="primary" checked={newPerm.asso} />}
                                label="Association ?"
                                labelPlacement="start"
                            />                            
                        </Grid>
                        {newPerm.asso && (
                            <Grid item xs={12} sm={5} lg={3} className={classes.textFieldContainer}>
                                <TextField
                                    select
                                    label="Association"
                                    value={newPerm.asso_login}
                                    onChange={(event) => this.handleAssoChange(event)}
                                    variant="outlined"
                                    name="asso_login"
                                    className={classes.textField}
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                >
                                    {assos.map(asso => (
                                        <MenuItem key={asso.login} value={asso.login}>
                                            {asso.shortname}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                        
                        <Grid item xs={12} sm={6} lg={3} className={classes.textFieldContainer}>    
                            <TextField
                                label="Nom"
                                className={classes.textField}
                                name="nom"
                                value={newPerm.nom}
                                onChange={this.handleChange}
                                autoComplete="off"
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                size="small"
                                InputProps={{ style: { fontSize: 12 } }}
                            />                            
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3} className={classes.textFieldContainer}>
                            <TextField
                                variant="outlined" 
                                size="small"
                                margin="dense"
                                fullWidth
                                className={classes.textField}
                                name="nom_resp"
                                label="Responsable 1"
                                value={newPerm.nom_resp}
                                onChange={(event) => this.handleAutocompleteChange(event, "autocomplete_users_1")}
                                autoComplete="off"
                            />
                            { autocomplete_users_1.length > 0 && (
                                <Paper className={classes.suggestions}>
                                    {autocomplete_users_1.map((suggestion, index)=> (
                                        <MenuItem
                                            className={classes.suggestionItem}
                                            key={index}
                                            component="div"
                                            onClick={()=>this.handleRespChange(suggestion.name, "nom_resp", "mail_resp")}
                                        >
                                            {suggestion.name.split('-')[0]}
                                        </MenuItem>
                                    ))}      
                                </Paper>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3} className={classes.textFieldContainer}>
                            <TextField
                                variant="outlined" 
                                size="small"
                                margin="dense"
                                fullWidth
                                name="nom_resp_2"
                                className={classes.textField}
                                label="Responsable 2"
                                value={newPerm.nom_resp_2}
                                onChange={(event) => this.handleAutocompleteChange(event, "autocomplete_users_2")}
                                autoComplete="off"
                            />
                            { autocomplete_users_2.length > 0 && (
                                <Paper className={classes.suggestions}>
                                    {autocomplete_users_2.map((suggestion, index)=> (
                                        <MenuItem
                                            className={classes.suggestionItem}
                                            key={index}
                                            component="div"
                                            onClick={()=>this.handleRespChange(suggestion.name, "nom_resp_2", "mail_resp_2")}
                                        >
                                            {suggestion.name.split('-')[0]}
                                        </MenuItem>
                                    ))}      
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button 
                            variant="contained" 
                            size="small" 
                            color="primary" 
                            onClick={this.savePerm}
                            className={classes.btnAddPerm}
                        >
                            Ajouter
                        </Button>
                    </Grid> 
                </Paper>
                <Grid container direction="row">
                    <Typography variant="h6" className={classes.subTitle}>
                        <ChevronRightIcon className={classes.titleIcon}/>
                        Liste des perms
                        <Button 
                            variant="contained" 
                            size="small" 
                            color="primary" 
                            onClick={this.handleChangeOnMail}
                            className={classes.btnMail}
                        >
                            Mail <SendIcon className="left5"/>
                        </Button>
                    </Typography>
                    <Paper className={classes.paper_box}> 
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
                    </Paper>
                    </Grid>
                    <Grid container direction="row">
                        <Typography variant="h6" className={classes.subTitle}>
                            <ChevronRightIcon className={classes.titleIcon}/>
                            Calendrier
                        </Typography>
                        <Paper className={classes.paper_box}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="center side_padding8">Lundi</TableCell>
                                    <TableCell className="center side_padding8">Mardi</TableCell>
                                    <TableCell className="center side_padding8">Mercredi</TableCell>
                                    <TableCell className="center side_padding8">Jeudi</TableCell>
                                    <TableCell className="center side_padding8">Vendredi</TableCell>
                                    <TableCell className="center side_padding8">Samedi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {calendar.map((week, index) => (
                                    <TableRow key={index}>
                                        {week.map((day, index_day) => (
                                            <TableCell className="side_padding8" key={index_day} align="center">
                                                <Typography variant="caption" display="block" gutterBottom className={classes.day} noWrap>
                                                    <strong>{this.formateCalendarDate(day.date)}</strong>
                                                </Typography>
                                                <div className={classes.creneau_card}>
                                                    {/* <Grid container direction="row" justify="center" alignItems="center" style={{height:30, width: 'fit-content'}}> */}
                                                        {day.creneaux.matin.perm_id? (
                                                            <Chip 
                                                                size="small" 
                                                                label={day.creneaux.matin.perm_nom} 
                                                                color="primary" 
                                                                className={classes.perm_chip}
                                                                onDelete={this.isDatePast(day.date) ? null : (e) => this.handleDeleteCreneau(e, index, index_day, 'matin', day.creneaux.matin.perm_id)}
                                                            />
                                                        ) : (
                                                            <FormControl>
                                                                <select 
                                                                    className={classes.perm_select}
                                                                    disabled={this.isDatePast(day.date)}
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
                                                    {/* </Grid> */}
                                                </div>
                                                <div className={classes.creneau_card}>
                                                    {day.creneaux.midi.perm_id?(
                                                        <Chip 
                                                            size="small" 
                                                            label={day.creneaux.midi.perm_nom} 
                                                            color="primary" 
                                                            className={classes.perm_chip} 
                                                            onDelete={this.isDatePast(day.date) ? null : (e) => this.handleDeleteCreneau(e, index, index_day, 'midi', day.creneaux.midi.perm_id)}
                                                        />
                                                    ):(
                                                        <FormControl>
                                                            <select 
                                                                className={classes.perm_select}
                                                                disabled={this.isDatePast(day.date)}
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
                                                            onDelete={this.isDatePast(day.date) ? null : (e) => this.handleDeleteCreneau(e, index, index_day, 'soir', day.creneaux.soir.perm_id)}
                                                        />
                                                    ) : (
                                                        <FormControl>                                                 
                                                            <select 
                                                                className={classes.perm_select}
                                                                disabled={this.isDatePast(day.date)}
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
                    </Paper>
                </Grid>
                <Dialog
                    // fullWidth="lg"
                    maxWidth="lg"
                    open={open_mail}
                    onClose={this.handleChangeOnMail}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Gestion des envois d'email</DialogTitle>
                    <DialogContent>
                        <Paper className={classes.paper}>
                            <DialogContentText>
                                Ci-dessous la liste des perms auxquelles doit être envoyées un mail de notification des plannings. 
                            </DialogContentText>
                            {selected_perms.map((perm, index) => (
                                <Chip
                                    label={perm.nom}
                                    key={index}
                                    onDelete={(event) => this.selectPerm(event, perm)}
                                    className={classes.chip}
                                    color="primary"
                                />
                            ))}
                        </Paper>
                        <Paper className={classes.paper}>
                            <DialogContentText>
                                Ci-dessous la liste des perms auxquelles <strong>ne doit pas</strong> être envoyées un mail de notification des plannings. 
                            </DialogContentText>
                            {unselected_perms.map((perm, index) => (
                                <Chip
                                    label={perm.nom}
                                    key={index}
                                    onDelete={(event) => this.unselectPerm(event, perm)}
                                    className={classes.chip}
                                    color="primary"
                                />
                            ))}
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                    <Button 
                        onClick={this.handleChangeOnMail} 
                        color="secondary"
                        variant="contained" 
                        size="small" 
                    >
                        Annuler
                    </Button>
                    <Button 
                        onClick={this.sendPermsMail} 
                        color="primary"
                        variant="contained" 
                        size="small" 
                    >
                        Envoyer
                    </Button>
                    </DialogActions>
                </Dialog>
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
    paper_box : {
        width: '100%',
        overflowX: 'auto',
        marginBottom: 20,
    },
    titleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    subTitle:{
        marginBottom: 5
    },
    textFieldContainer : {
        paddingLeft: 10,
        paddingRight: 10,
    },
    textField: {
        width: '100%',
        fontSize: 12,
    },
    checkBox: {
        paddingTop: 10,
    },
    btnAddPerm: {
        marginTop: 10,
        marginBottom: 20,
    },
    btnMail : {
        marginLeft: 10,
    },
    listPerms: {
        width: "100%",
        height: 300,
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
        padding: 5,
    },
    creneau_card : {
        height: 30,
    },
    perm_select : {
        paddingLeft: '5%',
        paddingRight: '5%',
        width: 100
    },
    chip: {
        margin: 5,
    },
    paper : {
        margin:20,
        padding: 20,
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
});

export default withStyles (styles) (CalendarManagement)
