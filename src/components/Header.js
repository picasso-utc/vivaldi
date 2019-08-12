import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Payment from '@material-ui/icons/Payment';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Icon } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';


import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockIcon from '@material-ui/icons/Lock';

const COUVERTURE_PATH = '/images/header_pic.jpg'
const LOGO_PATH = '/images/header_p19.png'

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const { classes } = this.props;

		return (
			<React.Fragment>
				<div className={classes.root}>
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar>
							<div className={classes.logo}>
								<img src={LOGO_PATH} height="60px"/>
							</div>
							
							<Hidden xsDown implementation="css">

								<IconButton href="https://payutc.nemopay.net" target="_blank" className={classes.menuButton} aria-label="Calendar">
									<CreditCardIcon className={classes.icon}/>
								</IconButton>
								<IconButton href="/login" className={classes.menuButton} aria-label="Login">
									<LockIcon className={classes.icon}/>
								</IconButton>
							</Hidden>
						</Toolbar>
					</AppBar>
				</div>
				<div className = {classes.imgContainer}>
					<img src={COUVERTURE_PATH} className={classes.couverture}/>
				</div>
			</React.Fragment>
		);

	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: "white",
		color: '#000223',
		
	},
	logo: {
		flexGrow: 1,
	},
	menuButton: {
		color: '#B22132',
		fontSize: 35,
		padding: "10px",
		marginTop: 0,
		borderRadius: 0,
		height: 60,
		
		'&:hover': {
			borderTop: "3px solid #B22132",
			textDecoration: "none",
		},
	},
	icon: {
		fontSize: 35,
	},
	imgContainer: {
		width: '100%',
		position: 'absolute',
		right: 0,
		left: 'auto',
		marginTop: 65,
	},
	couverture: {
		width: '100%',
		height: window.innerHeight - (65),
		objectFit: 'fill',
	},
});


export default withStyles(styles)(Header);
