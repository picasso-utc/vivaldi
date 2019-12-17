import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { API_URL } from '../utils/Config';

class Logout extends React.Component {

	componentDidMount(){
		this.logoutUser();
	}

	logoutUser(){
        window.location = API_URL + "auth/logout";
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

