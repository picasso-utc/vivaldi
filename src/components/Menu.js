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
import DialogContentText from '@material-ui/core/DialogContentText';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Auth from '../utils/Auth';
import SnackbarComponent from '../utils/SnackbarComponent';

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
            stack_information : [],
            snackbar: {
				open: false,
				variant: 'success',
                message: '',
			},
            saving: false,
            confirm_modal: false,
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
            this.setState({menus: res.data, loading: false, orders: [], menu: {}, stack_information:[], selected_article: ''});
            if (selected_article) {
                this.setState({selected_article: selected_article})
            }
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
                // On synchronise le stack avec le retour de l'API
                let stack_information = [...this.state.stack_information];
                let stack_index_to_remove = [];
                let orders = res.data.orders;
                for (let index = 0; index < stack_information.length; index++) {
                    const stack = stack_information[index];
                    const order_index = orders.find(order => order.id_transaction === stack.id_transaction);
                    if (order_index > -1) {
                        // Si la commande existe bien on compare les informations avec ce qu'il y a dans le stack
                        if (orders[order_index].served === stack.served && orders[order_index].is_staff === stack.is_staff) {
                            // Si les informations sont calés entre l'API et le stack on supprime l'élément du stack
                            stack_index_to_remove.push(stack.id_transaction);
                        }
                        // Sinon on garde l'élément dans le stack, on met à jour order
                        orders.splice(order_index, 1);
                        if (!stack.served) {
                            // Si le stack note la commande comme non servi, on la met en haut de la liste
                            orders.splice(0,0,stack);
                        } else {
                            // Sinon on met la commande à la fin
                            orders.push(stack);
                        }
                    } else {
                        // Si la commande n'existe pas, on la supprime du stack car on considère qu'elle a été annulée
                        stack_index_to_remove.push(stack.id_transaction);
                    }
                    // On met à jour les informations du stack
                    stack_information = stack_information.filter(stack =>  !stack_index_to_remove.includes(stack.id_transaction))
                }
                this.setState({orders: res.data.orders, menu: res.data.menu, stack_information: stack_information, loading: false})
            })
            .catch(error => {
                window.location.reload();
            })
        }
    }


    areMenusAllServed(){
        const orders = this.state.orders;
        if (orders.length > 0) {
            let all_served = true;
            for (let index = 0; index < orders.length; index++) {
                const element = orders[index];
                if(!element.served){
                    all_served = false;
                    break;
                }
            }
            return all_served
        }
        return false;
    }


    selectMenu(event){
        this.setState({selected_article: event.target.value, orders: [], menu: {}, stack_information:[]})
    }

    servedMenu(event, order){
        // On récupère le stack et on cherche la commande dans les commandes du state
        let stack_information = [...this.state.stack_information];
        let orders = [...this.state.orders];
        let order_index = orders.findIndex(order_in_state => order_in_state.id_transaction === order.id_transaction)

        if (order_index > - 1) {
            // On modifie la commande en changeant son attribut served
            let order_edited = orders[order_index];
            order_edited.served = !order_edited.served;
            // Si la commande a été servie on la met à la fin de la liste de commmande
            if (order_edited.served) {
                orders.splice(order_index, 1);
                orders.push(order_edited);
            } else {
                // Suppression élément
                orders.splice(order_index,1)
                // Ajout en première position
                orders.splice(0,0, order_edited)
                console.log(orders);
            }
            stack_information.push(order_edited);
            // On envoie l'appel à la bdd
            this.setState({stack_information: stack_information, orders: orders});
            ajaxPost('perms/menu/served/' + order.id_transaction).then(res => {
                let message = "Le service du menu de " + order.first_name + " a été annulé";
                if (order.served) {
                    message = 'Le menu de ' + order.first_name + ' a été validé';
                }
                this.changeSnackbarState(true, 'success', message);
            })
            .catch(error => {
                window.location.reload();
            })
        }

    }


    staffMenu(event, order){
        // On récupère le stack et on cherche la commande dans les commandes du state
        let stack_information = [...this.state.stack_information];
        let orders = [...this.state.orders];
        stack_information.push(order);
        let order_index = orders.findIndex(order_in_state => order_in_state.id_transaction === order.id_transaction)

        if (order_index > - 1) {
            // On modifie la commande en changeant son attribut is_staff
            let order_edited = orders[order_index];
            order_edited.is_staff = true;
            // On peut seulement déclarer un menu comme staff, par conséquent on le met à la fin de la liste
            // Aucune posibilité de revenir en arrière et de mettre la commande en haut de la liste
            orders.splice(order_index, 1);
            orders.push(order_edited);
            this.setState({stack_information: stack_information, orders: orders});
            ajaxPost('perms/menu/staff/' + order.id_transaction).then(res => {
                this.changeSnackbarState(true, 'success', 'Le menu de ' + order.first_name + ' a été reporté');
            })
            .catch(error => {
                window.location.reload();
            })
        }
    }


    changeSnackbarState(open, variant, message){
		this.setState({
			snackbar: {
				open: open,
				variant: variant,
				message: message
			}
		})
    }


    handleConfirmModalOpen(){
        this.setState({confirm_modal: true})
    }

    handleModalClickClose = () => {
        this.setState({confirm_modal: false})
    };


    deleteMenu(event, menu){
        console.log(menu)
        ajaxPost('perms/menu/closed/' + menu.id_payutc, {}).then(res => {
            this.changeSnackbarState(true, 'success', 'Le menu a été supprimé');
            this.loadMenus();
            this.handleModalClickClose();
        }).catch(error => {
            this.changeSnackbarState(true, 'error', 'Une erreur est survenue lors de la suppression du menu');
        })
    }


  	render() {
		  const { menus, selected_article, menu, orders, loading, open_login, user_credentials, snackbar, confirm_modal } = this.state
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
					<div className="basic_container">
                        {selected_article &&
                            <React.Fragment>
                                <Typography variant="h4" className={classes.title}>
                                    Menu - {menu.name}
                                </Typography>
                                <Typography variant="h6" className={classes.subtitle}>
                                    {menu.total_quantity} / {menu.quantity} - Menus servis : {menu.served_quantity}
                                </Typography>
                                {this.areMenusAllServed() &&
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            className={classes.delete_btn}
                                            onClick={() => this.handleConfirmModalOpen()}
                                        >
                                            Supprimer Menu
                                        </Button>
                                    </Grid>
                                }
                                <div className="responsive_table">
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
                                </div>
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

                <Dialog
                    open={confirm_modal}
                    onClose={() => this.handleModalClickClose()}
                >
                    <DialogTitle>{"Suppresion: " + menu.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Veux-tu vraiment supprimer ce menu ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="secondary"
                            variant="contained"
                            margin="dense"
                            size="small"
                            className={classes.btn}
                            // onClick={(e) => this.deleteMedia(media.id)}
                            onClick={(e) => this.deleteMenu(e, menu)}
                        >
                            Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>

                <SnackbarComponent
                    open={snackbar.open}
                    variant={snackbar.variant}
                    message={snackbar.message}
                    duration={2000}
                    closeSnackbar={
                        ()=>{
                            this.setState({
                                snackbar: {
                                    ...this.state.snackbar,
                                    open: false,
                                }
                            })
                        }
                    }
                />

			</React.Fragment>
		)
  	}
}

const styles = theme => ({
	container: {
		textAlign: 'justify',
		padding: 20,
		margin: 30,
		border: "1.5px solid var(--color-primary)",
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
    delete_btn: {
        marginBottom: 20,
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
