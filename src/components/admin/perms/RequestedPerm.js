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
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class RequestedPerms extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            requested_perms : [],
            loading: true,
            perm_may_be_requested: false
        }

    }

    componentDidMount(){
        this.loadPermMayBeRequest();
    }


    loadPermMayBeRequest(){
        ajaxGet('perms/public/may/request').then(res => {
            this.setState({perm_may_be_requested: res.data.perm_may_be_requested})
			this.loadRequestedPerms();
		}).catch(error => {
            console.log(error)
		})
    }


    loadRequestedPerms(){
        ajaxGet('request/perm/').then(res => {
            this.setState({requested_perms: res.data.requested_perms, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleSliderChange(){
        const perm_may_be_requested = !this.state.perm_may_be_requested;
        ajaxPost('perms/update/may/request', {'perm_may_be_requested': perm_may_be_requested}).then(res => {
            this.setState({perm_may_be_requested: perm_may_be_requested})
        })
        .catch(error => {
            console.log(error);
        })
    }


    addPerm(requested_perm_index){

        let requested_perms = this.state.requested_perms;
        requested_perms[requested_perm_index].loading = true;
        this.setState({requested_perms: requested_perms})

        const requested_perm = this.state.requested_perms[requested_perm_index];
        const perm = {
            nom : requested_perm.nom,
            asso : requested_perm.asso,
            nom_resp: requested_perm.nom_resp,
            mail_resp : requested_perm.mail_resp
        }

        ajaxPost('perms/', perm).then(res => {
            ajaxPatch('request/perm/' + requested_perm.id + '/', {}).then(res => {
                requested_perms[requested_perm_index].added = true;
                requested_perms[requested_perm_index].loading = false;
                this.setState({requested_perms: requested_perms})
            })
            .catch(error => {
                requested_perms[requested_perm_index].loading = false;
                this.setState({requested_perms: requested_perms})
            })
        })
        .catch(error => {
            requested_perms[requested_perm_index].loading = false;
            this.setState({requested_perms: requested_perms})
        })
    }

        

    render(){
        
        const { classes } = this.props;

        const {requested_perms, loading, perm_may_be_requested} = this.state;


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
                <Grid container direction="row">
                    <Typography variant="h6" className={classes.subTitle}>
                        <ChevronRightIcon className={classes.subTitleIcon}/>
                        Configuration
                    </Typography>
                </Grid>
                <Grid container direction="row">
                    <FormControlLabel
                        control={
                            <Switch 
                                color="primary" 
                                checked={perm_may_be_requested}
                                value="perm_may_be_requested"
                                onChange={() => this.handleSliderChange()}
                            />
                        }
                        label="Demande de perm activée"
                        labelPlacement="start"
                    />
                </Grid>
                    Liste des demandes
                </Typography>
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    Perm
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Asso ?
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Responsable
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    #
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requested_perms.map((row, index) => (
                                <TableRow hover key={index} className={classes.row}>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.nom}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.asso? (
                                            <CheckIcon/>
                                        ):(
                                            <CloseIcon/>
                                        )}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.nom_resp}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        <Button 
                                            color="primary"
                                            variant="contained" 
                                            margin="dense"
                                            size="small"
                                            disabled={row.added}
                                            className={classes.btn} 
                                            // onClick={(e) => this.selectLink(e, row)}
                                        >
                                            {row.added ? (<span>Ajouté</span>) : (<span>Ajouter</span>)}
                                        </Button>                                     
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
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

export default withStyles (styles) (RequestedPerms)