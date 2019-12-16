import React from "react";
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import { ajaxGet } from '../../utils/Ajax';
import {asset_url} from '../../utils/Config';


class PermRequest extends React.Component {
  

	constructor(props) {
		super(props);
		this.state = {
			perm_may_be_requested: false,
			loading: true
		}
	}

	componentDidMount(){
		ajaxGet('perms/public/may/request').then(res => {
			this.setState({perm_may_be_requested: res.data.perm_may_be_requested, loading: false})
		}).catch(error => {
			console.log(error)
		})
	}


	goToPermForm(){
		window.location.href = asset_url('/perm/form')
	}

  	render() {

		const { loading, perm_may_be_requested } = this.state;

		const { classes } = this.props;
		
    	return (
			<React.Fragment>
				{loading?(
					<Grid 
						container 
						className={classes.loader}
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item>
							<CircularProgress  className={classes.progress} color="secondary"/>
						</Grid>
					</Grid>
				):(
					perm_may_be_requested ? (
						<React.Fragment>
							<Grid 
								container 
								className={classes.loader}
								direction="row"
								justify="center"
								alignItems="center"
							>
								<Typography style={{fontWeight: 200}}>Suis le lien pour accéder au formulaire et demander une perm ce semestre !</Typography>
							</Grid>
							<Grid 
								container 
								className={classes.loader}
								direction="row"
								justify="center"
								alignItems="center"
							>
								<Button 
									variant="contained" 
									className={classes.btn}
									onClick={() => this.goToPermForm()}
								>
									Formulaire
								</Button>
							</Grid>
						</React.Fragment>
					):(
						<Grid 
							container 
							className={classes.loader}
							direction="row"
							justify="center"
							alignItems="center"
						>
							<Typography style={{fontWeight: 200}}>Impossible de demander une perm actuellement ...</Typography>
						</Grid>
					)
				)}
			</React.Fragment>
    	);
  	}
}

const styles = theme => ({
	root: {
		width: '100%',
		overflowX: 'auto'
	},
	btn : {
		margin: 10
	},
});

export default withStyles (styles) (PermRequest)
