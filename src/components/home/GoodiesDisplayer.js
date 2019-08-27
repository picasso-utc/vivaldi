import React from "react";
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { ajaxGet } from '../../utils/Ajax';
import { List, ListItem, ListItemText } from "@material-ui/core";

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
        ajaxGet('payutc/goodies').then(res => {
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
				{winners.length == 0 ? (
					// <p>Pas de goodies</p>
					<div></div>
				):(
					<Grid container
						direction="row"
					>
						<Grid item xs={6}>
							<List dense={true}>
								{winners.slice(0,Math.ceil(winners.length/2))
								.map((winner, index) => (
									<ListItem key={index} className={classes.item}>
										<ListItemText 
											primary={winner.winner}
											className={`${winner.picked_up && classes.validatedItem}`}/>
									</ListItem>
								))}
							</List>
						</Grid>
						<Grid item xs={6}>
							<List dense={true}>
								{winners.slice(Math.ceil(winners.length/2), winners.length)
								.map((winner, index) => (
									<ListItem key={index} className={classes.item}>
										<ListItemText 
											primary={winner.winner} 
											className={`${winner.picked_up && classes.validatedItem}`}
										/>
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
	item : {
		textAlign: 'center',
		fontSize: 16,
	},
	validatedItem: {
		textDecoration: 'line-through',
	},
});

export default withStyles (styles) (GoodiesDisplayer)
