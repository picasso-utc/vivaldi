import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



import SettingsIcon from '@material-ui/icons/Settings';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import HomeIcon from '@material-ui/icons/Home';
import EventNoteIcon from '@material-ui/icons/EventNote';
import HowToRegIcon from '@material-ui/icons/HowToReg';

import { Link } from 'react-router-dom';

import Auth from '../../utils/Auth';

import Collapse from '@material-ui/core/Collapse';


const LOGO_PATH = '/images/logo.png'

class AdminNav extends Component {

	constructor(props) {
        super(props);

        this.state = {
			mobileOpen : false,
			categories : [
				{
					id: 'Dashboard',
					open: false,
					link: '/admin/',
					icon: <HomeIcon />,
					authorization: Auth.isUserMember(),
					children : []
				
				},
				{
					id: 'Gestion du site',
					open: false,
					link: null,
					icon: <DeveloperModeIcon/>,
					authorization:  Auth.isUserMember(),
					children : [
						{ id: 'Goodies', link: '/admin/goodies'},
						{ id: 'Vote', link: '/admin/polls'},
					]
				},
				{
					id: 'Perms',
					open: false,
					link: null,
					icon: <EventNoteIcon/>,
					authorization:  Auth.isUserMember(),
					children : [
						{ id: 'Perm en cours', link: '/admin/current/perm'},
						{ id: 'Planning', link: '/admin/calendar'},
						{ id: 'Astreintes', link: '/admin/astreintes'},
						{ id: 'Index perms', link: '/admin/perms'},
					]
				},
				{
					id: 'Charte',
					open: false,
					link: '/admin/charte',
					icon: <HowToRegIcon/>,
					children : []
				},
				{
					id: 'Applications',
					open: false,
					link: null,
					icon: <ImportantDevicesIcon/>,
					authorization:  Auth.isUserMember(),
					children : [
						{ id: 'Weezevent', link: 'https://admin.nemopay.net'},
						{ id: 'Picsous', link: 'https://assos.utc.fr/picasso/picsous'},
						{ id: 'Beethoven', link: 'http://beethoven.picasso-utc.fr/'},
					]
				},
				{
					id: 'Administration',
					open: false,
					link: null,
					icon: <SettingsIcon/>,
					authorization:  Auth.isUserAdmin(),
					children : [
						{id: 'Utilisateurs', link: '/admin/users'},
						{id: 'Team', link: '/admin/team'},
						{id: 'Semestres', link: '/admin/semesters'},
						{id: 'Paramètre', link: '/admin/settings'},
					]
				}
			],
		};

		this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
		this.handleClickOnCategory = this.handleClickOnCategory.bind(this)
	}

	setMobileOpen = function(){
		const mobileOpen = this.state.mobileOpen;
		this.setState({
			mobileOpen : !mobileOpen
		})
	}

	handleDrawerToggle(){
		this.setMobileOpen();
	}


	handleClickOnCategory(event, category){
		const category_id = category.id;
		let categories = this.state.categories;
		const index = categories.findIndex((c) => c.id == category_id);
		const new_value = !categories[index].open;
		categories.map((c) => c.open = false);
		categories[index].open = new_value
		this.setState({
			categories: categories
		});
	}


	openChildLink(event, link){
		window.open(link)
	}
	
	
  	render(){


		const { classes } = this.props;
		const {mobileOpen, categories} = this.state;

		const drawer = (
			<div>
				{/* <div 
					className={classes.toolbar} 
				/> */}
				<Grid 
					className={classes.logo} 
					container
					justify="center"
 					direction="row"
				>
					<img src={LOGO_PATH} height="44px"/>

				</Grid>
				<List disablePadding>
					{categories.map(({ id, open, link, icon, children, authorization })=> (
						authorization && <React.Fragment key={id}>
							{/* <Link to={link} style={{ textDecoration: 'none' }}> */}
								<ListItem 
									className={classes.categoryHeader} 
									onClick={(e) => this.handleClickOnCategory(e, {id})}
									button
									// component={link ? (Link) : ('')}
									to={link ? (link) : ('')}
								>
									<ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
									<ListItemText
										classes={{
											primary: classes.categoryHeaderPrimary,
										}}
										
									>
										{id}
									</ListItemText>
									
								</ListItem>
							{/* </Link> */}
							<Collapse in={open} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									{children && children.map(({ id: childId, link: childLink }) => (
										childLink.startsWith('http')? (
											<ListItem 
												key={childId} 
												button
												className={classes.categoryChildren}
												onClick={(e) => this.openChildLink(e, childLink)}
											>
												<ListItemText 
													primary={childId} 
													classes={{
														primary: classes.categoryChildrenPrimary,
													}}
												/>
											</ListItem>
										) : (
											<ListItem 
												key={childId} 
												button
												className={classes.categoryChildren}
												component={childLink ? (Link) : ('')}
												to={childLink ? (childLink) : ('')}
											>
												<ListItemText 
													primary={childId} 
													classes={{
														primary: classes.categoryChildrenPrimary,
													}}
												/>
											</ListItem>
										)
									))}
								</List>
							</Collapse>
							<Divider/>
						</React.Fragment>
												
					))}

				</List>
			</div>		
		);
	
		return (
				
			<nav
				className={classes.drawer} 
				aria-label="mailbox folders"
			>
			
				<Hidden mdUp implementation="css">
					<Drawer
						// container={container}
						variant="temporary"
						// anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						// ModalProps={{
						// keepMounted: true, // Better open performance on mobile.
						// }}
					>
						{drawer}
						
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
						
					</Drawer>
				</Hidden>
			</nav>
		);
	}
}

const drawerWidth = 240;




const styles = theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('md')]: {
		width: drawerWidth,
		flexShrink: 0,
		},
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
		width: `calc(100% - ${drawerWidth}px)`,
		},
		backgroundColor : "white",
		color : "#000223"
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
		display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,

	drawerPaper: {
		width: drawerWidth,
		backgroundColor : "#000223",
		color : "white",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},

	windowTitle : {
		textDecoration : 'underline #B22132',
		fontSize: 24,
	},
	categoryHeader: {
		paddingTop: 4,
		paddingBottom: 0,
		paddingLeft: 15,

	},
	categoryHeaderPrimary: {
		color: theme.palette.common.white,
		fontSize: 15,
	},

	categoryChildren: {
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 75,
	},

	categoryChildrenPrimary: {
		color: theme.palette.common.white,
		fontSize: 12,
		
	},
	logo : {
		paddingTop : 10,
		paddingBottom: 30,
	},
	itemIcon: {
		minWidth: 'auto',
		color: 'white',
		marginRight: 15,
	},


	  
});

export default withStyles (styles) (AdminNav)
