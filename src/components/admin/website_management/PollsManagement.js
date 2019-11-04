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
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GridListTileBar from '@material-ui/core/GridListTileBar';



import { ajaxGet, ajaxPost, ajaxDelete, ajaxPut, ajaxPatch } from '../../../utils/Ajax';

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
                surveyitem_set: []
            },
            mode: 'create'
        }

        this.handleModalClickClose = this.handleModalClickClose.bind(this);
        this.selectSurvey = this.selectSurvey.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSurveyItemChange = this.handleSurveyItemChange.bind(this);
        this.addSurveyItem = this.addSurveyItem.bind(this);
    }


    componentDidMount(){
        this.loadSurveys()
    }


    loadSurveys(){
        ajaxGet('surveys').then(res => {
            this.setState({surveys: res.data, loading: false});
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
        }, mode: 'create'})
    }


    handleSurveyItemChange(event, index){

        if (event.target.name == "name" && event.target.value > 20) {
            return;
        }

        const { name, value } = event.target;
        let surveyitem_set = [...this.state.survey.surveyitem_set];
        surveyitem_set[index][name] = value;
        this.setState({survey:{...this.state.survey, surveyitem_set}});
    }


    handleChange(event){
        if (event.target.name == "title" && event.target.value.length > 20) {
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
        this.setState({open_modal: false, loading: true})
        this.loadSurveys();
        this.reloadNewSurvey();
    };


    handleModalClickOpen = () => {
        this.setState({open_modal: true})
    }


    selectSurvey = (survey) => {
        var request = new XMLHttpRequest();
        let image = null;
        const that = this
        request.open('GET', survey.image, true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload =  function(e){
                survey.image = reader.result;
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
        if(this.state.mode == "create"){
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
        } else if (this.state.mode == "edit"){
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

    updateSurvey(index){
        ajaxPut('surveys/' + this.state.surveys[index].id + '/', this.state.surveys[index]).then((res) => {

        })
        .catch((error) => {
            console.log(error);
        })  
    }


    saveSurveyItem(index){
        let surveyitem_set = [...this.state.survey.surveyitem_set];
        if (surveyitem_set[index].id) {
            // Check si l'image commence par http
            if (surveyitem_set[index].image.startsWith('http')) {
                let request = new XMLHttpRequest();
                const that = this
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


    deleteSurvey(index){
        const survey_id = this.state.surveys[index].id
        ajaxDelete('surveys/' + survey_id + '/').then(() => {
            let surveys = this.state.surveys;
            surveys = surveys.filter(s => s.id !== survey_id)
            this.setState({surveys: surveys})
        })
        .catch((error) => {

        })
        this.reloadNewSurvey();
    }

    render(){
        
        const { classes } = this.props;
        const { surveys, loading, open_modal, survey, mode } = this.state;

        if (loading) {
            return (
                <Grid 
                    container 
                    className={classes.loader}
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
            <div className={classes.container}>
                          
                {surveys.length == 0 ? (
                    <React.Fragment>
                        <Grid 
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Typography variant="h5" className={classes.subTitle}>
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
                        <Typography variant="h5" noWrap className={classes.subTitle}>
                            <ChevronRightIcon className={classes.subTitleIcon}/>
                            Liste des sondages
                            <Button 
                                variant="contained"
                                margin="dense" 
                                size="small" 
                                className={classes.add_item} 
                                color="primary"
                                onClick={(e) => this.handleModalClickOpen()}
                            >
                                Nouveau
                            </Button>
                        </Typography>
                        <Grid container direction="row">
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
                                                        color="primary"
                                                        onClick={(e) => this.changeSurveyVisibility(survey_index)}
                                                    >
                                                        {survey.visible ? (<span>Masquer</span>):(<span>Rendre visible</span>)}
                                                    </Button>
                                                    <Button 
                                                        size="small" 
                                                        color="secondary"
                                                        variant="contained" 
                                                        margin="dense"
                                                        size="small"
                                                        className={classes.btn} 
                                                        onClick={() => this.deleteSurvey(survey_index)}
                                                    >
                                                        Supprimer
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                        </Grid>
                    </div>
                )}
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
    btn : {
        margin: 5,
    },
    subTitle:{
        marginBottom: 40,
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
    }
});

export default withStyles (styles) (PollsManagement)