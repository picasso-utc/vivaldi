import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import {
    InputLabel,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import GridList from "@material-ui/core/GridList";
import {ajaxGet} from "../utils/Ajax";
import FormControl from "@material-ui/core/FormControl";

class PermGen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            personnesPerm:[],
            dayType:[],
            currentTypeDay: '',
            postes: [],
            listJobs: [],
        }
        this.handleChangeTextField = this.handleChangeTextField.bind(this)
        this.addPerson = this.addPerson.bind(this)
        this.loadTypeDay = this.loadTypeDay.bind(this)
        this.handleChangeDay = this.handleChangeDay.bind(this)
    }

    componentDidMount() {
        this.loadTypeDay()
    }

    deleteItem(n){
        let temp = this.state.personnesPerm
        temp.splice(n,1)
        this.setState({personnesPerm:temp})
    }

    loadTypeDay(){
        ajaxGet('planning_day_type/').then(res =>{
            this.setState({dayType:res.data})
        })
    }

    loadJobs(){
        ajaxGet('planning')
    }

    addPerson(){
        this.setState(
            {personnesPerm:this.state.personnesPerm.concat(this.state.nom)}
        )
        this.setState({nom:''})
    }

    loadDayTabl(){
        // ajaxGet()
    }

    handleChangeTextField(e){
        this.setState({nom:e.target.value})
    }

    handleChangeDay(e){
        this.setState({currentTypeDay:e.target.value})
        ajaxGet('planning_job/?id_day='+e.target.value).then(res =>{
            let listJobs = []
            let listCreneau = {}

            res.data.map((value,index) => {
                if (!listJobs.includes(value.titre)){
                    listJobs.push(value.titre)
                    listCreneau[value.titre] = []
                }
                listCreneau[value.titre].push([value.hour,value.nb])
            })
            this.setState({listJobs: listJobs})
            this.setState({listCreneau: listCreneau})
            this.setState({postes: res.data})
        })

    }

    render() {
        const { classes} = this.props;
        const { nom , personnesPerm, dayType, listJobs} = this.state
        return(
            <Grid container direction="row">
                <Typography variant="h6" className={classes.subTitle}>
                    PermGen2000
                </Typography>
                <Grid container justify="center" alignItems="center" >
                    <Typography variant="h6">Nom perm (TODO)</Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Type de perm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.currentTypeDay}
                            onChange={this.handleChangeDay}
                        >
                            {dayType.map((val,index) => {
                                return <MenuItem value={val.id}>{val.nom}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} sm={6} lg={3} className={classes.textFieldContainer}>
                        <TextField
                            label="Ajouter un membre"
                            className={classes.textField}
                            name="nom"
                            value={nom}
                            onChange={this.handleChangeTextField}
                            autoComplete="off"
                            margin="dense"
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputProps={{ style: { fontSize: 12 } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3} className={classes.textFieldContainer}>
                    <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={this.addPerson}
                            className={classes.btnAddMember}
                        >
                            Ajouter
                        </Button>
                    </Grid>
                </Grid>

                <List className={classes.root}>
                    <Grid container>
                        {personnesPerm.map((person, index) =>{
                            return(
                                <ListItem key={index} role={undefined} dense button className={classes.listItem}>
                                    <ListItemText primary={person} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <DeleteOutlineIcon onClick={()=>this.deleteItem(index)}/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </Grid>
                </List>

                <Paper className={classes.paper_box}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="center side_padding8">Poste</TableCell>
                                <TableCell className="center side_padding8">17h30-18h</TableCell>
                                <TableCell className="center side_padding8">18h-18h30</TableCell>
                                <TableCell className="center side_padding8">18h30-19h</TableCell>
                                <TableCell className="center side_padding8">19h-19h30</TableCell>
                                <TableCell className="center side_padding8">19h30-20h</TableCell>
                                <TableCell className="center side_padding8">20h-20h30</TableCell>
                                <TableCell className="center side_padding8">20h30-21h</TableCell>
                                <TableCell className="center side_padding8">21-21h30</TableCell>
                                <TableCell className="center side_padding8">21h30-22h</TableCell>
                                <TableCell className="center side_padding8">22h-23h</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listJobs.map((job,index ) => {

                                return (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="caption" display="block" gutterBottom className={classes.day} noWrap>
                                                <strong>{job.titre}</strong>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        )
    }
}

const styles = theme => ({
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
    btnAddMember: {
        marginLeft:20,
    },
    listItem:{
        width: 300,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
})

export default withStyles(styles)(PermGen)
