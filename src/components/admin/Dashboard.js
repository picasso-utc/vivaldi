import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Grid, Menu, MenuItem, Paper } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import notation_perm_soir from './notation.json'
import CarouselItem from './CarouselItem.js'

import { ajaxGet, ajaxPost } from '../../utils/Ajax';


class Dashboard extends Component{
 
	
	constructor(props) {
		super(props)

		this.state ={
			creneaux : [],
		}
		

		this.loadCreneau = this.loadCreneau.bind(this);
	}

	componentDidMount(){
		this.loadCreneau();
		console.log(notation_perm_soir);

	}


	loadCreneau(){
		ajaxGet('perm/creneaux').then(res => {
			console.log(res.data) 

			this.setState({creneaux: res.data});
		})
	}

	render(){
		
		const { classes } = this.props;
		const { creneaux } = this.state;
		

		return (
			<div className={classes.container}>
				

				<Grid container className={classes.section}>
					<Typography variant="h5" noWrap className={classes.subTitle}>
						<ChevronRight className={classes.subTitleIcon}/>
						Notation des perms
					</Typography>
					<Grid container className={classes.note}>
						Ce menu vous permet de noter les perms dont vous avez été astreinteur au cours du semestre.<br/>
					</Grid>

					<Grid className={classes.section}>
						<Typography variant="h6" noWrap className={classes.subTitle}>
							<ChevronRight className={classes.subTitleIcon}/>
							Perms du matin
						</Typography>
						<Grid container>
							<CarouselItem periode="matin" grid_per_row="2" cell_height="470"/>
						</Grid>
					</Grid>

					<Grid className={classes.section}>
						<Typography variant="h6" noWrap className={classes.subTitle}>
							<ChevronRight className={classes.subTitleIcon}/>
							Perms du midi
						</Typography>

						<Grid container>
							<CarouselItem periode="midi" grid_per_row="1.5" cell_height="500"/>
						</Grid>
					</Grid>

					<Grid className={classes.section}>
						<Typography variant="h6" noWrap className={classes.subTitle}>
							<ChevronRight className={classes.subTitleIcon}/>
							Perms du soir
						</Typography>
						<div className={classes.gridList}>
							<CarouselItem periode="soir" grid_per_row="1" cell_height="800"/>
						</div>
					</Grid>
				</Grid>
				
			</div>
		);
	};

}

const styles = theme => ({
	container: {
		padding: 20,
		margin: 30,
		marginTop: 100,
		border: "2px solid #B22132",
	},
	section:{
		paddingBottom :70,
	},
	paper: {
		padding: 10
	},
	note: {
		backgroundColor: 'rgba(0,0,0, 0.05)',
		padding: 10,
		border: 'thin solid grey',
		marginTop: 16,
		marginBottom: 8,
	},
	textField: {
		marginTop: 16,
		paddingRight: 15,
		width: "100%",
	},
	suggestions: {
		zIndex: 100,
		position: 'absolute',
		maxHeight: 200,
		overflowY: 'scroll',
		marginRight: 15,
	},
	card: {
		margin: 30,
		padding : 10,
		fontSize : 9
	},
	addButton: {
		marginTop: 16,
		marginBottom: 8,
		height: 49,
		width: "100%",
	},
	subTitle: {
		marginTop: 10,
		marginBottom: 10,
	},
	subTitleIcon: {
		marginRight: 8,
		paddingTop: 5,
	},
	row: {
		height: 40,
	},
	cell: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	btn: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 3,
	},
	gridList: {
		display: 'flex',
		flexWrap: 'wrap',
	},
});

export default withStyles (styles) (Dashboard)








