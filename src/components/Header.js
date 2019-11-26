import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { asset_url } from '../utils/Config';

import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockIcon from '@material-ui/icons/Lock';


import { Link } from 'react-router-dom'

export function IconButtonLink(props) {
	return <IconButton component={Link} {...props} />
}


const COUVERTURE_PATH = asset_url('/images/couverture_a19.png')
const COUVERTURE_PATH_XS = asset_url('/images/couverture_a19_xs.png')
const LOGO_PATH = asset_url('/images/header_a19.png')


class Header extends React.Component {

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<div className={classes.root}>
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar>
							<div className={classes.logo}>
								<img alt="logo_pic" src={LOGO_PATH} height="60px"/>
							</div>
							<Hidden xsDown implementation="css">
								<IconButton href="https://payutc.nemopay.net" target="_blank" className={classes.menuButton} aria-label="Calendar">
									<CreditCardIcon className={classes.icon}/>
								</IconButton>
								
							</Hidden>
							<IconButtonLink to="/login" className={classes.menuButton} aria-label="Login">
								<LockIcon className={classes.icon}/>
							</IconButtonLink>
						</Toolbar>
					</AppBar>
				</div>
				
				<div className = {classes.imgContainer}>
					<Hidden smUp implementation="css">
						<img alt="couverture_pic" src={COUVERTURE_PATH_XS} className={classes.couverture}/>
					</Hidden>
					<Hidden xsDown implementation="css">
						<img alt="couverture_pic" src={COUVERTURE_PATH} className={classes.couverture}/>
					</Hidden>
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
		objectFit: 'cover',
	},
});


export default withStyles(styles)(Header);
