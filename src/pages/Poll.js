import React from 'react'
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { ajaxGet } from '../utils/Ajax';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Chip from '@material-ui/core/Chip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {URL, asset_url} from '../utils/Config';



class Poll extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			survey: {

            },
            loading: true,
            vote_loading: false,
            results : [],
        }
        this.canVote = this.canVote.bind(this);
	}

	
	componentDidMount(){
		this.loadSurveys();
	}

	loadSurveys(){
        const id = this.props.match.params.id;
		ajaxGet('surveys/public/' + id).then((res) => {
            this.setState({survey: res.data.survey, loading: false});
            this.getResults();
        })
        .catch((error) => {
            console.log(error);
        })
    }


    getResults(){
        ajaxGet('surveys/public/results/' + this.state.survey.id).then((res) => {
            this.setState({results: res.data.results})
        })
    }


    findResult(item_id){
        const results = this.state.results;
        const item_index = results.findIndex(r => r.id === item_id);
        console.log(item_index)
        if (item_index > -1) {
            return results[item_index].votes.toFixed(2);
        }
        return null;
    }


    canVote(){
        if (!this.state.survey.multi_choice) {
            const index = this.state.survey.surveyitem_set.findIndex(s => s.voted === true)
            if (index > -1) {
                return false;
            }
        }
        return true;
    }


    hasVote(){
        const index = this.state.survey.surveyitem_set.findIndex(s => s.voted === true)
        if (index > -1) {
            return true;
        }
        return false;
    }


    isThereDescriptionInItems(survey){
        let found = false;
        for (let index = 0; index < survey.surveyitem_set.length; index++) {
            if(survey.surveyitem_set[index].description){
                found = true;
            }
        }
        return found;
    }


    cancelVote(item_index){
        this.setState({vote_loading: true})
        let items = [...this.state.survey.surveyitem_set];
        ajaxGet('surveys/public/vote/cancel/' + items[item_index].id).then((res) => {
            items[item_index].voted = false;
            this.setState({survey:{...this.state.survey, items}, vote_loading: false});
            this.getResults();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    vote(item_index){
        this.setState({vote_loading: true})
        let items = [...this.state.survey.surveyitem_set];
        ajaxGet('surveys/public/vote/' + this.state.survey.id + '/' + items[item_index].id).then((res) => {
            items[item_index].voted = true;
            this.setState({survey:{...this.state.survey, items}, vote_loading: false});
            this.getResults();
        })
        .catch((error) => {
            console.log(error);
        })
    }

	render() {

        const { survey, loading, vote_loading } = this.state;
		const { classes } = this.props;

		return (
			<React.Fragment>
				<CssBaseline />

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
				
                    <Container className={classes.root}>
                        <Link to="/" color="inherit" className={classes.exit_link}>
                            <Button
                                variant="contained"
                                size="small"
                                margin="dense"
                                className={classes.exit_btn}
                            >
                                <ExitToAppIcon className={classes.exit_icon}/> Retour à l'accueil
                            </Button>
						</Link>
                        <Container className={classes.container}>
                            <fieldset className={classes.component} style={{minWidth: 1}}>
                                <legend className={classes.legend}>{survey.title}</legend>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Typography variant="body1" className={classes.survey_description}>
                                            {survey.description}{survey.multi_choice && <span className={classes.multiple_choice}>(Choix multiple)</span>}
                                        </Typography>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <img alt={survey.title} src={`${URL}/media/${survey.image}`} className={classes.survey_img}/>
                                    </Grid>


                                <div className={classes.root_items}>
                                    <GridList className={classes.gridList} cols={2.5}>
                                        {survey.surveyitem_set.map((item, item_index) => (
                                            <GridListTile key={item_index} style={{height: '100%', minWidth: 150, maxWidth: 300}}>
                                                <Card className={classes.card}>
                                                    {this.isThereDescriptionInItems(survey) &&
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <Typography variant="body1" className={classes.subTitle}>
                                                                {item.name}
                                                            </Typography>
                                                        </Grid> 
                                                    }
                                                    <img
                                                        alt={item.name}
                                                        className={classes.item_img}
                                                        src={item.image ? `${URL}/media/${item.image}` : asset_url('/images/default_image.png')}
                                                    />
                                                    {this.isThereDescriptionInItems(survey) ? (
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <p className={classes.item_description}>{item.description}</p>
                                                        </Grid>
                                                    ):(
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <Typography variant="body1" className={classes.subTitle}>
                                                                {item.name}
                                                            </Typography>
                                                        </Grid>
                                                    )}
                                                    
                                                    {this.hasVote() && 
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <p>{this.findResult(item.id)}%</p>
                                                        </Grid>
                                                    }
                                                
                                                    <Grid container direction="row" justify="center" alignItems="center">
                                                        {item.voted ? (
                                                            <Chip 
                                                                label="Voté !" 
                                                                className={classes.voted_item} 
                                                                onDelete={() => this.cancelVote(item_index)}
                                                            />
                                                        ):(
                                                            <React.Fragment>
                                                                {this.canVote() === true ? (
                                                                    <Button 
                                                                        variant="contained" 
                                                                        margin="dense"
                                                                        size="small"
                                                                        onClick={() => this.vote(item_index)}
                                                                        disabled={vote_loading}
                                                                    >
                                                                        Voter
                                                                    </Button>
                                                                ):(
                                                                    <span></span>
                                                                )}
                                                            </React.Fragment>
                                                        )}
                                                        
                                                    </Grid>
                                                </Card>
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </div>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Typography className={classes.note}>
                                        ** Note : Votre vote sera conservée durant la durée du sondage et supprimée par la suite.
                                    </Typography>
                                </Grid>
                            </fieldset>   
                        </Container>

				    </Container>
                )}
			</React.Fragment>
		);
	}
}

const styles = theme => ({
	root: {
		width:'100%',
		maxWidth: '100%',
		margin: 0,
		paddingRight: '5%',
		paddingLeft: '5%',
		paddingBottom: 40,
		backgroundColor: '#000223',
        color: 'white',
        height: '100vh',
    },
    survey_img : {
        height: 140,
        borderRadius: 5,
    },
	header : {
		height: window.innerHeight,
	},
	title: {
		color: 'white',
		textAlign: "center",
		marginTop: 50,
	},
	container: {
		padding: 0,
	},
	component: {
        padding: '5%',
        paddingBottom: 20,
		border: "#B22132 1.5px solid",
		textAlign: 'center',
	},
	legend : {
		fontSize: 34,
		padding: 15,
    },
    loader: {
        marginTop: 200,
    },
    survey_description : {
        marginTop: -30,
        maxWidth: 500,
        overflowWrap : 'break-word',
        marginBottom: 20,
        fontWeight: 300,
    },
    btn : {
        margin: 5,
    },
    subTitle:{
        marginBottom: 10,
        fontWeight: 300,
    },
    title_btn: {
        marginLeft: 20,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    generate_btn: {
        margin: 20,
        marginTop: 30,
    },
    card: {
        maxWidth: 300,
        backgroundColor: '#000223',
        color: 'white',
        marginBottom: 15
    },
    item_img: {
        height: 90,
        borderRadius: 5,
        backgroundSize: 'contain',
    },
    add_item : {
        marginLeft: 10,
    },
    root_items: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowX: 'hidden',
        marginTop: 30,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%',
    },
    voted_item : {
        backgroundColor : '#43A047',
        color: 'white'
    },
    item_description : {
        height: 80,
        overflowY: 'overlay',
        fontWeight: 200,
    },
    note : {
        fontWeight: 200,
        fontSize: 10,
    },
    exit_link : {
        textDecoration: 'none',
    },
    exit_btn : {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 400,
        textTransform: 'none',
    },
    exit_icon : {
        marginRight: 5,
    },
    multiple_choice : {
        fontSize: 12,
        marginLeft: 8,
    },
});

export default withStyles(styles)(Poll)
