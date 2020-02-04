import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ajaxGet, ajaxPost, ajaxPatch, ajaxDelete } from '../../../utils/Ajax';
import { formateFromDjangoDate } from '../../../utils/Date';


class ResourcesManagement extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            creneaux : [],
            creneau : {
                perm_id: '',
                date: '',
                creneau: 'M',
            },
            mode: 'create',
            open_modal: false,
            confirm_modal: false,
            loading: true,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.loadPerms();
    }


    handleChange(event){
        this.setState({
            creneau: {
                ...this.state.creneau,
                [event.target.name]: event.target.value
            }
        })
    }

    handleModalClickOpen = () => {
        this.setState({open_modal: true})
    }

    handleConfirmModalOpen(creneau){
        this.setState({creneau: creneau, confirm_modal: true})
    }

    handleModalClickClose = () => {
        this.setState({open_modal: false, confirm_modal: false})
        this.reloadNewCreneau();
    };


    selectCreneau = (event, creneau) => {
        this.setState({creneau: creneau, mode: 'edit'})
        this.handleModalClickOpen();
    }


    loadPerms(){
        ajaxGet('perms/').then(res => {
            let perms = res.data
            perms = perms.sort(function(a,b){
                if (a.nom > b.nom) {
                    return 1
                }
                return -1
            })
            this.setState({perms: perms})
            this.loadCreneaux();
        })
        .catch(error => {
            console.log(error)
        })
    }


    loadCreneaux(){
        ajaxGet('creneau/').then(res => {
            let creneaux = res.data
            creneaux = creneaux.sort(function(a,b){
                if (a.date > b.date) {
                    return -1
                }
                return 1
            })
            this.setState({creneaux: creneaux, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }

    reloadNewCreneau(){
        this.setState({creneau: {
            perm_id: '',
            date: '',
            crneau: 'M',     
        }, mode: 'create'})
    }


    saveCreneau(){
        const creneau = this.state.creneau
        if(this.state.mode === "create"){
            ajaxPost('creneau/', creneau).then((res) => {  
                const new_creneau = res.data;
                let creneaux = [...this.state.creneaux];
                creneaux.unshift(new_creneau);
                this.setState({creneaux: creneaux})
                this.handleModalClickClose();
            })
            .catch((error) => {
                console.log(error);
            })  
        } else if (this.state.mode === "edit"){
            const data = {
                creneau: creneau.creneau,
                date: creneau.date,
                perm_id: creneau.perm_id
            }
            ajaxPatch('creneau/' + creneau.id + '/', data).then((res) => {
                let creneaux = [...this.state.creneaux];
                const updated_creneau_index = creneaux.findIndex(c => c.id === creneau.id);
                if (updated_creneau_index > -1) {
                    creneaux[updated_creneau_index].perm_id = data.perm_id;
                    creneaux[updated_creneau_index].date = data.date;
                    creneaux[updated_creneau_index].creneau = data.creneau;
                }
                this.setState({creneaux: creneaux})
                this.handleModalClickClose();
            })
            .catch((error) => {
                console.log(error);
            }) 
        }
    }


    deleteCreneau(creneau_id){
        ajaxDelete('creneau/' + creneau_id + '/').then(() => {
            let creneaux = this.state.creneaux;
            creneaux = creneaux.filter(c => c.id !== creneau_id)
            this.setState({creneaux: creneaux, confirm_modal: false})
        })
        .catch((error) => {

        })
    }

        

    render(){
        
        const { classes } = this.props;

        const {creneau, creneaux, perms, mode, open_modal, confirm_modal, loading} = this.state;

        const creneau_types = [
            {value: "M", label: "Matin"},
            {value: "D", label: "Midi"},
            {value: "S", label: "Soir"}
        ]


        if (loading) {
            return (
                <Grid 
                    container 
                    className="admin_loader"
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <CircularProgress/>
                    </Grid>
                </Grid>
            )
        }

        return (
            <div className="admin_container">
                <Typography variant="h5" className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Liste des créneaux
                    <Fab 
                        size="small" 
                        color="primary" 
                        className={classes.add_item}
                        onClick={(e) => this.handleModalClickOpen()}
                    >
                        <AddIcon />
                    </Fab>
                </Typography>
                <Typography variant="body1">
                    **Note : Les créneaux ayant déjà des articles leur étant associés ne peuvent être supprimés.
                </Typography>
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    #
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Perm
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Date
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Type
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {creneaux.map((row, index) => (
                                <TableRow hover key={index} className={classes.row}>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.perm.nom}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {formateFromDjangoDate(row.date)}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.creneau === "M" && <span>Matin</span>}
                                        {row.creneau === "D" && <span>Midi</span>}
                                        {row.creneau === "S" && <span>Soir</span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        <Button 
                                            color="primary"
                                            variant="contained" 
                                            margin="dense"
                                            size="small"
                                            className={classes.btn} 
                                            onClick={(e) => this.selectCreneau(e, row)}
                                        >
                                            Consulter
                                        </Button>
                                        <Button 
                                            color="secondary"
                                            variant="contained" 
                                            margin="dense"
                                            size="small"
                                            disabled={row.article_set && row.article_set.length > 0}
                                            className={classes.btn} 
                                            onClick={() => this.handleConfirmModalOpen(row)}
                                        >
                                            Supprimer
                                        </Button>                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Dialog 
                    onClose={this.handleModalClickClose} 
                    open={open_modal} 
                    maxWidth="lg"
                    width="lg"
                    scroll="body"
                >
                    <DialogTitle onClose={this.handleModalClickClose}>
                        {mode === "edit"? (
                            <span>Créneau : {creneau.perm && <span>{creneau.perm.nom}</span>} - {formateFromDjangoDate(creneau.date)}</span>
                        ):
                        (
                            <span>Ajouter un nouveau créneau</span>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container direction="row">
                            <TextField
                                select
                                label="Perm"
                                className={classes.textField}
                                name="perm_id"
                                value={creneau.perm_id}
                                onChange={this.handleChange}
                                margin="dense"
                                fullWidth
                                variant="outlined"
                            >
                                {perms.map(perm => (
                                <MenuItem key={perm.id} value={perm.id}>
                                    {perm.nom}
                                </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Date (aaaa-mm-jj)"
                                className={classes.textField}
                                value={creneau.date}
                                onChange={this.handleChange}
                                name="date"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                select
                                label="Type"
                                className={classes.textField}
                                name="creneau"
                                value={creneau.creneau}
                                onChange={this.handleChange}
                                margin="dense"
                                fullWidth
                                variant="outlined"
                            >
                                {creneau_types.map(type => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Button 
                                onClick={() => this.saveCreneau()} 
                                variant="contained" 
                                color="primary"
                                margin="dense"
                                size="small"
                                style = {{marginTop: 30}}
                            >
                                Enregistrer
                            </Button>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={confirm_modal}
                    onClose={() => this.handleModalClickClose()}
                >
                    <DialogTitle>Suppresion: {creneau.perm && <span>{creneau.perm.nom}</span>} - {formateFromDjangoDate(creneau.date)}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Veux-tu vraiment supprimer ce créneau ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            color="secondary"
                            variant="contained" 
                            margin="dense"
                            size="small"
                            className={classes.btn} 
                            onClick={(e) => this.deleteCreneau(creneau.id)}
                        >
                            Supprimer
                        </Button>    
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

}

const styles = theme => ({
    rootTable : {
        width: '100%',
        overflowX: 'auto'
    },
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: "1.5px solid #B22132",
    },
    subTitle: {
        marginBottom: 40,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    add_item : {
        marginLeft: 10,
    },
    btn : {
        margin: 5,
    },
});

export default withStyles (styles) (ResourcesManagement)