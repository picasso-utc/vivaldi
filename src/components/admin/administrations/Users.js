import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import ajaxPost from '../../../utils/Ajax';

class Users extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            new_user : {
                login: '',
                right: 'M'
            },
            page: 0,
            rowsPerPage: 5,
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChange(event){
        this.setState({
            new_user: {
                ...this.state.new_user,
                [event.target.name]: event.target.value
            }
        })
    }

    saveUser(){
        // TO DO save in API
        // ajaxPost()
        this.setState({
            new_user : {login: '', right: 'M'}
        });
    }

    handleChangePage(event, newPage){
        this.setState({page: newPage});
    }
        

    render(){
        
        const { classes } = this.props;

        const {new_user, page, rowsPerPage} = this.state;

        const rights = [
            { value: 'N', label: 'Aucun droit' },
            { value: 'M', label: 'Membre du Pic' },
            { value: 'A', label: 'Administrateur' },
        ];


        const rows = [
            {id: 'jpennors', name: 'Josselin Pennors (jpennors)', right: 'A'},
            {id: 'auvinali', name: 'Alix Auvin (auvinali)', right: 'Membre'},
            {id: 'jpennors2', name: 'Josselin Pennors (jpennors)', right: 'N'},
            {id: 'auvinali3', name: 'Alix Auvin (auvinali)', right: 'A'},
            {id: '1jpennors', name: 'Josselin Pennors (jpennors)', right: 'A'},
            {id: 'a2uvinali', name: 'Alix Auvin (auvinali)', right: 'M'},
            {id: 'jp4ennors', name: 'Josselin Pennors (jpennors)', right: 'M'},
            {id: 'auv5inali', name: 'Alix Auvin (auvinali)', right: 'M'},
        ];

        return (
            <div className={classes.container}>
                <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Ajouter un nouvel utilisateur
                </Typography>
                {/* <Grid container className={classes.note}>
                        Droits :<br/>
                        <ul>
                            <li>Pas d'accès : Pas d'accès à Picsous.</li>
                            <li>User : Peut ajouter et modifier une perm, et gérer les articles de la perm.</li>
                            <li>Admin : Peut modifier l'ensemble des paramètres et gérer l'ensemble des factures.</li>
                        </ul>
                </Grid> */}
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            id="outlined-email-input"
                            label="Nom de l'étudiant"
                            className={classes.textField}
                            name="login"
                            value={new_user.login}
                            onChange={this.handleChange}
                            autoComplete=""
                            margin="dense"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={8} sm={5}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Droit de l'utilisateur"
                            className={classes.textField}
                            name="right"
                            value={new_user.right}
                            onChange={this.handleChange}
                            margin="dense"
                            variant="outlined"
                        >
                            {rights.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Button variant="outlined" color="primary" className={classes.addButton} size="large" onClick={this.saveUser}>
                            Ajouter
                        </Button>
                    </Grid>
                </Grid>
                
                <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Liste des utilisateurs
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Utilisateur
                            </TableCell>
                            <TableCell>
                                Droit
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                            <TableRow hover key={index} className={classes.row}>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {row.right}
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {row.right == "A" && (
                                        <Button variant="outlined" size="small" className={classes.btn} onClick={this.saveUser}>
                                            Rétrograder
                                        </Button>
                                    )}
                                    {row.right == "M" && (
                                        <Button variant="outlined" size="small" color="primary" className={classes.btn} onClick={this.saveUser}>
                                            Upgrader
                                        </Button>
                                    )}
                                    {row.right == "N" ? (
                                        <Button variant="outlined" size="small" color="primary" className={classes.btn} onClick={this.saveUser}>
                                            Accès
                                        </Button>
                                    ): (
                                        <Button variant="outlined" size="small" color="secondary" className={classes.btn} onClick={this.saveUser}>
                                            Supprimer
                                        </Button>
                                    )}
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={this.handleChangePage}
                />
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
    paper: {
        padding: 10
    },
    // note: {
    //     backgroundColor: 'rgba(0,0,0, 0.05)',
    //     padding: 10
    // },
    textField: {
        marginTop: 16,
        paddingRight: 15,
        width: "100%"
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

export default withStyles (styles) (Users)