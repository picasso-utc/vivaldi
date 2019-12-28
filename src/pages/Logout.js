import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { asset_url } from '../utils/Config';
import { ajaxGet } from '../utils/Ajax';

class Logout extends React.Component {

	componentDidMount(){
		this.logoutUser();
	}

	logoutUser(){
		const query = new URLSearchParams(this.props.location.search);
		const redirection = query.get('redirect');
		if (redirection) {
			window.location = "https://cas.utc.fr/cas/logout";
		} else {
			let logout_window = window.open(asset_url("/logout?redirect=true"));
			setTimeout(() => {
				if (logout_window) {
					logout_window.close();
					ajaxGet('auth/logout').then(res => {
						window.location = asset_url('/')
					})
				} else {
					ajaxGet('auth/logout').then(res => {
						window.location = asset_url('/')
					})
				}
			}, 2000)
		}
    }


	render() {

		const { classes } = this.props;

		return (
			<div className={classes.container}>

                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Typography variant="h4" noWrap>
                        <CircularProgress className={classes.progress} />
                        Déconnexion ...
                    </Typography>
                </Grid>
			</div>
		);
	}
}

const styles = theme => ({
    container: {
        paddingTop: 100,
	},
	progress: {
		margin: 20,
		color: '#B22132',
	}
});

export default withStyles (styles) (Logout)

