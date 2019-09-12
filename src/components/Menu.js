import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { ajaxGet, ajaxPost } from '../utils/Ajax'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { formateToDjangoDate } from '../utils/Date';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Menu extends Component {

  	constructor(props) {
		super(props)
		this.state = {
            orders: [],
            menu: {},
			loading: true,
		}
	}

    componentDidMount() {
        this.interval = setInterval(() => this.loadMenu(), 2000);
    }  
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

	loadMenu(){
        const menu_id = this.props.match.params.menu_id
        console.log(menu_id)
        ajaxGet('perms/menu/orders/' + menu_id).then(res => {
            this.setState({orders: res.data.orders, menu: res.data.menu, loading: false})
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    servedMenu(event, order){
        ajaxPost('perms/menu/served/' + order.id_transaction).then(res => {
            
        })
        .catch(error => {
            console.log(error);
        })
    }


    staffMenu(event, order){
        ajaxPost('perms/menu/staff/' + order.id_transaction).then(res => {
            
        })
        .catch(error => {
            console.log(error);
        })
    }

	

  	render() {
		  const { menu, orders, loading } = this.state
		const {classes} = this.props
		return(
			<React.Fragment>
				{loading ? (
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
				):(
					<div className={classes.container}>
						<Typography variant="h4" className={classes.title}>
							Menu - {menu.name}
						</Typography>
                        <Table>
                            <TableBody>
                                {orders.map((order, index) => (
                                    <TableRow hover key={index} className={classes.row}>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            {order.first_name} {order.last_name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            {order.quantity}
                                        </TableCell>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            {order.served? (
                                                <Button 
                                                    variant="outlined" 
                                                    size="small" 
                                                    color="secondary" 
                                                    className={classes.btn} 
                                                    onClick={(e) => this.servedMenu(e, order)}
                                                >
                                                    Annuler
                                                </Button>
                                            ):(
                                                <React.Fragment>
                                                    <Button 
                                                        variant="outlined" 
                                                        size="small" 
                                                        // color="primary" 
                                                        className={classes.btn} 
                                                        onClick={(e) => this.servedMenu(e, order)}
                                                    >
                                                        Valider
                                                    </Button>
                                                    <Button 
                                                        variant="outlined" 
                                                        size="small" 
                                                        color="secondary" 
                                                        className={classes.btn} 
                                                        onClick={(e) => this.staffMenu(e, order)}
                                                    >
                                                        Reporter
                                                    </Button>
                                                </React.Fragment>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
					</div>
				)}
				
			</React.Fragment>
		)
  	}
}

const styles = theme => ({
	container: {
		textAlign: 'justify',
		padding: 20,
		margin: 30,
		border: "1.5px solid #B22132",
	},
	title : {
		textAlign: 'center',
		textDecoration : 'underline #B22132',
		marginBottom: 30,
	},
	loader: {
        marginTop: 200,
    },
    btn: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
    },
})

Menu.propTypes = {
 	classes: PropTypes.object.isRequired
}

export default withStyles (styles)(Menu)
