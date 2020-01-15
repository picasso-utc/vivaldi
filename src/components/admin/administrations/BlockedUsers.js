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
import { ajaxGet, ajaxPost, ajaxDelete } from '../../../utils/Ajax';
import { formateFromDjangoDate } from '../../../utils/Date';

class BlockedUsers extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            users : [],
            new_user : {
                login: '',
                justification: ''
            },
            autoCompleteUsers: [],
            loading: true
        }
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
        ajaxGet('blocked/users/').then(res => {
            let users = res.data.blocked_users;
            users = users.sort(function(a,b){
                if (a.name > b.name) {
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
        ajaxPost('blocked/users/', this.state.new_user).then(res => {
            const user = res.data.user;
            let users = this.state.users;
            users.push(user);
            this.setState({users: users})
        })
        .catch(res => {

        })
        this.setState({
            new_user : {login: '', justification: ''}
        });
    }

    

    deleteBlockedUser(user){
        ajaxDelete('blocked/users/' + user.id + '/').then(res => {
            const users = this.state.users.filter(u => u.id !== user.id);
            this.setState({users: users})
        })
        .catch(error => {

        })
    }
  

    render(){
        
        const { classes } = this.props;

        const {users, new_user, autoCompleteUsers, loading} = this.state;

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
                    Bloquer un utilisateur
                </Typography>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Nom de l'étudiant"
                            className={classes.textField}
                            name="login"
                            value={new_user.login}
                            onChange={(e) => this.handleChange(e)}
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
                            label="Motif"
                            className={classes.textField}
                            name="justification"
                            value={new_user.justification}
                            onChange={(e) => this.handleChange(e)}
                            margin="dense"
                            variant="outlined"
                        />    
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Button variant="contained" color="primary" className={classes.addButton} size="small" onClick={() => this.saveUser()}>
                            Ajouter
                        </Button>
                    </Grid>
                </Grid>
                
                <Typography variant="h6" className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Liste des utilisateurs bloqués
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>
                                Utilisateur
                            </TableCell>
                            <TableCell className={classes.cell}>
                                Motif
                            </TableCell>
                            <TableCell className={classes.cell}>
                                Depuis le
                            </TableCell>
                            <TableCell className={classes.cell}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row, index) => (
                            <TableRow hover key={index} className={classes.row}>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {row.name} 
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {row.justification} 
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    {formateFromDjangoDate(row.date)} 
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.cell}>
                                    <Button 
                                        variant="contained" 
                                        size="small" 
                                        className={classes.btn} 
                                        onClick={() => this.deleteBlockedUser(row)}
                                    >
                                        Débloquer
                                    </Button>                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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

export default withStyles (styles) (BlockedUsers)