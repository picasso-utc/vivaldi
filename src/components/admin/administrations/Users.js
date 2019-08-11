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
    }

    render(){
        
        const { classes } = this.props;

        const currencies = [
            {
              value: 'USD',
              label: 'Aucun droit',
            },
            {
              value: 'EUR',
              label: 'Membre du Pic',
            },
            {
              value: 'BTC',
              label: 'Administrateur',
            },
          ];


        const values = [
            {
                currency: 'EUR',
            } 
        ]

        const headRows = [
            { id: 'name', numeric: false, disablePadding: true, label: 'Utilisateur' },
            { id: 'droit', numeric: true, disablePadding: false, label: 'Droit' },
        ];


        const rows = [
            {id: 'jpennors', name: 'Josselin Pennors (jpennors)', right: 'Admin'},
            {id: 'auvinali', name: 'Alix Auvin (auvinali)', right: 'Admin'},
        ];
          

        return (
            <div className={classes.container}>
                <h5 className={classes.subTitle}>
                    <TrendingFlatIcon className={classes.subTitleIcon}/>
                    Ajouter un nouvel utilisateur
                </h5>
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
                            type=""
                            name=""
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
                            value={values.currency}
                            // onChange={handleChange('currency')}
                            SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                            }}
                            margin="dense"
                            variant="outlined"
                        >
                            {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Button variant="outlined" className={classes.button} size="large">
                            Ajouter
                        </Button>
                    </Grid>
                </Grid>
                
                <h5 className={classes.subTitle}>
                    <TrendingFlatIcon className={classes.subTitleIcon}/>
                    Liste des utilisateurs
                </h5>
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