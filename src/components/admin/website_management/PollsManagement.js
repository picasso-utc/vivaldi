import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import { ajaxGet, ajaxPost, ajaxDelete, ajaxPut, ajaxPatch } from '../../../utils/Ajax';
import {URL} from '../../../utils/Config';


class PollsManagement extends Component{
 
    
    constructor(props) {
        super(props)
        this.state = {
            surveys: [],
            loading: true,
            open_modal: false,
            survey : {
                title: '',
                description: '',
                image: null,
                visible: false,
                multi_choice: false,
                surveyitem_set: [],
            },
            surveys_history : [],
            mode: 'create',
            confirm_modal: false
        }

        this.handleModalClickClose = this.handleModalClickClose.bind(this);
        this.selectSurvey = this.selectSurvey.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSurveyItemChange = this.handleSurveyItemChange.bind(this);
        this.addSurveyItem = this.addSurveyItem.bind(this);
    }


    componentDidMount(){
        this.loadHistory();
        this.loadSurveys()
    }


    loadHistory(){
        ajaxGet('surveys/history').then(res => {
            let surveys_history = res.data.surveys;
            surveys_history = surveys_history.sort(function(a,b){
                if (a.id > b.id) {
                    return -1
                }
                return 1
            })
            for (let index = 0; index < surveys_history.length; index++) {
                surveys_history[index].surveyitem_set = surveys_history[index].surveyitem_set.sort(function(a,b){
                    if (a.votes > b.votes) {
                        return -1
                    }
                    return 1
                })
            }
            this.setState({surveys_history: surveys_history});
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }

    loadSurveys(){
        ajaxGet('surveys').then(res => {
            let surveys = res.data;
            // Count total vote for each surveys
            for (let index = 0; index < surveys.length; index++) {
                let total_votes = 0;
                for (let j = 0; j < surveys[index].surveyitem_set.length; j++) {
                    total_votes += surveys[index].surveyitem_set[j].surveyitemvote_set.length;
                }  
                surveys[index].total_votes = total_votes;              
            }
            for (let index = 0; index < surveys.length; index++) {
                surveys[index].surveyitem_set = surveys[index].surveyitem_set.sort(function(a,b){
                    if (a.surveyitemvote_set.length > b.surveyitemvote_set.length) {
                        return -1
                    }
                    return 1
                })
            }
            this.setState({surveys: surveys, loading: false});
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }

    
    reloadNewSurvey = () => {
        this.setState({survey: {
            title: '',
            description: '',
            image: '',
            surveyitem_set: [],
            multi_choice: false,
            visible: false
        }, mode: 'create'})
    }


    handleSurveyItemChange(event, index){

        if (event.target.name === "name" && event.target.value > 20) {
            return;
        }

        const { name, value } = event.target;
        let surveyitem_set = [...this.state.survey.surveyitem_set];
        surveyitem_set[index][name] = value;
        this.setState({survey:{...this.state.survey, surveyitem_set}});
    }


    handleChange(event){
        if (event.target.name === "title" && event.target.value.length > 20) {
            return;
        }

        this.setState({
            survey: {
                ...this.state.survey,
                [event.target.name]: event.target.value
            }
        })
    }


    handleFileChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        let image = null;

        reader.readAsDataURL(file);   
        reader.onloadend = () => {
            image = reader.result;
            this.setState({
                survey: {
                    ...this.state.survey,
                    image: image
                }
            })
        }
    }


    handleItemFileChange(e, index) {
        const file = e.target.files[0];
        const reader = new FileReader();
        let image = null;

        reader.readAsDataURL(file);   
        reader.onloadend = () => {
            image = reader.result;
            let surveyitem_set = [...this.state.survey.surveyitem_set];
            surveyitem_set[index].image = image;
            this.setState({survey:{...this.state.survey, surveyitem_set}});
        }
    }


    handleModalClickClose = () => {
        this.setState({open_modal: false, confirm_modal: false, loading: true})
        this.loadSurveys();
        this.reloadNewSurvey();
    };


    handleConfirmModalOpen(survey){
        this.setState({confirm_modal: true, survey: survey})
    }


    handleModalClickOpen = () => {
        this.setState({open_modal: true})
    }


    handleCheckChange(event){
        const multi_choice = this.state.survey.multi_choice;
        this.setState({
            survey: {
                ...this.state.survey,
                multi_choice: !multi_choice
            }
        })
    }


    selectSurvey = (survey) => {
        var request = new XMLHttpRequest();
        const that = this
        request.open('GET', URL + '/media/' + survey.image, true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload =  function(e){
                survey.image = reader.result;
                for (let index = 0; index < survey.surveyitem_set.length; index++) {
                    survey.surveyitem_set[index].image = URL + '/media/' + survey.surveyitem_set[index].image;
                }
                that.setState({survey: survey, mode: 'edit'})
                that.handleModalClickOpen();
            };
        };
        request.send(); 
    }


    addSurveyItem(){
        const new_survey_item = {
            name: '',
            description: '',
            image: null,
            survey: this.state.survey.id
        }
        let surveyitem_set = [...this.state.survey.surveyitem_set];
        surveyitem_set.push(new_survey_item);
        this.setState({survey:{...this.state.survey, surveyitem_set}});
    }


    changeSurveyVisibility(index){
        let surveys = [...this.state.surveys];
        surveys[index].visible = !surveys[index].visible;
        ajaxPatch('surveys/' + surveys[index].id + '/', {visible: surveys[index].visible}).then((res) => {
            this.setState({surveys: surveys})
        })
    }


    saveSurvey(){
        if(this.state.mode === "create"){
            ajaxPost('surveys/', this.state.survey).then((res) => {
                this.setState({
                    survey: {
                        ...this.state.survey,
                        id: res.data.id
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })  
        } else if (this.state.mode === "edit"){
            ajaxPut('surveys/' + this.state.survey.id + '/', this.state.survey).then((res) => {
                this.setState({
                    survey: {
                        ...this.state.survey,
                        id: res.data.id
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })  
        }
    }

    saveSurveyItem(index){
        let surveyitem_set = [...this.state.survey.surveyitem_set];
        if (surveyitem_set[index].id) {
            // Check si l'image commence par http
            if (surveyitem_set[index].image.startsWith('http')) {
                let request = new XMLHttpRequest();
                request.open('GET', surveyitem_set[index].image, true);
                request.responseType = 'blob';
                request.onload = function() {
                    var reader = new FileReader();
                    reader.readAsDataURL(request.response);
                    reader.onload =  function(e){
                        surveyitem_set[index].image = reader.result;
                        // Update de l'item
                        ajaxPut('survey/items/' + surveyitem_set[index].id + '/', surveyitem_set[index]).then((res) => {

                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    };
                };
                request.send();
            }
            
        } else {
            //Création de l'item
            ajaxPost('survey/items/', surveyitem_set[index]).then((res) => {
                surveyitem_set[index].id = res.data.id;
                this.setState({survey:{...this.state.survey, surveyitem_set}, mode:"edit"});
            })
            .catch((error) => {
                console.log(error)
            })
        }        
    }

    deleteSurveyItem(index){
        let surveyitem_set = [...this.state.survey.surveyitem_set];
        const survey_item_id = surveyitem_set[index].id
        ajaxDelete('survey/items/' + survey_item_id + '/').then(() => {
            surveyitem_set = surveyitem_set.filter(s => s.id !== survey_item_id)
            this.setState({survey:{...this.state.survey, surveyitem_set}});
        })
        .catch((error) => {

        })
    }


    deleteSurvey(survey_id){
        ajaxGet('surveys/delete/' + survey_id).then(() => {
            let surveys = this.state.surveys;
            surveys = surveys.filter(s => s.id !== survey_id)
            this.setState({surveys: surveys, confirm_modal: false})
            this.loadHistory();
        })
        .catch((error) => {

        })
        this.reloadNewSurvey();
    }

    render(){
        
        const { classes } = this.props;
        const { surveys, loading, open_modal, survey, mode, confirm_modal, surveys_history } = this.state;

        if (loading) {
            return (
                <Grid 
                    container 
                    className="admin_loader"
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <CircularProgress className={classes.progress} />
                    </Grid>
                </Grid>
            )
        }

        return (
            <div className="admin_container">
                          
                {surveys.length === 0 ? (
                    <React.Fragment>
                        <Grid 
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Typography variant="h6">
                                Pas de sondages pour le moment. 
                            </Typography>
                            <br/>
                        </Grid>
                        <Grid 
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Button 
                                variant="contained" 
                                size="small" 
                                margin="dense"
                                className={classes.btn} 
                                color="primary"
                                onClick={(e) => this.handleModalClickOpen()}
                            >
                                Nouveau sondage
                            </Button>
                        </Grid>
                    </React.Fragment>
                ):(
                    <div>
                        <Typography variant="h6" className={classes.subTitle}>
                            <ChevronRightIcon className={classes.subTitleIcon}/>
                            Liste des sondages
                            <Fab 
                                size="small" 
                                color="primary" 
                                className={classes.add_item}
                                onClick={(e) => this.handleModalClickOpen()}
                            >
                                <AddIcon />
                            </Fab>
                        </Typography>
                        <Grid container direction="row">
                            <Paper className={classes.rootTable}>
                                <Table size="small">
                                    <TableBody>
                                        {surveys.map((survey, survey_index) => (
                                            <TableRow hover key={survey_index} className={classes.row}>
                                                <TableCell component="th" scope="row" className={classes.cell}>
                                                    {survey.title}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className={classes.cell}>
                                                  <Button 
                                                        size="small" 
                                                        variant="contained" 
                                                        margin="dense"
                                                        className={classes.btn} 
                                                        color="primary"
                                                        onClick={(e) => this.selectSurvey(survey)}
                                                    >
                                                        Consulter
                                                    </Button>
                                                    <Button 
                                                        variant="contained" 
                                                        margin="dense"
                                                        size="small"
                                                        className={classes.btn} 
                                                        color={survey.visible ? "secondary" : "primary"}
                                                        onClick={(e) => this.changeSurveyVisibility(survey_index)}
                                                    >
                                                        {survey.visible ? (<span>Désactiver</span>):(<span>Activer</span>)}
                                                    </Button>
                                                    <Button 
                                                        size="small" 
                                                        color="secondary"
                                                        variant="contained" 
                                                        margin="dense"
                                                        className={classes.btn} 
                                                        onClick={() => this.handleConfirmModalOpen(survey)}
                                                    >
                                                        Supprimer
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </div>
                )}
                <Grid container direction="row">
                    <Typography variant="h6" className={classes.subTitle}>
                        <ChevronRightIcon className={classes.subTitleIcon}/>
                        Sondages en cours
                    </Typography>
                </Grid>
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    Nom
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Résultats
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Nombre de votes
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {surveys.map((row, index) => (
                                <TableRow hover key={index} className={classes.row}>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.description}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell} style={{minWidth: 300}}>
                                        <ul>
                                            {row.surveyitem_set.map((item_row, item_index) => (
                                                <li key={item_index}><strong>{item_row.name}:</strong> {((item_row.surveyitemvote_set.length/row.total_votes)*100).toFixed(1)}%</li>   
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.total_votes}                                       
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Grid container direction="row">
                    <Typography variant="h6" className={classes.subTitle}>
                        <ChevronRightIcon className={classes.subTitleIcon}/>
                        Historique
                    </Typography>
                </Grid>
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    Nom
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Résultats
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Nombre de votes
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {surveys_history.map((row, index) => (
                                <TableRow hover key={index} className={classes.row}>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.description}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell} style={{minWidth: 300}}>
                                        <ul>
                                            {row.surveyitem_set.map((item_row, item_index) => (
                                                <li key={item_index}><strong>{item_row.name}:</strong> {((item_row.votes/row.total_votes)*100).toFixed(1)}%</li>   
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.total_votes}                                       
                                    </TableCell>
                                        <TableCell className={classes.cell}>
                                            <Button 
                                                size="small" 
                                                color="secondary"
                                                variant="contained" 
                                                margin="dense"
                                                className={classes.btn} 
                                                onClick={() => this.handleConfirmModalOpen(row)}
                                            >
                                                Supprimer
                                            </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Dialog 
                    onClose={this.handleModalClickClose} 
                    open={open_modal} 
                    maxWidth="lg"
                    width="lg"
                    scroll="body"
                >
                    <DialogTitle onClose={this.handleModalClickClose}>
                        {mode === "edit"? (
                            <span>Sondage : {survey.title}</span>
                        ):
                        (
                            <span>Ajouter un nouveau sondage</span>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <CardMedia
                            className={classes.media}
                            image={survey.image ? survey.image : '/images/default_image.png'}
                        />
                        <Grid container direction="row" justify="center" alignItems="center">
                            <input
                                accept="image/*"
                                className={classes.input_file}
                                id="contained-button-file"
                                type="file"
                                onChange={(event) => this.handleFileChange(event)}
                                name="image"
                            />
                            <label htmlFor="contained-button-file">
                                <Button 
                                    variant="contained" 
                                    component="span" 
                                    className={classes.upload_button}
                                    name="image"
                                >
                                    Image
                                </Button>
                            </label>
                        </Grid>
                        <Grid container direction="row">
                            <TextField
                                label="Titre"
                                className={classes.textField}
                                value={survey.title}
                                onChange={this.handleChange}
                                name="title"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                label="Description"
                                className={classes.textField}
                                value={survey.description}
                                onChange={this.handleChange}
                                name="description"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                multiline
                                rows="3"
                            />   
                        </Grid>
                        <Grid container direction="row">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={survey.multi_choice}
                                        onChange={() => this.handleCheckChange()}
                                        color="primary"
                                    />
                                }
                                label="Choix multiple ?"
                            />
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Button 
                                onClick={() => this.saveSurvey()} 
                                variant="contained" 
                                color="primary"
                                margin="dense"
                                size="small"
                            >
                                Enregistrer
                            </Button>
                        </Grid>
                        {survey.id &&
                            <React.Fragment>
                                <Typography component="h3" className={classes.modal_title}>
                                    Items
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        margin="dense"
                                        size="small"
                                        className={classes.add_item}
                                        onClick={this.addSurveyItem}
                                    >
                                        Nouveau
                                    </Button>
                                </Typography>
                                <div className={classes.root_items}>
                                    <GridList className={classes.gridList} cols={2.5}>
                                        {survey.surveyitem_set.map((item, item_index) => (
                                            <GridListTile key={item_index} style={{height: '100%', minWidth: 250}}>
                                                <Card className={classes.card}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            className={classes.media}
                                                            image={item.image ? item.image : '/images/default_image.png'}
                                                        />
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <input
                                                                accept="image/*"
                                                                className={classes.input_file}
                                                                id={item_index}
                                                                type="file"
                                                                onChange={(event) => this.handleItemFileChange(event, item_index)}
                                                                name="image"
                                                            />
                                                            <label htmlFor={item_index}>
                                                                <Button 
                                                                    variant="contained" 
                                                                    component="span" 
                                                                    className={classes.upload_button}
                                                                    onChange={(event) => this.handleItemFileChange(event, item)}
                                                                >
                                                                    Image
                                                                </Button>
                                                            </label>
                                                        </Grid>
                                                        <Grid container direction="row">
                                                            <TextField
                                                                label="Titre"
                                                                className={classes.textField}
                                                                value={item.name}
                                                                onChange={(event) => this.handleSurveyItemChange(event, item_index)}
                                                                name="name"
                                                                fullWidth
                                                                margin="dense"
                                                                variant="outlined"
                                                            />
                                                            <TextField
                                                                label="Description"
                                                                className={classes.textField}
                                                                value={item.description}
                                                                onChange={(event) => this.handleSurveyItemChange(event, item_index)}
                                                                name="description"
                                                                fullWidth
                                                                margin="dense"
                                                                variant="outlined"
                                                                multiline
                                                                rows="3"
                                                            />
                                                        </Grid>
                                                        { survey.total_votes > 0 && item.surveyitemvote_set &&
                                                            <Grid container direction="row">
                                                                <Typography variant="body1" className={classes.vote_typo}>
                                                                    Vote : {item.surveyitemvote_set.length}/{survey.total_votes} ({((item.surveyitemvote_set.length/survey.total_votes)*100).toFixed(2)}%)
                                                                </Typography>
                                                            </Grid>
                                                        }
                                                    </CardActionArea>
                                                    <CardActions>
                                                        {item.id &&
                                                            <Button 
                                                                onClick={() => this.deleteSurveyItem(item_index)} 
                                                                color="secondary"
                                                                variant="contained" 
                                                                margin="dense"
                                                                size="small"
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        }
                                                        <Button 
                                                            onClick={() => this.saveSurveyItem(item_index)} 
                                                            color="primary"
                                                            variant="contained" 
                                                            margin="dense"
                                                            size="small"
                                                        >
                                                            Enregistrer
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </div>
                            </React.Fragment>
                        }
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={confirm_modal}
                    onClose={() => this.handleModalClickClose()}
                >
                    <DialogTitle>{"Suppresion: " + survey.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Veux-tu vraiment supprimer ce sondage ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            color="secondary"
                            variant="contained" 
                            margin="dense"
                            size="small"
                            className={classes.btn} 
                            onClick={(e) => this.deleteSurvey(survey.id)}
                        >
                            Supprimer
                        </Button>    
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

}

const styles = theme => ({
    loader: {
        marginTop: 200,
    },
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: "1.5px solid #B22132",
    },
    rootTable : {
        width: '100%',
        overflowX: 'auto'
    },
    btn : {
        margin: 5,
    },
    subTitle: {
		marginTop: 30,
		marginBottom: 10,
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
    input_file:{
        display: 'None',
    },
    upload_button : {
        marginTop: 15
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 150,
        backgroundSize: 'contain',
    },
    add_item : {
        marginLeft: 10,
    },
    root_items: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    modal:{
        overflowY: 'scroll'
    },
    modal_title: {
        margin: 15
    },
    vote_typo : {
        marginTop: 10,
        marginBottom: 10,
    }
});

export default withStyles (styles) (PollsManagement)