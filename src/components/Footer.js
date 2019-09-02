import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';



import AccountCircle from '@material-ui/icons/AccountCircle';
import Payment from '@material-ui/icons/Payment';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Icon } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const { classes } = this.props;

		return (
			<React.Fragment>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.footer}
                >
                    {/* <p></p> */}
                    <Grid item className={classes.footer_content}>
                    <Typography variant="body1" gutterBottom>
                        Pour toute question relative au <strong>Pic'Asso</strong> : <a href="mailto:picasso@assos.utc.fr" className={classes.link}>picasso@assos.utc.fr</a>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Pour toute question relative à <strong>Pay'utc</strong> : <a href="mailto:payutc@assos.utc.fr" className={classes.link}> payutc@assos.utc.fr</a>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Vous êtes responsables : <a href="" className={classes.link}>Charte du permanencier</a>
                    </Typography>
                    <Typography variant="body1" gutterBottom className={classes.copyright}>
                        @2019 Copyright Pic'Asso
                    </Typography>
                    </Grid>
                </Grid>
			</React.Fragment>
		);

	}
}



const styles = theme => ({
	footer : {
        backgroundColor: 'white',
    },
    footer_content: {
        textAlign: 'center',
    },
    copyright: {
        color: '#B22132',
    },
    link: {
        textDecoration: 'None',
        color: '#039be5',
    },
});


export default withStyles(styles)(Footer);
