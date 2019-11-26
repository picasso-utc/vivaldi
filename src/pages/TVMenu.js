import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { asset_url } from '../utils/Config';
import { ajaxGet } from '../utils/Ajax';


class TVContent extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            orders : [],
            menu : '',
        }
	}

	componentDidMount(){
        this.loadOrders();
        setInterval(() => this.loadOrders(), 2000);
    }

    loadOrders(){
        ajaxGet('tv/orders').then(res => {
            this.setState({menu: res.data.menu, orders: res.data.orders})
        }).catch(error => {
            console.log(error)
        })
    }


	render() {

        const { classes } = this.props;
        const { menu, orders } = this.state;
        const backgroundImage = {
            backgroundImage: 'url(\'' + asset_url('/images/background_logo.png') + '\')'
        }

		return (
            
            <div className={classes.container} style={backgroundImage}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Typography variant="h2" gutterBottom className={classes.title}>
                        Prochains menus à servir
                    </Typography>
                    <Typography variant="h2" gutterBottom className={classes.title}>
                        {menu}
                    </Typography>
                </Grid>
                <Grid container direction="row">
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th className={classes.title_cell}>Nom</th>
                                <th className={classes.title_cell}>Prénom</th>
                                <th className={classes.title_cell}>Quantité</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td className={classes.row_cell}>{order.last_name}</td>
                                    <td className={classes.row_cell}>{order.first_name}</td>
                                    <td className={classes.row_cell}>{order.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>
            </div>         
		);
	}
}

const styles = theme => ({
    title : {
        marginTop: 10,
        width: '100%',
        textAlign: 'center',
    },
    container: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#000223',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '10%',
        backgroundPosition: '5% 3%',
        backgroundAttachment: 'fixed',
        color: 'white',
        overflowY: 'hidden',
    },
    table : {
        width: '100%',
        marginTop: 30,
        fontSize: 30,
        borderCollapse: 'collapse'
    },
    title_cell : {
        width: '33%',
        height: 80,
        borderBottom: '2px solid white',
    },
    row_cell : {
        textAlign: 'center',
        height: 65,
    }
});

export default withStyles (styles) (TVContent)

