import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { asset_url } from '../utils/Config';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom'

export function IconButtonLink(props) {
	return <IconButton component={Link} {...props} />
}


const COUVERTURE_PATH = asset_url('/images/couverture_site_P21.png')
const COUVERTURE_PATH_XS = asset_url('/images/Mobile_Couverture_P21.png')
const LOGO_PATH = asset_url('/images/Logo_pic_p21_sansfond.png')


class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open_menu : null,
			height : window.innerHeight
		}
	}
	updateSize=()=>{
		this.setState({height : window.innerHeight})
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateSize);
	}
	componentWillUnmount(){
		window.removeEventListener('resize', this.updateSize);
	}

	handleOpenMenu(event){
		this.setState({anchor: event.currentTarget})
	}

	handleCloseMenu(event, link=null){
		this.setState({anchor: null})
		if (link) {
			window.location.hash = null;
			window.location.hash=link;
		}
	}


	render() {

		const { anchor, height } = this.state;

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
								<Button
									onClick={(event) => this.handleOpenMenu(event)}
								>
									Menu
								</Button>
								<Menu
									anchorEl={anchor}
									keepMounted
									open={Boolean(anchor)}
									onClose={(event) => this.handleCloseMenu(event)}
								>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#home")}>Accueil</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#rules")}>Les règles</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#calendar")}>Calendrier</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#polls")}>Sondages</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#prices")}>Tarifs</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#goodies")}>Goodies</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#perm")}>Perm</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#postes")}>Postes</MenuItem>
									{/*<MenuItem onClick={(event) => this.handleCloseMenu(event, "#team")}>La Team</MenuItem>*/}
								</Menu>
							</Hidden>

							<Hidden smUp implementation="css">
								<IconButton
									onClick={(event) => this.handleOpenMenu(event)}
								>
									<MoreVertIcon />
								</IconButton>
								<Menu
									anchorEl={anchor}
									keepMounted
									open={Boolean(anchor)}
									onClose={(event) => this.handleCloseMenu(event)}
								>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#home")}>Accueil</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#rules")}>Les règles</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#calendar")}>Calendrier</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#polls")}>Sondages</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#prices")}>Tarifs</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#goodies")}>Goodies</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#perm")}>Perm</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#postes")}>Postes</MenuItem>
									<MenuItem onClick={(event) => this.handleCloseMenu(event, "#team")}>La Team</MenuItem>
								</Menu>
							</Hidden>
							<IconButtonLink to="/login" className={classes.menuButton} aria-label="Login">
								<LockIcon className={classes.icon}/>
							</IconButtonLink>
						</Toolbar>
					</AppBar>
				</div>

				<div className = {classes.imgContainer}>
					<Hidden smUp implementation="css">
						<img alt="couverture_pic" src={COUVERTURE_PATH_XS} className={classes.couverture} style={{height:height}}/>
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
		backgroundColor: 'var(--color-light)',
		color: 'white',

	},
	logo: {
		flexGrow: 1,
	},
	menuButton: {
		backgroundColor: 'var(--color-light)',
		fontSize: 35,
		padding: "10px",
		marginTop: 0,
		borderRadius: 0,
		height: 60,
		color: 'var(--color-primary)',
		'&:hover': {
			borderTop: "3px solid var(--color-primary)",
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
		height: window.innerHeight,
		objectFit: 'cover',
	},
});


export default withStyles(styles)(Header);
