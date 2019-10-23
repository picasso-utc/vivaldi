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
import GridListTileBar from '@material-ui/core/GridListTileBar';



import { ajaxGet, ajaxPost, ajaxDelete, ajaxPut } from '../../../utils/Ajax';

class PollsManagement extends Component{
 
    
    constructor(props) {
        super(props)
        this.state = {
            surveys: [],
            loading: true,
            open_modal: true,
            survey : {
                title: '',
                description: '',
                image: '',
                items: [
                    {
                        title: 'Test1',
                        description: 'Test1.1',
                        image: null
                    },
                    {
                        title: 'Test2',
                        description: 'Test1.1',
                        image: null
                    },
                    {
                        title: 'Test3',
                        description: 'Test1.1',
                        image: null
                    },
                    {
                        title: 'Test4',
                        description: 'Test1.1',
                        image: null
                    },
                    {
                        title: 'Test5',
                        description: 'Test1.1',
                        image: null
                    },
                ]
            },
            mode: 'create'
        }

        this.handleModalClickClose = this.handleModalClickClose.bind(this);
        this.selectSurvey = this.selectSurvey.bind(this);
        this.handleChange = this.handleChange.bind(this);

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
            items: [],
        }, mode: 'create'})
    }


    handleChange(event){
        this.setState({
            survey: {
                ...this.state.survey,
                [event.target.name]: event.target.value
            }
        })
    }


    handleModalClickClose = () => {
        this.setState({open_modal: false})
        this.reloadNewSurvey();
    };


    handleModalClickOpen = () => {
        this.setState({open_modal: true})
    }


    selectSurvey = (survey) => {
        this.setState({survey: survey, mode: 'edit'})
        this.handleModalClickOpen();
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
                    <Grid container>
                        <Typography variant="h5" noWrap className={classes.subTitle}>
                            Pas de sondages pour le moment. 
                        </Typography>
                    </Grid>
                ):(
                    <div>
                        <Typography variant="h5" noWrap className={classes.subTitle}>
                            <ChevronRightIcon className={classes.subTitleIcon}/>
                            Liste des sondages
                        </Typography>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <Table size="small">
                                    <TableBody>
                                        {surveys.map((survey, index) => (
                                            <TableRow hover key={index} className={classes.row}>
                                                <TableCell component="th" scope="row" className={classes.cell}>
                                                    {survey.title}
                                                </TableCell>
                                                <TableCell component="th" scope="row" className={classes.cell}>
                                                  <Button 
                                                        variant="outlined" 
                                                        size="small" 
                                                        className={classes.btn} 
                                                        color="primary"
                                                        onClick={(e) => this.selectSurvey(survey)}
                                                    >
                                                        Consulter
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                        <Dialog onClose={this.handleModalClickClose} aria-labelledby="customized-dialog-title" open={open_modal} maxWidth="lg">
                            <DialogTitle onClose={this.handleModalClickClose}>
                                {mode == "edit"? (
                                    <span>Sondage : {survey.title}</span>
                                ):
                                (
                                    <span>Ajouter un nouveau sondage</span>
                                )}
                            </DialogTitle>
                            <DialogContent dividers>
                                <Typography component="h4" className={classes.modal_title}>
                                    Sondage
                                </Typography>
                                <form autoComplete="off">
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
                                    <input
                                        name="image"
                                        type="file"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </form>
                                {/* <br/> */}
                                <Typography component="h4" className={classes.modal_title}>
                                    Items
                                </Typography>
                                <div className={classes.root_items}>
                                    <GridList className={classes.gridList} cols={2.5}>
                                        {survey.items.map((item, index) => (
                                        <GridListTile key={index} style={{height: '100%'}}>
                                            <Card className={classes.card}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image="/images/couverture_a19.png"
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <TextField
                                                            label="Titre"
                                                            className={classes.textField}
                                                            value={item.title}
                                                            // onChange={this.handleChange}
                                                            name="title"
                                                            fullWidth
                                                            margin="dense"
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            label="Description"
                                                            className={classes.textField}
                                                            value={item.description}
                                                            // onChange={this.handleChange}
                                                            name="title"
                                                            fullWidth
                                                            margin="dense"
                                                            variant="outlined"
                                                        />
                                                        <input
                                                            name="image"
                                                            type="file"
                                                            // onChange={this.handleChange}
                                                            required
                                                        />
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button size="small" variant="outlined" color="secondary">
                                                        Supprimer
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </GridListTile>
                                        ))}
                                    </GridList>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleModalClickClose} variant="outlined">
                                    Rendre visible
                                </Button>
                                <Button onClick={this.handleModalClickClose} variant="outlined" color="primary">
                                    Sauvegarder
                                </Button>
                                <Button onClick={this.handleModalClickClose} variant="outlined" color="secondary">
                                    Supprimer
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}

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
    card: {
        maxWidth: 345,
      },
    media: {
        height: 200,
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
    modal_title: {
        margin: 15
    }
});

export default withStyles (styles) (PollsManagement)