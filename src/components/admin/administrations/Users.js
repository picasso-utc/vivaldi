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
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ajaxGet, ajaxPost } from '../../../utils/Ajax';

class Users extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            users : [],
            new_user : {
                login: '',
                right: 'M'
            },
            page: 0,
            rowsPerPage: 5,
            autoCompleteUsers: [],
            loading: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.autoCompleteQuery = this.autoCompleteQuery.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.upgradeUser = this.upgradeUser.bind(this);
        this.downgradeUser = this.downgradeUser.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.giveaccesUser = this.giveaccesUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount(){
        this.loadUsers();
    }


    handleChange(event){
        this.setState({
            new_user: {
                ...this.state.new_user,
                [event.target.name]: event.target.value
            }
        })
        if (event.target.name === 'login') {
            if (event.target.value){
                this.autoCompleteQuery(event.target.value)
            } else {
                this.setState({autoCompleteUsers: []})
            }
        }
    }


    // Méthode pour obtenir de Payutc des auto complétions
    // via la valeur entrée
    autoCompleteQuery(query){
        ajaxGet('payutc/user/autocomplete/' + query).then(res => {
            this.setState({autoCompleteUsers: res.data.users});
        })
        .catch(error => {

        })
    }


    loadUsers(){
        ajaxGet('users').then(res => {
            let users = res.data.users;
            users = users.sort(function(a,b){
                if (a.user.prenom > b.user.prenom) {
                    return 1
                }
                return -1
            })
            this.setState({users: users, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }


    selectUser(name){
        const regex = name.match(/\(.*\)/).toString()
        const login = regex.substring(1,9)
        this.setState({
            new_user: {
                ...this.state.new_user,
                login: login,
            },
            autoCompleteUsers: [],
        })
    }


    saveUser(){
        //Traiter le cas où user déjà présent
        ajaxPost('users/', this.state.new_user).then(res => {
            const new_user = res.data.user;
            let users = this.state.users;
            // On vérifie que l'utilisateur n'est pas déjà dans le tableau
            const index = users.findIndex(u => u.login === new_user.login);
            if (index >= 0) {
                users[index] = new_user;
            } else {
                users.push(new_user);
            }
            this.setState({users: users})
        })
        .catch(res => {

        })
        this.setState({
            new_user : {login: '', right: 'M'}
        });
    }


    upgradeUser(event, user){
        user.right = 'A';
        this.updateUser(user)
    }

    
    downgradeUser(event, user){
        user.right = 'M';
        this.updateUser(user)
    }

    
    giveaccesUser(event, user){
        user.right = 'M';
        this.updateUser(user)
    }

    
    deleteUser(event, user){
        user.right = 'N';
        this.updateUser(user)
    }

    
    updateUser(user){
        ajaxPost('users/', user).then(res => {
            let users = this.state.users;
            const index = users.findIndex(u => u.login === user.login);
            if (index >= 0) {
                users[index] = res.data.user;
                this.setState({users: users})
            }   
        })
        .catch(error => {

        })
    }

    
    handleChangePage(event, newPage){
        this.setState({page: newPage});
    }
        

    render(){
        
        const { classes } = this.props;

        const {users, new_user, autoCompleteUsers, page, rowsPerPage, loading} = this.state;

        const rights = [
            { value: 'N', label: 'Aucun droit' },
            { value: 'M', label: 'Membre du Pic' },
            { value: 'A', label: 'Administrateur' },
        ];

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
                <Typography variant="h6" className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Ajouter un nouvel utilisateur
                </Typography>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Nom de l'étudiant"
                            className={classes.textField}
                            name="login"
                            value={new_user.login}
                            onChange={this.handleChange}
                            autoComplete="off"
                            margin="dense"
                            variant="outlined"
                        />
                        <Paper className={classes.suggestions}>
                            {autoCompleteUsers.map((suggestion, index)=> (
                                <MenuItem
                                    className={classes.suggestionItem}
                                    key={index}
                                    component="div"
                                    onClick={()=>this.selectUser(suggestion.name.split('-')[0])}
                                >
                                    {suggestion.name.split('-')[0]}
                                </MenuItem>
                            ))}
                            
                        </Paper>
                    </Grid>
                    <Grid item xs={8} sm={5}>
                        <TextField
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
                        <Button variant="contained" color="primary" className={classes.addButton} size="small" onClick={this.saveUser}>
                            Ajouter
                        </Button>
                    </Grid>
                </Grid>
                
                <Typography variant="h6" className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Liste des utilisateurs
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>
                                Utilisateur
                            </TableCell>
                            <TableCell className={classes.cell}>
                                Droit
                            </TableCell>
                            <TableCell className={classes.cell}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                            <TableRow hover key={index} className={classes.row}>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {row.user && row.user.prenom} {row.user && row.user.nom} ({row.login})
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {row.right_detail}
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {row.right === "A" && (
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            className={classes.btn} 
                                            onClick={(e) => this.downgradeUser(e, row)}
                                        >
                                            Rétrograder
                                        </Button>
                                    )}
                                    {row.right === "M" && (
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            color="primary" 
                                            className={classes.btn} 
                                            onClick={(e) => this.upgradeUser(e, row)}
                                        >
                                            Upgrader
                                        </Button>
                                    )}
                                    {row.right === "N" ? (
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            color="primary" 
                                            className={classes.btn} 
                                            onClick={(e) => this.giveaccesUser(e, row)}
                                        >
                                            Accès
                                        </Button>
                                    ): (
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            color="secondary" 
                                            className={classes.btn} 
                                            onClick={(e) => this.deleteUser(e, row)}
                                        >
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
                    count={users.length}
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
        border: "1.5px solid #B22132",
    },
    paper: {
        padding: 10
    },
    textField: {
        marginTop: 16,
        paddingRight: 15,
        width: "100%",
    },
    suggestions: {
        zIndex: 100,
        position: 'absolute',
        maxHeight: 200,
        overflowY: 'scroll',
        marginRight: 15,
    },
    suggestionItem: {
        paddingLeft: 15,
        paddingBottom: 0,
        paddingTop: 0,
        fontSize: 14,
        minHeight: 30,
    },
    addButton: {
        marginTop: 16,
        marginBottom: 8,
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
        paddingRight: 10,
        paddingLeft: 10,
    },
    btn: {
        margin: 5
    },
});

export default withStyles (styles) (Users)