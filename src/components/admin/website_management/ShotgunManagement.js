import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ajaxDelete, ajaxGet, ajaxPost, ajaxPut} from "../../../utils/Ajax";
import {Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemText, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import LinkIcon from '@material-ui/icons/Link';


class PollsManagement extends Component{


    constructor(props) {
        super(props)
        this.state = {
            activeShotgun : [],
            unActiveShotgun: [],
            listPeople: [],
            newShotgun:{
                text: '',
                dateShotgun: this.formatDate(new Date()),
                nb: 10,
                dateStart: null,
                dateEnd: null,
            }
        }
        this.loadShotgun = this.loadShotgun.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveShotgun = this.saveShotgun.bind(this)
        this.handleSwitch = this.handleSwitch.bind(this)
        this.loadPeople = this.loadPeople.bind(this)
    }

    saveShotgun(){
        let temp = this.state.newShotgun
        ajaxPost('shotgun/creneau/',{shotgunDate:temp.dateShotgun,max_people:temp.nb,start:temp.dateStart, end: temp.dateEnd,text:temp.text,actif:true}).then(res =>{
            this.loadShotgun()
            this.setState({
                newShotgun:{
                    text: '',
                    dateShotgun: this.formatDate(new Date()),
                    nb: 10,
                    dateStart: null,
                    dateEnd: null,
                },
                listPeople:{}
            })
        })
    }

    formatDate(date){
        const year = date.getFullYear()
        const month = ("0" + (date.getMonth() + 1)).slice(-2)
        const day = ("0" + (date.getDate())).slice(-2)
        const hour = date.getHours()
        const min = date.getMinutes()
        return year+'-'+month+'-'+day+'T'+hour+':'+min
    }

    handleSwitch(e){
        let temp = e
        temp.actif = !e.actif
        ajaxPut('shotgun/creneau/' + e.id+'/',temp).then(r  => this.loadShotgun())
    }

    handleDelete(e){
        ajaxDelete('shotgun/creneau/' + e.id+'/').then(r => this.loadShotgun())
    }


    componentDidMount(){
        this.loadShotgun()
        this.loadPeople()
    }

    loadPeople(){
        ajaxGet('shotgun/persons/').then(res=>{
            let temp = {}
            for(let people in res.data){
                if (!temp[''+ res.data[people]['id_creneau']]) {
                    temp[''+ res.data[people]['id_creneau']] = [];
                }
                temp[''+ res.data[people]['id_creneau']].push(res.data[people])
            }
            this.setState({listPeople:temp})
        })
    }

    loadShotgun(){
        ajaxGet('shotgun/creneau/').then(res=>{
            let actif = []
            let inactif = []
            for (let shotgun in res.data){
                console.log(res.data[shotgun]['actif'])
                if (res.data[shotgun]['actif']){
                    actif.push(res.data[shotgun])
                }else{
                    inactif.push(res.data[shotgun])
                }
            }
            this.setState({activeShotgun: actif, unActiveShotgun: inactif})
        })
    }

    handleChange(event){
        this.setState({
            newShotgun: {
                ...this.state.newShotgun,
                [event.target.name]: event.target.value
            }
        })
    }

    displaySotgun(element, index,classes){
        let nbPeople = 0
        if (this.state.listPeople[''+element.id]){
            nbPeople = this.state.listPeople[''+element.id].length
        }
        return(
            <React.Fragment key = {index}>
                    <ListItem
                        className={classes.suggestionItem}
                        component="div"
                    >
                        <ListItemText
                            primary={
                                element.text
                            }
                            secondary={
                                'Début du shotgun :' +element.shotgunDate
                            }
                        />

                        {element.actif &&
                        <LinkIcon
                            onClick={() => alert("url: www.picasso-utc.fr/shotgun/"+element.id)}
                        />
                        }

                            <Switch
                                checked={element.actif}
                                onChange={() => this.handleSwitch(element)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />


                        <Button
                            variant="contained"
                            size="small"
                            className={classes.btnAddNews}
                            color="secondary"
                            onClick={() => this.handleDelete(element)}
                        >
                            Supprimer
                        </Button>
                    </ListItem>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Membres du shotgun {nbPeople} / {element.max_people}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </React.Fragment>
        )

    }

    render() {
        const {classes} = this.props;
        const {activeShotgun, unActiveShotgun, newShotgun} = this.state

        return (
            <>
                <div className="admin_container">
                    <Grid container direction="row">
                        <Typography variant="h6" className={classes.subTitle}>
                            <ChevronRightIcon className={classes.titleIcon}/>
                            Ajouter un shotgun
                        </Typography>
                        <Paper className={classes.paper_box}>
                            <Grid container direction='row' className={classes.container_createShotgun}>
                                <Grid item xs={12} sm={6} lg={6} className={classes.textFieldContainer}>
                                    <TextField
                                        label="Description du shotgun"
                                        className={classes.textField}
                                        name="text"
                                        value={newShotgun.text}
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
                                        id="datetime-local"
                                        label="Date du shotgun"
                                        type="datetime-local"
                                        name="dateShotgun"
                                        value={newShotgun.dateShotgun}
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3} className={classes.textFieldContainer}>
                                    <TextField
                                        id="outlined-number"
                                        label="Max personnes"
                                        type="number"
                                        name="nb"
                                        value={newShotgun.nb}
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.textFieldContainer}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Informations supplémentaires (non obligatoire)</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid item xs={12} sm={6} lg={3} className={classes.textFieldContainer}>
                                            <TextField
                                                id="datetime-local"
                                                label="Date début évènement"
                                                type="datetime-local"
                                                name="dateStart"
                                                value={newShotgun.dateStart}
                                                className={classes.textField}
                                                onChange={this.handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} lg={3} className={classes.textFieldContainer}>
                                            <TextField
                                                id="datetime-local"
                                                label="Date fin évènement"
                                                type="datetime-local"
                                                name="dateEnd"
                                                value={newShotgun.dateEnd}
                                                className={classes.textField}
                                                onChange={this.handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                </Grid>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={this.saveShotgun}
                                    className={classes.btnAddShotgun}
                                >
                                    Ajouter
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </div>
                <div className="admin_container">
                    <Typography variant="h6" className={classes.subTitle}>
                        <ChevronRightIcon className={classes.subTitleIcon}/>
                        Shotgun en cours
                    </Typography>
                        {activeShotgun.map((element,index) =>{
                            // let shotgunDate = format(date, "MMMM do, yyyy H:mma")
                            return this.displaySotgun(element,index,classes)
                        })}
                </div>
                <div className="admin_container">
                    <Typography variant="h6" className={classes.subTitle}>
                        <ChevronRightIcon className={classes.subTitleIcon}/>
                        Shotgun terminé
                    </Typography>
                    {unActiveShotgun.map((element,index) =>{
                        // let shotgunDate = format(date, "MMMM do, yyyy H:mma")
                        return this.displaySotgun(element,index,classes)
                    })}
                </div>

            </>

        )
    }
}

const styles = theme => ({
    subTitle: {
        marginTop: 10,
        marginBottom: 10,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    suggestionItem: {
        paddingLeft: 15,
        paddingBottom: 0,
        paddingTop: 0,
        fontSize: 14,
        minHeight: 30,
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
    container_createShotgun:{
        justifyContent: 'space-around',
    },
    btnAddShotgun: {
        marginTop: 10,
        marginBottom: 20,
        marginRight:5,
        marginLeft:5,
    },
});

export default withStyles (styles) (PollsManagement)
