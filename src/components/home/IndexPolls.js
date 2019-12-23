import React from "react";
import { withStyles } from '@material-ui/core/styles'
import { ajaxGet } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import {URL} from '../../utils/Config';

class IndexPolls extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			surveys: [],
			loading: true
		}
	}

	
	componentDidMount(){
		this.loadSurveys();
	}


	loadSurveys(){
		ajaxGet('surveys/public').then((res) => {
            this.setState({surveys: res.data.surveys, loading: false});
        })
        .catch((error) => {
            console.log(error);
        })
	}
	

	goToPoll(index){
		const redirection = asset_url("/poll/" + this.state.surveys[index].id);
		window.location = redirection;
	}
    

  	render() {

		const { loading, surveys } = this.state;

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
					surveys.length > 0 ? (
						<div className={classes.root}>
							<table className={classes.table}>
								<thead></thead>
                                <tbody>
                                    <tr style={{margin: 10}}>
                                        {surveys.map((survey, index) => (
                                            <td key={index} className={classes.cell}>
												<Grid container direction="row" justify="center" alignItems="center">
													<Typography variant="h6" className={classes.survey_title}>
														{survey.title}
													</Typography>
												</Grid>
												<Grid container direction="row" justify="center" alignItems="center">
                                                	<img alt={survey.title} src={`${URL}/media/${survey.image}`} className={classes.survey_img}/>
												</Grid>
												<Grid container direction="row" justify="center" alignItems="center">
													<Typography variant="body1" className={classes.survey_description}>
														{survey.description.length > 50 ? (
															<span>{survey.description.substring(0,49)} (...)</span>
														):(
															<span>{survey.description.substring(0,49)}</span>
														)}
													</Typography>
												</Grid>
												<Grid container direction="row" justify="center" alignItems="center">
													<Button 
														variant="contained" 
														className={classes.btn}
														onClick={() => this.goToPoll(index)}
													>
														Consulter
													</Button>
												</Grid>
                                            </td>
                                        ))}
                                    </tr>
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
								<Typography className="fontWeight200 center">Pas de sondage actuellement ...</Typography>
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
		marginBottom: 10,
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
	survey_title : {
		display: 'inline-block',
		height: 60,
		overflow: 'hidden !important',
		textOverflow: 'ellipsis',
		fontWeight: 300,
	},
	survey_description : {
		padding: 5,
		marginTop: 5,
		textAlign: 'center',
		maxWidth: 180,
		overflowWrap : 'break-word',
		display: 'inline-block',
		height: 80,
		overflow: 'hidden !important',
		textOverflow: 'ellipsis',
		fontWeight: 200,
	},
	cell: {
		maxWidth: 180,
		width: '16%',
		padding: 5,
		textAlign: 'center',
		margin: 0,
		color: 'white',
		fontWeight: 200,
		minWidth: 100,
	},
    survey_img : {
        height: 100,
		borderRadius: 5,
		marginBottom: 10,
		maxWidth: '100%',
        objectFit: 'contain'
	},
	btn : {
		margin: 10
	}
});

export default withStyles (styles) (IndexPolls)
