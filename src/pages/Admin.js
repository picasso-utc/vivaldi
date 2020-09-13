import React from 'react'
import { Route, Switch } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AdminNav from '../components/admin/AdminNav';
import Dashboard from '../components/admin/Dashboard';
import Semesters from '../components/admin/administrations/Semesters';
import Settings from '../components/admin/administrations/Settings';
import TeamManagement from '../components/admin/administrations/TeamManagement';
import Users from '../components/admin/administrations/Users';
import BlockedUsers from '../components/admin/administrations/BlockedUsers';
import ResourcesManagement from '../components/admin/administrations/ResourcesManagement';
import Astreintes from '../components/admin/perms/Astreintes';
import CalendarManagement from '../components/admin/perms/CalendarManagement';
import CurrentPerm from '../components/admin/perms/CurrentPerm';
import PermDetails from '../components/admin/perms/PermDetails';
import PermsIndex from '../components/admin/perms/PermsIndex';
import RequestedPerm from '../components/admin/perms/RequestedPerm';
import GoodiesManagement from '../components/admin/website_management/GoodiesManagement';
import PollsManagement from '../components/admin/website_management/PollsManagement';
import Media from '../components/admin/tv/Media';
import Url from '../components/admin/tv/Url';
import Configuration from '../components/admin/tv/Configuration';
import { Link } from 'react-router-dom'
import Error404 from '../pages/Error404';
import ProtectedRoute from '../utils/ProtectedRoute';
import { asset_url } from '../utils/Config';

import Prostate from '../components/admin/prostate/Prostate';


export function IconButtonLink(props) {
	return <IconButton component={Link} {...props} />
}

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
			case asset_url("/admin"):
				return "Dashboard";
			case asset_url("/admin/goodies"):
				return "Goodies";
			case asset_url("/admin/polls"):
				return "Sondages";
			case asset_url("/admin/current/perm"):
				return "Perm en cours";
			case asset_url("/admin/calendar"):
				return "Planning du semestre";
			case asset_url("/admin/astreintes"):
				return "Astreintes";
			case asset_url("/admin/requested/perms"):
				return "Perms demandées";
			case asset_url("/admin/perm/details"):
				return "Détails";
			case asset_url("/admin/perms"):
				return "Index Perms";
			case asset_url("/admin/charte"):
				return "Charte";
			case asset_url("/admin/users"):
				return "Utilisateurs";
			case asset_url("/admin/blocked/users"):
				return "Blocage";
			case asset_url("/admin/team"):
				return "Team";
			case asset_url("/admin/resources"):
				return "Gestion des ressources";
			case asset_url("/admin/semesters"):
				return "Semestres";
			case asset_url("/admin/settings"):
				return "Paramètres";
			case asset_url("/admin/tv/media"):
				return "Gestion des médias TV";
			case asset_url("/admin/prostate"):
				return "Prostate";
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
						<IconButtonLink to="/logout" aria-label="Logout">
							<PowerSettingsNewIcon/>
						</IconButtonLink>
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
						<ProtectedRoute only="admin" path={`${base_url}/astreintes`} exact component={Astreintes}/>
						<ProtectedRoute only="member" path={`${base_url}/perms`} exact component={PermsIndex}/>
						<ProtectedRoute only="member" path={`${base_url}/perm/details`} exact component={PermDetails}/>
						<ProtectedRoute only="member" path={`${base_url}/requested/perms`} exact component={RequestedPerm}/>
						<ProtectedRoute only="member" path={`${base_url}/tv/media`} exact component={Media}/>
						<ProtectedRoute only="member" path={`${base_url}/tv/url`} exact component={Url}/>
						<ProtectedRoute only="member" path={`${base_url}/tv/config`} exact component={Configuration}/>
						<ProtectedRoute only="admin" path={`${base_url}/users`} exact component={Users}/>
						<ProtectedRoute only="admin" path={`${base_url}/resources`} exact component={ResourcesManagement}/>
						<ProtectedRoute only="admin" path={`${base_url}/blocked/users`} exact component={BlockedUsers}/>
						<ProtectedRoute only="admin" path={`${base_url}/team`} exact component={TeamManagement}/>
						<ProtectedRoute only="admin" path={`${base_url}/semesters`} exact component={Semesters}/>
						<ProtectedRoute only="admin" path={`${base_url}/settings`} exact component={Settings}/>
						<ProtectedRoute only="admin" path={`${base_url}/prostate`} exact component={Prostate}/>
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
		flexGrow: 1
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
		minWidth: 1,
	},

	windowTitle : {
		textDecoration : 'underline #B22132',
		fontSize: 24,
		flexGrow: 1,
	},

	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},

});

export default withStyles(styles)(Admin);
