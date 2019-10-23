import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Grid, Menu, MenuItem, Paper } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import notation_perm from './notation.json'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import withWidth from '@material-ui/core/withWidth';


import { ajaxGet, ajaxPost } from '../../utils/Ajax';


class CarouselItem extends Component{
 
	
	constructor(props) {
		super(props)

		this.state ={
			creneaux : [],
			notation : [],
			grid_per_row : this.props.grid_per_row,
			cell_height : this.props.cell_height,
		}
	}

	componentDidMount(){
		// Load notation json file
		if(this.props.periode == "soir"){
			this.setState({notation : notation_perm.soir});
		}
		if(this.props.periode == "midi"){
			this.setState({notation : notation_perm.midi});
		}
		if(this.props.periode == "matin"){
			this.setState({notation : notation_perm.matin});
		}

	}

	render(){
		
		const { classes, width } = this.props;
		const { grid_per_row, notation, cell_height } = this.state;
		const astreintes = this.props.astreintes
		let columns = width === 'xs' || width === 'sm'  ? 1 : 2;

		return (
			<div className={classes.gridList}>
				{astreintes.map((astreinte, astreinte_index) => (
					<div key={astreinte_index} cols={1} rows={1}>
						<Card xs={12} sm= {6} className={classes.card}>
							<Typography variant="h5" noWrap className={classes.subTitle}>
								{astreinte.creneau.perm.nom} - {astreinte.creneau.date}
							</Typography>
							<CardContent>
								<FormControl component="fieldset"> 
									<Grid container direction="row">   
									    {notation.map((perm,perm_index) => (

											<Grid key={perm_index} item xs={12} sm= {6} >
												<Typography variant="h6" noWrap className={classes.subTitle}>
													{perm.categorie}
												</Typography>
												<RadioGroup aria-label="position" name="position" >
													{perm.notation.map((menu, menu_index) => (
											    		<FormControlLabel
														value={menu.value}
														control={<Radio color="primary" />}
														label={menu.label}
														key={menu_index}
														/>
													))}
											    </RadioGroup>
										    </Grid>
										))}
									</Grid>

									<TextField
										id="outlined-multiline-flexible"
										label="Commentaire"
										multiline
										rowsMax="4"
										//value={values.multiline}
										// onChange={handleChange('multiline')}
										className={classes.textField}
										margin="normal"
										variant="outlined"
									/>
								</FormControl>
								<CardActions style={{justifyContent: 'center'}}>
									<Button variant="contained" size="large" color="primary" >
						        		Valider
						        	</Button>
							  	</CardActions>
							</CardContent>
						</Card>
					</div>
				))}
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
		flexWrap: 'nowrap',
		overflowX: 'auto',
    	// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    	transform: 'translateZ(0)',
    },
});

export default withStyles (styles) (CarouselItem)









