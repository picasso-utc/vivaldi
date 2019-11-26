import React from "react";
import { withStyles } from '@material-ui/core/styles'
import { addDays, formateToDjangoDate } from '../../utils/Date';
import { ajaxPost } from '../../utils/Ajax';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from "@material-ui/core";

class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			creneaux: [],
			loading: true
		}
	}

	
	componentDidMount(){
		this.loadCreneauDate();
	}

	loadCreneauDate(startDate=null, endDate=null){
		if (!startDate || !endDate) {
			const currentDate = new Date();
			// On récupère le jour de la SVGElementInstance, entre 0 (dimanche) et 6
			const current_day = currentDate.getDay();
			// Le jour de départ doit être lundi, donc day = 1
			// Fonction addDays qui va enlever ou ajouter le nombre de jour nécessaire
			const startDate = addDays(currentDate, 1 - current_day);
			// Le jour de fin doit être vendredi, donc day = 5
			const endDate = addDays(currentDate, 5-current_day)

			this.setState({startDate: startDate, endDate: endDate})

			// On envoie les dates avec le format Django
			this.loadCalendar(formateToDjangoDate(startDate), formateToDjangoDate(endDate));
		} 
	}

	loadCalendar(startDate, endDate){
		ajaxPost('perms/calendar', {start_date: startDate, end_date: endDate}).then(res => {
			this.setState({creneaux: res.data.creneaux, loading: false})
		})
		.catch(error => {
			this.setState({loading: false});
		});
	}

	displayCreneau(date, creneau_type){
		if(date){
			date = formateToDjangoDate(date);
			const found_creneaux = this.state.creneaux.filter(c => c.date === date && c.creneau === creneau_type);
			if (found_creneaux.length > 0) {
				return found_creneaux[0].perm.nom;
			}
		}
		return '';
	}

  	render() {

		const { startDate, loading, creneaux } = this.state;

		const { classes } = this.props;

		const week_days=[0,1,2,3,4]
		const creneau_types=[
			{code: 'M', name:'Matin'},
			{code: 'D', name:'Midi'},
			{code: 'S', name:'Soir'}
		];

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
					creneaux.length > 0 ? (
						<div className={classes.root}>
							<table className={classes.table}>
								<thead>
									<tr>
										<th></th>
										<th className={classes.topTitleCell}>Lundi</th>
										<th className={classes.topTitleCell}>Mardi</th>
										<th className={classes.topTitleCell}>Mercredi</th>
										<th className={classes.topTitleCell}>Jeudi</th>
										<th className={classes.topTitleCell}>Vendredi</th>
									</tr>
								</thead>
								<tbody>
									{creneau_types.map((creneau_type) => (
										<tr key={creneau_type.code}>
											<th className={classes.leftTitleCell}>{creneau_type.name}</th>
											{week_days.map((week_day, index)=> (
												<td key={index} className={classes.cell}>
													{this.displayCreneau(addDays(startDate, week_day), creneau_type.code)}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					):(
						<Grid 
							container 
							className={classes.loader}
							direction="row"
							justify="center"
							alignItems="center"
						>
							<Grid item>
								<Typography style={{fontWeight: 300}}>Il n'y a pas de perm cette semaine, smiley triste ... </Typography>
							</Grid>
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
	table : {
		borderCollapse: 'collapse',
		width: '90%',
		marginRight: '5%',
		marginLeft: '5%',
	},
	leftTitleCell: {
		fontSize: 16,
		width: '10%',
		minWidth: 50,
		fontWeight: 500,
	},
	topTitleCell: {
		width: '15%',
		paddingBottom: 10,
		fontSize: 16,
		fontWeight: 500,
		textAlign: 'center',
		margin: 0,
		minWidth: 100,
	},
	cell: {
		borderRight: '2px solid #B22132',
		borderLeft: '2px solid #B22132',
		width: '16%',
		padding: 5,
		textAlign: 'center',
		margin: 0,
		color: 'white',
		fontWeight: 200,
		minWidth: 100,
	},

});

export default withStyles (styles) (Calendar)
