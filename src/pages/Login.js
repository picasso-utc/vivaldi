import React from 'react';
import Auth from '../utils/Auth';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

class Login extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount(){
		if(Auth.isUserAuthenticated()){
			this.redirectUser();
		} else {
			this.loginUser();
		}
	}

	redirectUser(){
		Auth.redirectUser();
	}

	loginUser(){
		Auth.login();
	}


	render() {

		const { classes } = this.props;
		console.log(classes);

		return (
			<div className={classes.container}>
				<h1>
					<Typography variant="h4" noWrap>
						<CircularProgress className={classes.progress} />
						Connexion ...
					</Typography>
				</h1>
			</div>
		);
	}
}

const styles = theme => ({
    container: {
        paddingTop: 100,
        textAlign: 'center',
	},
	progress: {
		margin: 20,
		color: '#B22132',
	}
});

export default withStyles (styles) (Login)

