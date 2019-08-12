import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Payment from '@material-ui/icons/Payment';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Icon } from '@material-ui/core';

const HEADER_PATH = '/images/header_p19.png'
const HEADER_IMG = '/images/header_pic.jpg'

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false,
			width: 0,
			heigth: 0,
		};
	}

	componentDidMount() {
		this.updateWindowDimensions();
		//window.addEventListener('resize', this.updateWindowDimensions);
	}
	  
	componentWillUnmount() {
		//window.removeEventListener('resize', this.updateWindowDimensions);
	}
	  
	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	toggleMenu = () => {

	}

	render() {
		const { classes } = this.props;
		return (
			<div>
			{/* <AppBar position="fixed" color="secondary"> */}
				{/* <Toolbar className={classes.Toolbar} style={{ minHeight: this.props.height }}>
					<Link to="/">
						<img src={HEADER_PATH} alt="Foyer Pic'asso" className={classes.logo}/>
					</Link>

					<div>
						<IconButton href="#Calendar" className={classes.menuButton} aria-label="Calendar">
							<Icon className={classes.centerIcon}> calendar_today</Icon>
						</IconButton>
						<IconButton href="#News" className={classes.menuButton} aria-label="News">
							<Icon className={classes.centerIcon}> description</Icon>
						</IconButton>
						<IconButton href="#LeSaviezVous" className={classes.menuButton} aria-label="Faq">
							<Icon className={classes.centerIcon}> bookmark</Icon>
						</IconButton>
						<IconButton href="#calendar" className={classes.menuButton} aria-label="Goodies">
							<Icon className={classes.centerIcon}> card_giftcard</Icon>
						</IconButton>
						<IconButton href="#calendar" className={classes.menuButton} aria-label="Prices">
							<Icon className={classes.centerIcon}> euro_symbol</Icon>
						</IconButton>
						<IconButton href="#calendar" className={classes.menuButton} aria-label="Team">
							<Icon className={classes.centerIcon}> photo</Icon>
						</IconButton>
					</div>
					<div>
						{this.showMenu && (
							<IconButton className={classes.menuButton} aria-label="Menu" onClick={this.toggleMenu}>
								<Icon>menu</Icon>
							</IconButton>
						)}
						
						<IconButton href="https://payutc.nemopay.net" className={classes.menuButton} color="inherit" aria-label="Payutc" >
							<Payment className={classes.leftIcon} />payutc
						</IconButton>
						<IconButton to='/login' component={NavLink} className={classes.menuButton} color="inherit" aria-label="Login">
							<AccountCircle className={classes.leftIcon} />login
     				</IconButton>
					</div>
				</Toolbar> */}
			{/* </AppBar> */}
			<div className = {classes.imgContainer}>
				<h1 className={classes.headerTitle}></h1>
			</div>
			</div>
		);

	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	Toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		maxWidth: 1280,
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 0,
	},
	logo: {
		maxHeigth: 70,
		maxWidth: 180,
	},
	menuButton: {
		color: 'inherit',
		fontSize: 20,
		padding: "10px",
		marginTop: 0,
		borderRadius: 0,
		height: "100%",
		
		'&:hover': {
			borderTop: "3px solid red",
			textDecoration: "none",
		},
		'&:active': {
			borderTop: "3px solid red",
			textDecoration: "none",
		}
	},
	leftIcon: {
		// marginRight: theme.spacing.unit,
		fontSize: 30,
	},
	centerIcon: {
		fontSize: 35,
		// marginRight: theme.spacing.unit,
		// marginLeft: theme.spacing.unit,	
	},
	imgContainer: {
		width: "100%",
		height: window.innerHeight - 64,
		backgroundImage: "url(" + HEADER_IMG + ")",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		marginTop: "64px",
	},
	headerTitle: {
		fontSize: "40px",
		textAlign: "center",
	},
});


export default withStyles(styles)(Header);
