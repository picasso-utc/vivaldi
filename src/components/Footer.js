import React from 'react';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


class Footer extends React.Component {

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
                    <Grid item className={classes.footer_content}>
                    <Typography variant="body1" gutterBottom>
                        Pour toute question relative au <strong>Pic'Asso</strong> : <a href="mailto:picasso@assos.utc.fr" className={classes.link}>picasso@assos.utc.fr</a>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Pour toute question relative à <strong>Pay'utc</strong> : <a href="mailto:payutc@assos.utc.fr" className={classes.link}> payutc@assos.utc.fr</a>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Vous êtes responsables : <a target="_blank" rel="noopener noreferrer" href="https://assos.utc.fr/picasso/charte-consommateur.pdf" className={classes.link}>Charte du permanencier</a>
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
