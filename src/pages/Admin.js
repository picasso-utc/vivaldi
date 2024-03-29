import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AdminNav from '../components/admin/AdminNav';
import Dashboard from '../components/admin/Dashboard';
import Semesters from '../components/admin/administrations/Semesters';
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
import ShotgunManagement from '../components/admin/website_management/ShotgunManagement';
import PollsManagement from '../components/admin/website_management/PollsManagement';
import Newsletter from '../components/admin/application_management/Newsletter';
import BeerInfo from '../components/admin/application_management/BeerInfo';
import TrendingProduct from '../components/admin/application_management/TrendingProduct';
import Evenements from '../components/admin/application_management/Evenements';
import Media from '../components/admin/tv/Media';
import Url from '../components/admin/tv/Url';
import Configuration from '../components/admin/tv/Configuration';
import { Link } from 'react-router-dom';
import Error404 from '../pages/Error404';
import ProtectedRoute from '../utils/ProtectedRoute';
import { asset_url } from '../utils/Config';

import Prostate from '../components/admin/prostate/Prostate';
import AstreintesShotgun from '../components/admin/perms/AstreintesShotgun';
import Exoneration from '../components/admin/exoneration/Exoneration';

export function IconButtonLink(props) {
    return <IconButton component={Link} {...props} />;
}

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
        };
    }

    handleDrawerToggle = (event) =>
        this.setState((prevState) => ({
            mobileOpen: !prevState.mobileOpen,
        }));

    displayScreenName() {
        switch (window.location.pathname) {
            case asset_url('/admin'):
                return 'Dashboard';
            case asset_url('/admin/goodies'):
                return 'Goodies';
            case asset_url('/admin/polls'):
                return 'Sondages';
            case asset_url('/admin/current/perm'):
                return 'Perm en cours';
            case asset_url('/admin/calendar'):
                return 'Planning du semestre';
            case asset_url('/admin/astreintes'):
                return 'Astreintes';
            case asset_url('/admin/astreintesshotgun'):
                return 'Shotgun des astreintes';
            case asset_url('/admin/requested/perms'):
                return 'Perms demandées';
            case asset_url('/admin/perm/details'):
                return 'Détails';
            case asset_url('/admin/perms'):
                return 'Index Perms';
            case asset_url('/admin/charte'):
                return 'Charte';
            case asset_url('/admin/users'):
                return 'Utilisateurs';
            case asset_url('/admin/blocked/users'):
                return 'Blocage';
            case asset_url('/admin/team'):
                return 'Team';
            case asset_url('/admin/resources'):
                return 'Gestion des ressources';
            case asset_url('/admin/semesters'):
                return 'Semestres';
            case asset_url('/admin/settings'):
                return 'Paramètres';
            case asset_url('/admin/tv/media'):
                return 'Gestion des médias TV';
            case asset_url('/admin/prostate'):
                return 'Prostate';
            case asset_url('/admin/exoneration'):
                return 'Exoneration';
            case asset_url('/admin/newsletter'):
                return 'Newsletter';
            case asset_url('/admin/beerInfo'):
                return 'Info Bière';
            case asset_url('/admin/trending_product'):
                return 'Trending Product';
            case asset_url('/admin/evenements'):
                return 'Évenements du semestre';
            case asset_url('/admin/shotgun'):
                return 'ShotgunManagement';
            default:
                break;
        }
    }

    render() {
        const { classes } = this.props;
        const { mobileOpen } = this.state;

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
                            <PowerSettingsNewIcon />
                        </IconButtonLink>
                    </Toolbar>
                </AppBar>

                <AdminNav mobileOpen={mobileOpen} handleDrawerToggle={this.handleDrawerToggle} />

                <main className={classes.content}>
                    <Switch>
                        <ProtectedRoute only="member" path="/admin/" exact component={Dashboard} />
                        <ProtectedRoute
                            only="member"
                            path="/admin/goodies"
                            exact
                            component={GoodiesManagement}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/polls"
                            exact
                            component={PollsManagement}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/shotgun"
                            exact
                            component={ShotgunManagement}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/current/perm"
                            exact
                            component={CurrentPerm}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/calendar"
                            exact
                            component={CalendarManagement}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/astreintes"
                            exact
                            component={Astreintes}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/astreintesshotgun"
                            exact
                            component={AstreintesShotgun}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/perms"
                            exact
                            component={PermsIndex}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/perm/details"
                            exact
                            component={PermDetails}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/requested/perms"
                            exact
                            component={RequestedPerm}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/tv/media"
                            exact
                            component={Media}
                        />
                        <ProtectedRoute only="member" path="/admin/tv/url" exact component={Url} />
                        <ProtectedRoute
                            only="member"
                            path="/admin/tv/config"
                            exact
                            component={Configuration}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/prostate"
                            exact
                            component={Prostate}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/exoneration"
                            exact
                            component={Exoneration}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/newsletter"
                            exact
                            component={Newsletter}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/evenements"
                            exact
                            component={Evenements}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/beerInfo"
                            exact
                            component={BeerInfo}
                        />
                        <ProtectedRoute
                            only="member"
                            path="/admin/trending_product"
                            exact
                            component={TrendingProduct}
                        />
                        <ProtectedRoute only="admin" path="/admin/users" exact component={Users} />
                        <ProtectedRoute
                            only="admin"
                            path="/admin/resources"
                            exact
                            component={ResourcesManagement}
                        />
                        <ProtectedRoute
                            only="admin"
                            path="/admin/blocked/users"
                            exact
                            component={BlockedUsers}
                        />
                        <ProtectedRoute
                            only="admin"
                            path="/admin/team"
                            exact
                            component={TeamManagement}
                        />
                        <ProtectedRoute
                            only="admin"
                            path="/admin/semesters"
                            exact
                            component={Semesters}
                        />
                        <Route component={Error404} />
                    </Switch>
                </main>
            </div>
        );
    }
}

const drawerWidth = 240;

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        backgroundColor: 'white',
        color: '#000223',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        minWidth: 1,
    },

    windowTitle: {
        textDecoration: 'underline #B22132',
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
