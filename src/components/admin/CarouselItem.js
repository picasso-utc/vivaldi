import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import notation_perm from './notation.json'
import { formateFromDjangoDate, compareDjangoDate } from '../../utils/Date';
import SnackbarComponent from '../../utils/SnackbarComponent';
import { ajaxPut } from '../../utils/Ajax';


class CarouselItem extends Component{
 
	
	constructor(props) {
		super(props)

		this.state ={
			notation : [],
			astreintes: [],
			grid_per_row : this.props.grid_per_row,
			cell_height : this.props.cell_height,
			snackbar: {
				open: false,
				variant: 'success',
                message: '',
			},
		}
		this.handleChange = this.handleChange.bind(this)
		this.compareAstreinte = this.compareAstreinte.bind(this)
		this.addNote = this.addNote.bind(this)
		this.isAstreinteRated = this.isAstreinteRated.bind(this)
	}

	componentDidMount(){
		// Load notation json file
		if(this.props.periode === "soir"){
			this.setState({notation : notation_perm.soir});
		}
		if(this.props.periode === "midi"){
			this.setState({notation : notation_perm.midi});
		}
		if(this.props.periode === "matin"){
			this.setState({notation : notation_perm.matin});
		}

		this.setState({astreintes: this.props.astreintes})
	}


	compareAstreinte(a1, a2){
		const a1_rated = this.isAstreinteRated(a1);
		const a2_rated = this.isAstreinteRated(a2);
		if (a1_rated && !a2_rated) {
			return 1;
		} else if (!a1_rated && a2_rated){
			return -1;
		}
		if (compareDjangoDate(a1.creneau.date,a2.creneau.date)) {
			return 1;
		}
		return -1;
	}

	
	isAstreinteRated(a1){
		
		if (a1.not_rated) {
			return false;
		}
		let rated = true;
		const notation = this.state.notation;

		for (let index = 0; index < notation[a1.astreinte_type].length; index++) {
			const name = notation[a1.astreinte_type][index].name;
			if (a1[name] === 0 ) {
				rated = false;
			}
		}
		return rated;
	}

	handleChange(event, astreinte){
		let astreintes = this.state.astreintes;
		const astreinte_index = astreintes.findIndex(a => a.id === astreinte.id);
		let value = event.target.value;
		if (event.target.name !== "commentaire") {
			value = Number(value);
		}
		if (astreintes[astreinte_index][event.target.name] === 0) {
			astreintes[astreinte_index].not_rated = true;
		}
		astreintes[astreinte_index][event.target.name] = value;
		this.setState({astreintes: astreintes})
	}

	addNote(astreinte){
        ajaxPut('perm/astreintes/'+astreinte['id']+'/',astreinte).then(() => {
			this.changeSnackbarState(true, 'success', 'La notation a bien été enregistrée');
			if (astreinte.not_rated) {
				let astreintes = this.state.astreintes;
				const astreinte_index = astreintes.findIndex(a => a.id === astreinte.id);
				astreintes[astreinte_index].not_rated = false;
				this.setState({astreintes: astreintes})
			}
        })
        .catch(() => {
        	this.changeSnackbarState(true, 'error', 'Une erreur est survenue lors de l\'enregistrement');
        })
    }

	changeSnackbarState(open, variant, message){
		this.setState({
			snackbar: {
				open: open,
				variant: variant,
				message: message
			}
		})
	}

	render(){
		
		const { classes } = this.props;
		const { notation, astreintes, snackbar } = this.state;

		return (
			<div className={classes.gridList}>
				{astreintes.sort(this.compareAstreinte)
				.map((astreinte, astreinte_index) => (
					<div key={astreinte_index} cols={1} rows={1}>
						<Card xs={12} sm= {6} className={classes.card} style={this.isAstreinteRated(astreinte) ? {backgroundColor: 'rgba(0,0,0, 0.05'} : {backgroundColor: 'white'}  }>
							<Typography variant="h5" noWrap className={classes.subTitle}>
								{astreinte.creneau.perm.nom} - {formateFromDjangoDate(astreinte.creneau.date)}
							</Typography>
							{astreinte.creneau.article_set.length > 0 &&
								<React.Fragment>
									<Typography variant="body1" noWrap>
										Article(s):
									</Typography>
									<ul>
										{astreinte.creneau.article_set.map((article, article_index) => (
											<li key={article_index}><Typography variant="body1" noWrap>{article.nom}</Typography></li>
										))}
									</ul>
								</React.Fragment>
							}
							
							<CardContent>
								<FormControl component="fieldset" style={{width: '100%'}}> 
									<Grid container direction="row">   
											{notation[astreinte.astreinte_type].map((perm_type,perm_type_index) => (
												
												<Grid key={perm_type_index} item xs={12} sm= {6} >
													<Typography variant="h6" noWrap className={classes.subTitle}>
														{perm_type.categorie}
													</Typography>
													<RadioGroup 
														aria-label="position" 
														name={perm_type.name} 
														value={astreinte[perm_type.name]} 
														onChange={(event) => this.handleChange(event, astreinte)}
													>
														{perm_type.notation.map((type, type_index) => (
															<FormControlLabel
																value={type.value}
																control={<Radio color="primary" />}
																label={type.label}
																key={type_index}
															/>
														))}
													</RadioGroup>
												</Grid>
											))}
									</Grid>

									<TextField
										label="Commentaire"
										multiline
										rows="3"
										name="commentaire"
										value={astreinte.commentaire || ''}
										onChange={(event) => this.handleChange(event, astreinte)}
										className={classes.textField}
										margin="normal"
										variant="outlined"
									/>
								</FormControl>
								<CardActions style={{justifyContent: 'center'}}>
									<Button variant="contained" size="large" color="primary" onClick={(event) => this.addNote(astreinte)}>
						        		Valider
						        	</Button>
							  	</CardActions>
							</CardContent>
						</Card>
					</div>
				))}
				<SnackbarComponent 
                    open={snackbar.open} 
                    variant={snackbar.variant} 
                    message={snackbar.message}
					duration={5000}
					horizontal='right'
					vertical='bottom'
                    closeSnackbar={
                        ()=>{
                            this.setState({
                                snackbar: {
                                    ...this.state.snackbar,
                                    open: false,
                                }
                            })
                        }
                    }
                />
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
		fontSize : 9,
		minWidth: 400,
	},
	ratedAstreinte: {
		backgroundColor: 'rgba(0,0,0, 0.05)',
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









