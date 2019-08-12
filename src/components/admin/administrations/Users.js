import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';


import Grid from '@material-ui/core/Grid';

class Users extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            new_user : {
                login: '',
                right: 'M'
            },
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
                    <TrendingFlatIcon className={classes.subTitleIcon}/>
                    Ajouter un nouvel utilisateur
                </Typography>
                <Grid container className={classes.note}>
                    {/* <Typography variant="body2" > */}
                        Droits :<br/>
                        {/* </Typography> */}
                        <ul>
                            <li>Pas d'accès : Pas d'accès à Picsous.</li>
                            <li>User : Peut ajouter et modifier une perm, et gérer les articles de la perm.</li>
                            <li>Admin : Peut modifier l'ensemble des paramètres et gérer l'ensemble des factures.</li>
                        </ul>
                </Grid>
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
                    <TrendingFlatIcon className={classes.subTitleIcon}/>
                    Liste des utilisateurs
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headRows.map(row => (
                                <TableCell
                                    key={row.id}
                                    align={row.numeric ? 'right' : 'left'}
                                    padding={row.disablePadding ? 'none' : 'default'}
                                    // sortDirection={orderBy === row.id ? order : false}
                                >
                                    <TableSortLabel
                                    // active={orderBy === row.id}
                                    // direction={order}
                                    // onClick={createSortHandler(row.id)}
                                    >
                                    {row.label}
                                    {/* {orderBy === row.id ? (
                                        <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null} */}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {rows.map((row, index) => (
                            <TableRow
                                hover
                                // onClick={event => handleClick(event, row.name)}
                                role="checkbox"
                                // aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                // selected={isItemSelected}
                            >
                                <TableCell component="th" scope="row" padding="none">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    {row.right}
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    Test
                                </TableCell>
                            </TableRow>
                        ))} */}
                        {/* {stableSort(rows, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`; */}

                        {/* return (
                            <TableRow
                            hover
                            onClick={event => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                            >
                            <TableCell padding="checkbox">
                                <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        );
                        })} */}
                    {/* {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )} */}
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
        border: "2px solid #B22132",
    },
    paper: {
        padding: 10
    },
    note: {
        backgroundColor: 'rgba(0,0,0, 0.05)',
        padding: 10
    },
    textField: {
        marginTop: 16,
        paddingRight: 15,
        width: "100%"
    },
    button: {
        marginTop: 16,
        marginBottom: 8,
        height: 49,
        width: "100%",
        borderColor: '#B22132',
        color: '#B22132',
    },
    subTitle: {
        marginTop: 16,
        marginBottom: 16,
    },
    subTitleIcon: {
        marginRight: 8,
    }
});

export default withStyles (styles) (Users)