import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {ajaxDelete, ajaxGet, ajaxPost} from "../../../utils/Ajax";
import Divider from "@material-ui/core/Divider";
import {ListItem, ListItemText, Paper, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

class CalendarApp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listCalendrier: [],
            nbDays: 7,
            listAuto: [],
            newEvent:{
                name: '',
                nameResp: '',
                description: '',
                date: Date.now(),
                hour: '17:00',
            }
        }
        this.handleChangeDay = this.handleChangeDay.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveEvent = this.saveEvent.bind(this)
    }

    loadCalender(n){
        ajaxGet('calendar/?nb='+n).then(res=>{
            res.data.map((element,index) => {
                if(element.periode){
                    switch (element.periode){
                        case "S":
                            element.hour = '18:30'
                            break;
                        case "D":
                            element.hour='12:00'
                            break;
                        case "M":
                            element.hour='10:00'
                    }
                }
            })
            let liste = res.data.sort(function(a,b){
                if(a.date < b.date){
                    return -1
                } else if (a.date == b.date){
                    if(a.hour < b.hour){
                        return -1
                    }
                    else{
                        return 1
                    }
                }else{
                    return 1
                }
            })
            this.setState({listCalendrier: liste})
        })
    }

    componentDidMount() {
        this.loadCalender(this.state.nbDays)
    }

    deleteEvent(id) {
        ajaxDelete('calendar/?id='+id).then(res =>{
            this.loadCalender(this.state.nbDays)
        })
    }

    editEvent(index) {
        return undefined;
    }

    handleChangeDay(e){
        this.setState({nbDays: e.target.value})
        this.loadCalender(e.target.value)
    }

    saveEvent(){
        const temp =  this.state.newEvent
        ajaxPost('calendar/', {
            nom: temp.name,
            date: temp.date,
            responsable: temp.nameResp,
            description: temp.description,
            hour: temp.hour
            }).then(res =>{
                this.setState({
                    newEvent:{
                    name: '',
                    nameResp: '',
                    description: '',
                    date: Date.now(),
                    hour: '',
                }
            })
            this.loadCalender(this.state.nbDays)
        })
    }

    handleChange(event){
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                [event.target.name]: event.target.value
            }
        })
    }

    autoCompleteQuery(query){
        ajaxGet('payutc/user/autocomplete/' + query).then(res => {
            this.setState({listAuto: res.data.users});
        })
            .catch(error => {

            })
    }

    handleAutocompleteChange(event){
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                'nameResp': event.target.value
            }
        })
        if (event.target.value){
            this.autoCompleteQuery(event.target.value)
        } else {
            this.setState({listAuto : []})
        }
    }

    handleRespChange(user, nom_resp_type, mail_resp_type) {
        const data = user.split('-')
        this.setState({
            listAuto:[],
            newEvent: {
                ...this.state.newEvent,
                'nameResp': data[0],
            }
        })

    }

    render() {
        const { classes } = this.props;
        const {listCalendrier, nbDays,newEvent,listAuto} = this.state
        let lastdate = null
        return (
            <>
                <div className="admin_container">
                    <Typography variant="h6" className={classes.subTitle}>
                        Créer un nouvel event
                    </Typography>
                    <Paper className={classes.paper_box}>
                        <Grid container direction='row' className={classes.container_createNews}>
                            <Grid item xs={12} sm={6} lg={6} className={classes.textFieldContainer}>
                                <TextField
                                    label="Nom"
                                    className={classes.textField}
                                    name="name"
                                    value={newEvent.name}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    margin="dense"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    InputProps={{ style: { fontSize: 12 } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6} className={classes.textFieldContainer}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    className={classes.textField}
                                    name="nom_resp"
                                    label="Responsable"
                                    value={newEvent.nameResp}
                                    onChange={(event) => this.handleAutocompleteChange(event)}
                                    autoComplete="off"
                                />
                                { listAuto.length > 0 && (
                                    <Paper className={classes.suggestions}>
                                        {listAuto.map((suggestion, index)=> (
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
                            <Grid item xs={12} sm={12} lg={12} className={classes.textFieldContainer}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    className={classes.textField}
                                    name="description"
                                    label="Description"
                                    value={newEvent.description}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6} className={classes.textFieldContainer}>
                                <TextField
                                    name='date'
                                    id="date"
                                    label="Date"
                                    type="date"
                                    defaultValue={newEvent.date}
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6} className={classes.textFieldContainer}>
                                <TextField
                                    id="time"
                                    label="Heure"
                                    type="time"
                                    name="hour"
                                    defaultValue={newEvent.hour}
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">

                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={this.saveEvent}
                                className={classes.btnAddNews}
                            >
                                Ajouter
                            </Button>
                        </Grid>
                    </Paper>
                </div>
                <div className="admin_container">
                    <Grid className={classes.container}>
                        <Grid container direction="row" justify="center" alignItems="center">

                            <TextField
                                item xs={6} sm={6} lg={6}
                                id="standard-number"
                                label="Nombre de jours à afficher"
                                type="number"
                                value={nbDays}
                                className={classes.numberSelector}
                                onChange={(e) => this.handleChangeDay(e)}
                            />
                        </Grid>
                        {listCalendrier.map((element, index)=> {
                            let classCss = classes.perm
                            let type = 'Événement'
                            try{
                                if (element.id) {
                                    classCss = classes.event
                                }
                                else{
                                    switch (element.periode){
                                        case "S":
                                            type = 'Perm soir'
                                            break;
                                        case "D":
                                            type = 'Perm midi'
                                            break;
                                        case "M":
                                            type = 'Perm matin'
                                    }
                                }
                            }
                            catch (e) {

                            }
                            let newDay = false
                            if (lastdate == null || lastdate !== element.date) {
                                lastdate = element.date
                                newDay = true
                            }
                            return (
                                <React.Fragment key={index} >
                                    {newDay &&
                                    <>
                                        <Divider/>
                                        <Typography variant="h6" className={classes.subTitleDate}>
                                            {element.date}
                                        </Typography>
                                    </>
                                    }
                                    <ListItem
                                        className={classCss}
                                        component="div"
                                    >
                                        <ListItemText
                                            primary={
                                                type +' | '+ element.nom +' | '+ element.hour
                                            }
                                            secondary={
                                                'Description : '+ element.description + ' '
                                            }
                                        />
                                        {type === 'Événement' &&
                                            <>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => this.editEvent(index)}
                                                    className={classes.btnAddNews}
                                                >
                                                    Editer
                                                </Button>
                                                <Button
                                                variant="contained"
                                                size="small"
                                                className={classes.btnAddNews}
                                                color="secondary"
                                                onClick={() => this.deleteEvent(element.id)}
                                                >
                                                Supprimer
                                                </Button>
                                            </>
                                        }
                                    </ListItem>

                                </React.Fragment>
                            )
                        })}
                    </Grid>
                </div>
            </>
        );
    }
}

const styles = theme => ({
    admin_container:{

    },
    subTitle: {
        marginBottom: 40,
    },
    subTitleDate:{
        marginBottom:10,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    add_item : {
        marginLeft: 10,
    },
    numberSelector:{
        marginBottom:10,
        width:'100%'
    },
    paper_box : {
        width: '100%',
        overflowX: 'auto',
        marginBottom: 20,
    },
    textField: {
        width: '100%',
        fontSize: 12,
    },
    textFieldContainer : {
        paddingLeft: 10,
        paddingRight: 10,
    },
    btnAddNews: {
        marginTop: 10,
        marginBottom: 20,
        marginRight:5,
        marginLeft:5,
    },
    perm:{
        backgroundColor: '#9db5f2',
    },
    event:{
        backgroundColor: '#de8e96',
    }
})

export default withStyles (styles) (CalendarApp)
