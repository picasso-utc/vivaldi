import React from 'react'
import { Link } from 'react-router-dom';
import { withStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Divider, Drawer, Collapse,
	List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import HomeIcon from '@material-ui/icons/Home';
import EventNoteIcon from '@material-ui/icons/EventNote';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import Auth from '../../utils/Auth';
import { asset_url } from '../../utils/Config';

const LOGO_PATH = asset_url('/images/logo.png')
const CATEGORIES = [
	{
		id: 'Dashboard',
		link: '/admin',
		icon: <HomeIcon />,
		authorized: Auth.isUserMember,
	},
	{
		id: 'Gestion du site',
		icon: <DeveloperModeIcon/>,
		authorized: Auth.isUserMember,
		children: [
			{ id: 'Goodies', link: '/admin/goodies'},
			{ id: 'Sondages', link: '/admin/polls'},
		]
	},
	{
		id: 'Perms',
		icon: <EventNoteIcon/>,
		authorized: Auth.isUserMember,
		children: [
			{ id: 'Perm en cours', link: '/admin/current/perm'},
			{ id: 'Planning', link: '/admin/calendar'},
			{ id: 'Menu', link: '/menu'},
			// { id: 'Index perms', link: '/admin/perms'},
		]
	},
	{
		id: 'Charte',
		link: '/charte',
		icon: <HowToRegIcon/>,
		authorized: Auth.isUserMember,
	},
	{
		id: 'Applications',
		icon: <ImportantDevicesIcon/>,
		authorized: Auth.isUserMember,
		children: [
			{ id: 'Weezevent', link: 'https://admin.nemopay.net'},
			{ id: 'Picsous', link: 'https://assos.utc.fr/picasso/picsous'},
			{ id: 'Ancien Picsous', link: 'https://cas.utc.fr/cas/login?service=http://assos.utc.fr/picasso/old/picsous/#/'},
			{ id: 'Beethoven', link: 'http://beethoven.picasso-utc.fr/'},
		]
	},
	{
		id: 'Administration',
		icon: <SettingsIcon/>,
		authorized: Auth.isUserAdmin,
		children: [
			{ id: 'Astreintes', link: '/admin/astreintes'},
			{id: 'Utilisateurs', link: '/admin/users'},
			// {id: 'Team', link: '/admin/team'},
			{id: 'Semestres', link: '/admin/semesters'},
			{id: 'Paramètres', link: '/admin/settings'},
		]
	},
	{
		id: 'Télés',
		icon: <LiveTvIcon/>,
		authorized: Auth.isUserAdmin,
		children: [
			{id: 'Configuration', link: '/admin/tv/config'},
			{id: 'Média', link: '/admin/tv/media'},
			{id: 'URL', link: '/admin/tv/url'},
		]
	}
];

function AdminDrawer(props) {
	const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
	return (
		<Drawer
			classes={{ paper: props.classes.drawerPaper }}
			variant={isMobile ? "temporary" : "permanent"}
			onClose={props.handleDrawerToggle}
			open={!isMobile || props.mobileOpen}
		>
			{props.children}
		</Drawer>
	);
}

class AdminNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mobileOpen : false,
			openCategories: {},
		};

		this.getLinkProps = this.getLinkProps.bind(this);
		this.closeNav = this.closeNav.bind(this);
	}

	toggleCategoryCollapse = event => {
		const categoryId = event.currentTarget.getAttribute('value');
		this.setState(prevState => ({
			openCategories: {
				...prevState.openCategories,
				[categoryId]: !prevState.openCategories[categoryId]
			},
		}));
	}

	openChildLink = event => {
		const link = event.currentTarget.getAttribute('value');
		window.open(link)
	}

	closeNav = event => {
		this.props.handleDrawerToggle()
	}

	getLinkProps = link => {
		if (!link)
			return {}
		if (link.startsWith('http'))
			return {
				component: 'a',
				href: link,
				target: '_blank',
				onClick: this.closeNav
			}
		return {
			component: Link,
			to: link || '',
			onClick: this.closeNav
		}
	}
	
	render() {
		const { classes } = this.props;
		return (
			<nav className={classes.drawer}>
				<AdminDrawer {...this.props}>
					<div className={classes.logo}>
						<Link to="/">
							<img src={LOGO_PATH} height="44px" />
						</Link>
					</div>
					<List disablePadding>
						{CATEGORIES.map(category => (
							<React.Fragment key={category.id}>
								<ListItem 
									className={classes.categoryHeader} 
									onClick={category.children && this.toggleCategoryCollapse}
									value={category.id}
									button
									{...this.getLinkProps(category.link)}
								>
									<ListItemIcon className={classes.itemIcon}>
										{category.icon}
									</ListItemIcon>
									<ListItemText classes={{ primary: classes.categoryHeaderPrimary }}>
										{category.id}
									</ListItemText>
								</ListItem>
									
								{category.children && category.children.length && (
									<Collapse in={Boolean(this.state.openCategories[category.id])} timeout="auto">
										<List component="div" disablePadding>
											{category.children.map(child => (
												<ListItem 
													key={child.id} 
													button
													className={classes.categoryChildren}
													value={child.link}
													{...this.getLinkProps(child.link)}
												>
													<ListItemText
														primary={child.id} 
														classes={{ primary: classes.categoryChildrenPrimary }}
													/>
												</ListItem>
											))}
										</List>
									</Collapse>
								)}
								<Divider/>
							</React.Fragment>
						))}
					</List>
				</AdminDrawer>
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
	logo: {
		textAlign: 'center',
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
