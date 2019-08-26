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
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import { ajaxGet, ajaxPost, ajaxDelete, ajaxPut } from '../../../utils/Ajax';

class GoodiesManagement extends Component{
 
    
    constructor(props) {
        super(props)
        this.state = {
            winners: [],
            loading: true,
        }

        this.generateGoodiesWinners = this.generateGoodiesWinners.bind(this);
        this.deleteGoodiesWinners = this.deleteGoodiesWinners.bind(this);
        this.updateGoodieWinner = this.updateGoodieWinner.bind(this)
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

    generateGoodiesWinners(){
        this.setState({loading: true})
        ajaxPost('payutc/goodies/').then(res => {
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
            let winners = [ ... this.state.winners]
            const index = winners.findIndex(w => w.id == id);
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
        const { winners, loading } = this.state;

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

                                
                {winners.length == 0 ? (
                    <Grid container>
                        <Typography variant="h5" noWrap className={classes.subTitle}>
                            Pas de vainqueur pour le moment 
                        </Typography>
                        <Button 
                            variant="outlined" 
                            size="small" 
                            color="primary"
                            className={classes.title_btn}
                            onClick={this.generateGoodiesWinners}
                        >
                            Générer
                        </Button>
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
                        <Table>
                            <TableBody>
                                {winners.map((row, index) => (
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
    title_btn: {
        marginLeft: 20,
    },
});

export default withStyles (styles) (GoodiesManagement)