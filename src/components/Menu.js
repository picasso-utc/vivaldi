import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { ajaxGet, ajaxPost } from '../utils/Ajax'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Auth from '../utils/Auth';

class Menu extends Component {

  	constructor(props) {
		super(props)
		this.state = {
            menus: [],
            selected_article: '',
            orders: [],
            menu: {},
            loading: true,
            open_login: false,
            user_credentials: {
                username: '',
                pin: '',
            },
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.selectMenu = this.selectMenu.bind(this)
        this.loginBadge = this.loginBadge.bind(this)
	}

    componentDidMount() {
        this.checkAuth()
       
    }  
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    checkAuth(){
        Auth.checkAuth().then(res => {
            this.loadMenus();
        })
        .catch(error => {
            this.setState({open_login: true})
        })
    }

    loginBadge(event){
        Auth.loginUsername(this.state.user_credentials).then(res => {
            Auth.checkAuth().then(res => {
                this.setState({open_login: false})
                Auth.authenticateUser(res.data);
                this.loadMenus();
            })
            .catch(error => {
                window.location.reload();
            })
        })
        .catch(error => {
            window.location.reload();
        });
    }


    handleChange(event) {
		this.setState({
            user_credentials: {
                ...this.state.user_credentials,
                [event.target.name]: event.target.value
            }
        })
	}

	loadMenus(){
        ajaxGet('perm/menus/').then(res => {
            const query = new URLSearchParams(this.props.location.search);
            const selected_article = query.get('selected_article');
            if (selected_article) {
                this.setState({selected_article: selected_article})
            }
            this.setState({menus: res.data, loading: false});
            this.interval = setInterval(() => this.loadSelectedMenu(), 2000);
        })
        .catch(error => {
            window.location.reload();
        })
    }
    

    loadSelectedMenu(){
        const menus = [...this.state.menus];
        const menu = menus.find(m => m.article.id.toString() === this.state.selected_article.toString())
        if (menu && menu.article && menu.article.id_payutc) {
            ajaxGet('perms/menu/orders/' + menu.article.id_payutc).then(res => {
                this.setState({orders: res.data.orders, menu: res.data.menu, loading: false})
            })
            .catch(error => {
                window.location.reload();
            })  
        }
        
    }

    selectMenu(event){
        this.setState({selected_article: event.target.value, orders: [], menu: {}})
    }

    servedMenu(event, order){
        ajaxPost('perms/menu/served/' + order.id_transaction).then(res => {
            
        })
        .catch(error => {
            window.location.reload();
        })
    }


    staffMenu(event, order){
        ajaxPost('perms/menu/staff/' + order.id_transaction).then(res => {
            
        })
        .catch(error => {
            window.location.reload();
        })
    }

	

  	render() {
		  const { menus, selected_article, menu, orders, loading, open_login, user_credentials } = this.state
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
                        {selected_article &&
                            <React.Fragment>
                                <Typography variant="h4" className={classes.title}>
                                    Menu - {menu.name}
                                </Typography>
                                <Typography variant="h6" className={classes.subtitle}>
                                    {menu.total_quantity} / {menu.quantity} - Menus servis : {menu.served_quantity}
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
                                                            variant="contained" 
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
                                                                variant="contained" 
                                                                size="small" 
                                                                color="primary" 
                                                                className={classes.btn} 
                                                                onClick={(e) => this.servedMenu(e, order)}
                                                            >
                                                                Valider
                                                            </Button>
                                                            <Button 
                                                                variant="contained" 
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
                            </React.Fragment>
                        }
                        <Grid 
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={10} md={6}>
                                <TextField
                                    select
                                    label="Sélection du menu"
                                    className={classes.menu_selection}
                                    value={selected_article}
                                    onChange={this.selectMenu}
                                    margin="dense"
                                    variant="outlined"
                                >
                                    {menus.map(menu => (
                                    <MenuItem key={menu.article.id} value={menu.article.id}>
                                        {menu.article.nom}
                                    </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
					</div>
                )}
                
                <Dialog open={open_login} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Connexion Badge</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Login"
                            type="text"
                            fullWidth
                            name="username"
                            value={user_credentials.username}
                            onChange={this.handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Pin"
                            type="password"
                            fullWidth
                            name="pin"
                            value={user_credentials.pin}
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.loginBadge} color="primary">
                        Se connecter
                    </Button>
                    </DialogActions>
                </Dialog>
				
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
    subtitle : {
		textAlign: 'center',
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
    menu_selection: {
        width: '100%'
    },
    cell: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
    },
})

Menu.propTypes = {
 	classes: PropTypes.object.isRequired
}

export default withStyles (styles)(Menu)
