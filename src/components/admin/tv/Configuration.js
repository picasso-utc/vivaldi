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

import { ajaxGet, ajaxPost } from '../../../utils/Ajax';

class Configuration extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            links : [],
            new_media : {

            },
            users : [],
            new_user : {
                login: '',
                right: 'M'
            },
            page: 0,
            rowsPerPage: 5,
            autoCompleteUsers: [],
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.loadTVs();
    }


    handleChange(event){
        this.setState({
            new_media: {
                ...this.state.new_media,
                [event.target.name]: event.target.value
            }
        })
    }

    loadTVs(){
        ajaxGet('tvs/').then(res => {
            this.setState({links: res.data})
        })
        .catch(error => {
            console.log(error)
        })
    }


    saveMedia(){
        //Traiter le cas où user déjà présent
        // ajaxPost('users/', this.state.new_user).then(res => {
        //     const new_user = res.data.user;
        //     let users = this.state.users;
        //     // On vérifie que l'utilisateur n'est pas déjà dans le tableau
        //     const index = users.findIndex(u => u.login === new_user.login);
        //     if (index >= 0) {
        //         users[index] = new_user;
        //     } else {
        //         users.push(new_user);
        //     }
        //     this.setState({users: users})
        // })
        // .catch(res => {

        // })
        // this.setState({
        //     new_user : {login: '', right: 'M'}
        // });
    }

        

    render(){
        
        const { classes } = this.props;

        const {links, new_media} = this.state;


        return (
            <div className={classes.container}>
                {/* <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Ajouter un nouvel média
                </Typography>
                <Grid container>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Nom"
                            className={classes.textField}
                            name="name"
                            value={new_media.name}
                            onChange={this.handleChange}
                            autoComplete="off"
                            margin="dense"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Nom"
                            className={classes.textField}
                            name="name"
                            value={new_media.name}
                            onChange={this.handleChange}
                            autoComplete="off"
                            margin="dense"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Button variant="outlined" color="primary" className={classes.addButton} size="large" onClick={this.saveMedia}>
                            Ajouter
                        </Button>
                    </Grid>
                </Grid> */}
                
                {/* <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Liste des médias
                </Typography> */}
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    Nom
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    URL
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {links.map((row, index) => (
                                <TableRow hover key={index} className={classes.row}>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.link.url}
                                    </TableCell>
                                    
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        
                                        <Button 
                                            variant="outlined" 
                                            size="small" 
                                            className={classes.btn} 
                                            // onClick={(e) => this.downgradeUser(e, row)}
                                        >
                                            Rétrograder
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
    // paper: {
    //     padding: 10
    // },
    // note: {
    //     backgroundColor: 'rgba(0,0,0, 0.05)',
    //     padding: 10
    // },
    // textField: {
    //     marginTop: 16,
    //     paddingRight: 15,
    //     width: "100%",
    // },
    // suggestions: {
    //     zIndex: 100,
    //     position: 'absolute',
    //     maxHeight: 200,
    //     overflowY: 'scroll',
    //     marginRight: 15,
    // },
    // suggestionItem: {
    //     paddingLeft: 15,
    //     paddingBottom: 0,
    //     paddingTop: 0,
    //     fontSize: 14,
    //     minHeight: 30,
    // },
    // addButton: {
    //     marginTop: 16,
    //     marginBottom: 8,
    //     height: 49,
    //     width: "100%",
    // },
    // subTitle: {
    //     marginTop: 10,
    //     marginBottom: 10,
    // },
    // subTitleIcon: {
    //     marginRight: 8,
    //     paddingTop: 5,
    // },
    // row: {
    //     height: 40,
    // },
    // cell: {
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     paddingRight: 10,
    //     paddingLeft: 10,
    // },
    // btn: {
    //     marginLeft: 5,
    //     marginRight: 5,
    //     marginTop: 3,
    // },
});

export default withStyles (styles) (Configuration)