import React from 'react'
import { Route, Switch } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import AdminNav from '../components/admin/AdminNav';
import Dashboard from '../components/admin/Dashboard';
import Semesters from '../components/admin/administrations/Semesters';
import Settings from '../components/admin/administrations/Settings';
import TeamManagement from '../components/admin/administrations/TeamManagement';
import Users from '../components/admin/administrations/Users';
import Astreintes from '../components/admin/perms/Astreintes';
import CalendarManagement from '../components/admin/perms/CalendarManagement';
import CurrentPerm from '../components/admin/perms/CurrentPerm';
import Perms from '../components/admin/perms/Perms';
import GoodiesManagement from '../components/admin/website_management/GoodiesManagement';
import PollsManagement from '../components/admin/website_management/PollsManagement';
// import Charte from '../components/admin/Charte';
import Error404 from '../pages/Error404';
import ProtectedRoute from '../utils/ProtectedRoute';


class Admin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mobileOpen : false,
		};
	}

	handleDrawerToggle = event => this.setState(prevState => ({
		mobileOpen: !prevState.mobileOpen
	}))

	displayScreenName() {
		switch (window.location.pathname) {
			case "/admin":
			return "Dashboard";
			case "/admin/goodies":
			return "Goodies";
			case "/admin/polls":
			return "Sondages";
			case "/admin/current/perm":
			return "Perm en cours";
			case "/admin/calendar":
			return "Planning du semestre";
			case "/admin/astreintes":
			return "Astreintes";
			case "/admin/perms":
			return "Perms";
			case "/admin/charte":
			return "Charte";
			case "/admin/users":
			return "Utilisateurs";
			case "/admin/team":
			return "Team";
			case "/admin/semesters":
			return "Semestres";
			case "/admin/settings":
			return "Paramètres";
			default:
			break;
		}
	}
	
	render() {
		const { classes } = this.props;
		const { mobileOpen } = this.state;
		const base_url = this.props.match.url;

		return (
			<div className={classes.root}>
				<AppBar className={classes.appBar} position="fixed">
					<Toolbar>
						<IconButton
							className={classes.menuButton}
							onClick={this.handleDrawerToggle}
							aria-label="Open drawer"
							color="inherit"
							edge="start"
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h4" noWrap className={classes.windowTitle}>
							{this.displayScreenName()}
						</Typography>
					</Toolbar>
				</AppBar>

				<AdminNav
					mobileOpen={mobileOpen}
					handleDrawerToggle={this.handleDrawerToggle}
				/>

				<main className={classes.content}>
					<Switch>
						<ProtectedRoute only="member" path={`${base_url}/`} exact component={Dashboard}/>
						<ProtectedRoute only="member" path={`${base_url}/goodies`} exact component={GoodiesManagement}/>
						<ProtectedRoute only="member" path={`${base_url}/polls`} exact component={PollsManagement}/>
						<ProtectedRoute only="member" path={`${base_url}/current/perm`} exact component={CurrentPerm}/>
						<ProtectedRoute only="member" path={`${base_url}/calendar`} exact component={CalendarManagement}/>
						<ProtectedRoute only="member" path={`${base_url}/astreintes`} exact component={Astreintes}/>
						<ProtectedRoute only="member" path={`${base_url}/perms`} exact component={Perms}/>
						<ProtectedRoute only="admin" path={`${base_url}/users`} exact component={Users}/>
						<ProtectedRoute only="admin" path={`${base_url}/team`} exact component={TeamManagement}/>
						<ProtectedRoute only="admin" path={`${base_url}/semesters`} exact component={Semesters}/>
						<ProtectedRoute only="admin" path={`${base_url}/settings`} exact component={Settings}/>
						<Route component={Error404}/>
					</Switch>
				</main>
			</div>
		);
	}
}

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
		backgroundColor : "white",
		color : "#000223"
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		// padding: theme.spacing(2),
		maxWidth : "None"
	},

	windowTitle : {
		textDecoration : 'underline #B22132',
		fontSize: 24,
	},

	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},

});

export default withStyles(styles)(Admin);
