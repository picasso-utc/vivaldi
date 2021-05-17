import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import {ajaxGet} from "../../utils/Ajax";

class Rules extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dataOccupation : {}
		}
	}

	componentDidMount(){
		this.loadStats();
	}

	loadStats(){
		ajaxGet('covid/occupation').then(res => {
			this.setState({dataOccupation : res.data});
		})
			.catch(error => {
				console.log(error)
				this.setState({loading: false})
			})
	}

	render() {

		const { classes } = this.props;

		const person = this.state.dataOccupation.person
		const tablesExt = 0;
		const tablesIn = 0;

		return (
			<React.Fragment>
				<Grid container direction="row" alignItems="center">
					<Typography>
						Le PIC a réouvert et c'est beau! Cependant cette réouverture doit se faire dans le respect de certaines règles. Pour savoir immédiatement si il y a de la place dans ton foyer favori voici son influence :
					</Typography>
					<Grid  container direction="column" alignItems="center" justify="center" className={classes.gridStats}>
						<Grid container direction="row" alignItems="center" justify="center">
							<Typography>
								{person}
							</Typography>
							<Typography>
								/ 80 places occupées
							</Typography>
						</Grid>
						<Grid container direction="row" alignItems="center" justify="center">
							<Typography>
								{tablesExt}
							</Typography>
							<Typography>
								/ 20 tables extérieurs occupées
							</Typography>
						</Grid>

							<Grid container direction="row" alignItems="center" justify="center">
								<Typography>
									{tablesIn}
								</Typography>
								<Typography>
									/ 20 tables intérieurs occupées
								</Typography>
							</Grid>

					</Grid>


				</Grid>
			</React.Fragment>
		);
	}
}


const styles = theme => ({
	gridStats:{
		marginTop: 20,
	}
});

export default withStyles(styles)(Rules);
