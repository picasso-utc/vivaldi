import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import CarouselItem from './CarouselItem.js'

import { ajaxGet } from '../../utils/Ajax';



class Dashboard extends Component{
 
	
	constructor(props) {
		super(props)

		this.state ={
			astreintes_matin : [],
			astreintes_midi : [],
			astreintes_soir : [],
			loading: true,
		}
		
	}

	componentDidMount(){
		this.loadCreneau();
	}


	loadCreneau(){
		ajaxGet('perms/user/astreintes').then(res => {

			const astreintes_matin = []
			const astreintes_midi = []
			const astreintes_soir = []
			for (let index = 0; index < res.data.astreintes.length; index++) {
				if (res.data.astreintes[index].creneau.creneau === "M"){
					astreintes_matin.push(res.data.astreintes[index]);
				} else if (res.data.astreintes[index].creneau.creneau === "D"){
					astreintes_midi.push(res.data.astreintes[index]);
				} else {
					astreintes_soir.push(res.data.astreintes[index]);
				}
			}
			

			this.setState({astreintes_matin: astreintes_matin, astreintes_midi: astreintes_midi, astreintes_soir: astreintes_soir, loading:false})
		})
	}

	render(){
		
		const { classes } = this.props;
		const { astreintes_matin, astreintes_midi, astreintes_soir, loading } = this.state;

		if (loading) {
			return(
				<p>chargement...</p>
			)
		}

		return (
			<div className="admin_container">
				

				<Grid container className={classes.section}>
					<Typography variant="h5" className={classes.title}>
						<ChevronRight className={classes.subTitleIcon}/>
						Notation des perms
					</Typography>
					<Grid container className={classes.note}>
						Ce menu vous permet de noter les perms dont tu as été astreinteur au cours du semestre.<br/>
					</Grid>

					<Grid container direction="row" className={classes.section}>
						<Typography variant="h6" className={classes.subTitle}>
							<ChevronRight className={classes.subTitleIcon}/>
							Perms du matin
						</Typography>
						<Grid container>
							<CarouselItem periode="matin" grid_per_row="2" cell_height="470" astreintes={astreintes_matin}/>
						</Grid>
					</Grid>

					<Grid container direction="row" className={classes.section}>
						<Typography variant="h6" className={classes.subTitle}>
							<ChevronRight className={classes.subTitleIcon}/>
							Perms du midi
						</Typography>

						<Grid container>
							<CarouselItem periode="midi" grid_per_row="1.5" cell_height="500" astreintes={astreintes_midi}/>
						</Grid>
					</Grid>

					<Grid  container direction="row" className={classes.section}>
						<Typography variant="h6" className={classes.subTitle}>
							<ChevronRight className={classes.subTitleIcon}/>
							Perms du soir
						</Typography>
						<Grid container>
							<CarouselItem periode="soir" grid_per_row="1.5" cell_height="800" astreintes={astreintes_soir}/>
						</Grid>
					</Grid>
				</Grid>
				
			</div>
		);
	};

}

const styles = theme => ({
	section:{
		paddingBottom : 10,
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
	title : {
		fontWeight: 400,
	},
	subTitle: {
		marginTop: 10,
		marginBottom: 10,
		fontWeight: 400
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








