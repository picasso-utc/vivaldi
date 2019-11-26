import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { ajaxGet, ajaxPost, ajaxDelete, ajaxPut } from '../../../utils/Ajax';

class GoodiesManagement extends Component{
 
    
    constructor(props) {
        super(props)
        this.state = {
            winners: [],
            loading: true,
            start_date: new Date(),
            end_date: new Date(),
        }

        this.generateGoodiesWinners = this.generateGoodiesWinners.bind(this);
        this.deleteGoodiesWinners = this.deleteGoodiesWinners.bind(this);
        this.updateGoodieWinner = this.updateGoodieWinner.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
    }


    componentDidMount(){
        this.loadGoodiesWinners()
    }

    loadGoodiesWinners(){
        ajaxGet('payutc/goodies').then(res => {
            this.setState({winners: res.data.winners, loading: false});
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false})
        })
    }


    handleStartDateChange(date){
        this.setState({start_date: date})
    }

    handleEndDateChange(date){
        this.setState({end_date: date})
    }

    formateDate(date){
        const day = ("0" + (date.getDate() + 1)).slice(-2);
        const month_number = ("0" + (date.getMonth() + 1)).slice(-2)
        const year = date.getFullYear();
        return year + "-" + month_number + "-" + day;
    }

    generateGoodiesWinners(){
        this.setState({loading: true})
        const start_date = this.formateDate(this.state.start_date);
        const end_date = this.formateDate(this.state.end_date)
        ajaxPost('payutc/goodies/', {start_date: start_date, end_date: end_date}).then(res => {
            this.setState({winners: res.data.winners, loading: false})
        })
        .catch(error => {
            console.log(error);
            this.setState({loading: false})
        })
    }

    deleteGoodiesWinners(){
        this.setState({loading: true})
        ajaxDelete('payutc/goodies/').then(res => {
            this.setState({winners: res.data.winners, loading: false})
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false})
        })
    }

    updateGoodieWinner(event, id){
        ajaxPut('payutc/goodies/' + id + '/').then(res => {
            let winners = [...this.state.winners]
            const index = winners.findIndex(w => w.id === id);
            if (index >= 0) {
                winners[index].picked_up = !winners[index].picked_up
            }
            this.setState({winners: winners})
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        
        const { classes } = this.props;
        const { winners, loading, start_date, end_date } = this.state;

        if (loading) {
            return (
                <Grid 
                    container 
                    className={classes.loader}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <CircularProgress className={classes.progress} />
                    </Grid>
                </Grid>
            )
        }

        return (
            <div className={classes.container}>

                                
                {winners.length === 0 ? (
                    <Grid container>
                        <Typography variant="h5" noWrap className={classes.subTitle}>
                            Pas de vainqueur pour le moment. 
                        </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label="Date de départ"
                                    name="start_date"
                                    value={start_date}
                                    onChange={this.handleStartDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label="Date de fin"
                                    name="end_date"
                                    value={end_date}
                                    onChange={this.handleEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    color="primary"
                                    className={classes.generate_btn}
                                    onClick={this.generateGoodiesWinners}
                                >
                                    Générer
                                </Button>
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                ):(
                    <div>
                        <Typography variant="h5" noWrap className={classes.subTitle}>
                            <ChevronRightIcon className={classes.subTitleIcon}/>
                            Liste des vainqueurs
                            <Button 
                                variant="outlined" 
                                size="small" 
                                className={classes.title_btn} 
                                color="secondary"
                                onClick={this.deleteGoodiesWinners}
                            >
                                Supprimer
                            </Button>
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Table size="small">
                                    <TableBody>
                                        {winners.slice(0,Math.ceil(winners.length/2))
                                        .map((row, index) => (
                                            <TableRow hover key={index} className={classes.row}>
                                                <TableCell component="th" scope="row" className={classes.cell}>
                                                    {row.winner}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className={classes.cell}>
                                                    {row.picked_up?(
                                                        <Button 
                                                            variant="outlined" 
                                                            size="small" 
                                                            className={classes.btn} 
                                                            color="secondary"
                                                            onClick={(e) => this.updateGoodieWinner(e, row.id)}
                                                        >
                                                            Annuler
                                                        </Button>
                                                    ):(
                                                        <Button 
                                                            variant="outlined" 
                                                            size="small" 
                                                            className={classes.btn} 
                                                            color="primary"
                                                            onClick={(e) => this.updateGoodieWinner(e, row.id)}
                                                        >
                                                            Reçu
                                                        </Button>
                                                    )
                                                }
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Table size="small">
                                    <TableBody>
                                        {winners.slice(Math.ceil(winners.length/2), winners.length)
                                        .map((row, index) => (
                                            <TableRow hover key={index} className={classes.row}>
                                                <TableCell component="th" scope="row" className={classes.cell}>
                                                    {row.winner}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className={classes.cell}>
                                                    {row.picked_up?(
                                                        <Button 
                                                            variant="outlined" 
                                                            size="small" 
                                                            className={classes.btn} 
                                                            color="secondary"
                                                            onClick={(e) => this.updateGoodieWinner(e, row.id)}
                                                        >
                                                            Annuler
                                                        </Button>
                                                    ):(
                                                        <Button 
                                                            variant="outlined" 
                                                            size="small" 
                                                            className={classes.btn} 
                                                            color="primary"
                                                            onClick={(e) => this.updateGoodieWinner(e, row.id)}
                                                        >
                                                            Reçu
                                                        </Button>
                                                    )
                                                }
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </div>
                )}

            </div>
        );
    };

}

const styles = theme => ({
    loader: {
        marginTop: 200,
    },
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: "2px solid #B22132",
    },
    subTitle:{
        marginBottom: 40,
    },
    title_btn: {
        marginLeft: 20,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    generate_btn: {
        margin: 20,
        marginTop: 30,
    },
});

export default withStyles (styles) (GoodiesManagement)