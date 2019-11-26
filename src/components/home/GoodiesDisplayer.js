import React from "react";
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ajaxGet } from '../../utils/Ajax';
import { List, ListItem } from "@material-ui/core";

class GoodiesDisplayer extends React.Component {
  

	constructor(props) {
		super(props);
		this.state = {
			winners: []
		}
	}

	
	componentDidMount(){
		this.loadGoodiesWinners();
	}

	
	loadGoodiesWinners(){
        ajaxGet('payutc/goodies/').then(res => {
            this.setState({winners: res.data.winners});
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false})
        })
    }

  	render() {

		const { winners } = this.state;

		const { classes } = this.props;

    	return (
			<React.Fragment>
				{winners.length === 0 ? (
					<Grid container
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item>
							<Typography variant="body1" style={{fontWeight: 300}}>
								Pas de gagnants des goodies pour le moment. 
							</Typography>
						</Grid>
					</Grid>
				):(
					<Grid container direction="row">
						<Grid item xs={6}>
							<List dense={true}>
								{winners.slice(0,Math.ceil(winners.length/2))
								.map((winner, index) => (
									<ListItem key={index} className={`${winner.picked_up && classes.validatedItem}`} style={{fontWeight: 200}}>
										{winner.winner}
									</ListItem>
								))}
							</List>
						</Grid>
						<Grid item xs={6}>
							<List dense={true}>
								{winners.slice(Math.ceil(winners.length/2), winners.length)
								.map((winner, index) => (
									<ListItem key={index} className={`${winner.picked_up && classes.validatedItem}`} style={{fontWeight: 200}}>
										{winner.winner}
									</ListItem>
								))}
							</List>
						</Grid>
					</Grid>
				)}
			</React.Fragment>
    	);
  	}
}

const styles = theme => ({
	noWinners : {
		fontSize: 16,
		fontWeight: 200,
	},
	validatedItem: {
		textDecoration: 'line-through',
	},
	item : {
		fontWeight: 200,
	}
});

export default withStyles (styles) (GoodiesDisplayer)
