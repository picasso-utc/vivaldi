import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import CardMedia from '@material-ui/core/CardMedia';
import {URL} from '../../../utils/Config';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { ajaxGet, ajaxPost, ajaxPatch, ajaxDelete } from '../../../utils/Ajax';

class Media extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            medias : [],
            media : {
                name: '',
                media_type: 'I',
                media: '',
                activate: false,
                times: 1,
            },
            users : [],
            new_user : {
                login: '',
                right: 'M'
            },
            mode : 'create',
            file_loading: false,
            open_modal : false,
            confirm_modal: false,
            loading: true,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.loadMedias();
    }


    loadMedias(){
        ajaxGet('tv/media/').then(res => {
            this.setState({medias: res.data, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }

    reloadNewMedia = () => {
        this.setState({media: {
            name: '',
            media_type: 'I',
            media: '',
            activate: false,
            times: 1,      
        }, mode: 'create'})
    }


    selectMedia = (event, media) => {
        if(media.media){
            media.media = URL + '/media/' + media.media;
        }
        this.setState({media: media, mode: 'edit'})
        this.handleModalClickOpen();
    }

    
    handleChange(event){
        this.setState({
            media: {
                ...this.state.media,
                [event.target.name]: event.target.value
            }
        })
    };


    handleFileChange(e) {
        this.setState({file_loading: true})
        const file = e.target.files[0];
        let media_type = ""
        if (file.type.includes('video')) {
            media_type = "V";
        } else if (file.type.includes('image')){
            media_type = "I";
        } else {
            // Only accept video and image files
            return;
        }
        const reader = new FileReader();
        let media = null;
        reader.readAsDataURL(file);   
        reader.onloadend = () => {
            media = reader.result;
            this.setState({
                media: {
                    ...this.state.media,
                    media: media,
                    media_type: media_type,
                    new_media: file,
                },
                file_loading: false
            })
        }
    }


    handleModalClickOpen = () => {
        this.setState({open_modal: true})
    }

    handleConfirmModalOpen(media){
        this.setState({media: media, confirm_modal: true})
    }

    handleModalClickClose = () => {
        this.setState({open_modal: false, confirm_modal: false})
        this.loadMedias();
        this.reloadNewMedia();
    };

    
    changeMediaActivation(event, media_index){
        let medias = this.state.medias;
        medias[media_index].activate = !medias[media_index].activate;
        ajaxPatch('tv/media/' + medias[media_index].id + '/', {activate: medias[media_index].activate}).then((res) => {
            this.setState({medias: medias})
        })
    }
    


    saveMedia(media){
        const ajax_media = {
            name: media.name,
            times: media.times,
            media_type: media.media_type
        }
        if(this.state.mode === "create"){
            ajax_media.media = null;
            ajaxPost('tv/media/', ajax_media).then((res) => {  
                this.setState({
                    media: {
                        ...this.state.media,
                        id: res.data.id
                    },
                    mode: "edit",
                })
                this.fileUpload(media.new_media, res.data.id)
            })
            .catch((error) => {
                console.log(error);
            })  
        } else if (this.state.mode === "edit"){
            ajaxPatch('tv/media/' + media.id + '/', ajax_media).then((res) => {
                if (media.new_media) {
                    this.fileUpload(media.new_media, res.data.id)
                } else {
                    this.handleModalClickClose();
                }
            })
            .catch((error) => {
                console.log(error);
            }) 
        }
    }

    fileUpload = async (file, id) => {
        const fd = new FormData();
        fd.append('media', file);
        ajaxPatch('tv/media/' + id + '/', fd).then(() => {
            this.handleModalClickClose();
        })
        .catch(errors => {
        });
    };


    deleteMedia(media_id){
        ajaxDelete('tv/media/' + media_id + '/').then(() => {
            let medias = this.state.medias;
            medias = medias.filter(m => m.id !== media_id)
            this.setState({medias: medias, confirm_modal: false})
        })
        .catch((error) => {

        })
    }

        

    render(){
        
        const { classes } = this.props;

        const {medias, open_modal, media, mode, file_loading, confirm_modal, loading} = this.state;


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
                        <CircularProgress/>
                    </Grid>
                </Grid>
            )
        }

        return (
            <div className="admin_container">
                <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Médias
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
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.cell}>
                                        Nom
                                    </TableCell>
                                    <TableCell className={classes.cell}>
                                        Activé ?
                                    </TableCell>
                                    <TableCell className={classes.cell}>
                                        Répétition
                                    </TableCell>
                                    <TableCell className={classes.cell}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medias.map((row, index) => (
                                    <TableRow hover key={index} className={classes.row}>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            {row.activate? (
                                                <CheckIcon/>
                                            ):(
                                                <CloseIcon/>
                                            )}
                                        </TableCell>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            <span>
                                                {row.times}
                                                {row.media_type === "I" && 
                                                    "s"
                                                }
                                                {row.media_type === "V" && 
                                                    " fois"
                                                }
                                            </span>
                                        </TableCell>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            
                                            <Button 
                                                color="primary"
                                                variant="contained" 
                                                margin="dense"
                                                size="small"
                                                className={classes.btn} 
                                                onClick={(e) => this.selectMedia(e, row)}
                                            >
                                                Consulter
                                            </Button>
                                            {row.activate ? (
                                                <Button 
                                                    color="secondary"
                                                    variant="contained" 
                                                    margin="dense"
                                                    size="small"
                                                    className={classes.btn} 
                                                    onClick={(e) => this.changeMediaActivation(e, index)}
                                                >
                                                    Désactiver
                                                </Button>
                                            ):(
                                                <Button 
                                                    size="small" 
                                                    color="primary"
                                                    variant="contained" 
                                                    margin="dense"
                                                    className={classes.btn} 
                                                    onClick={(e) => this.changeMediaActivation(e, index)}
                                                >
                                                    Activer
                                                </Button>
                                            )}
                                            <Button 
                                                color="secondary"
                                                variant="contained" 
                                                margin="dense"
                                                size="small"
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
                </Grid>
                <Dialog 
                    onClose={this.handleModalClickClose} 
                    open={open_modal} 
                    maxWidth="lg"
                    width="lg"
                    scroll="body"
                >
                    <DialogTitle onClose={this.handleModalClickClose}>
                        {mode === "edit"? (
                            <span>Média : {media.name}</span>
                        ):
                        (
                            <span>Ajouter un nouveau média</span>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <Grid 
                            container 
                            className={classes.loader}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            {file_loading?(
                                <Grid item>
                                    <CircularProgress className={classes.progress} />
                                </Grid>
                            ):(
                                <React.Fragment>
                                    {media.media_type === "I" && 
                                        <CardMedia
                                            className={classes.media}
                                            image={media.media ? media.media : '/images/default_image.png'}
                                        />
                                    }
                                    {media.media_type === "V" && 
                                        <CardMedia
                                            component="video"
                                            className={classes.media}
                                            src={media.media}
                                        />
                                    }
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <input
                                            accept="image/*;video/*"
                                            className={classes.input_file}
                                            id="contained-button-file"
                                            type="file"
                                            onChange={(event) => this.handleFileChange(event)}
                                            name="media"
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button 
                                                variant="contained" 
                                                component="span" 
                                                className={classes.upload_button}
                                                name="media"
                                            >
                                                Média
                                            </Button>
                                        </label>
                                    </Grid>
                                </React.Fragment>
                            )}
                        </Grid>
                        <Grid container direction="row">
                            <TextField
                                label="Nom"
                                className={classes.textField}
                                value={media.name}
                                onChange={this.handleChange}
                                name="name"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                label="Répétition"
                                className={classes.textField}
                                value={media.times}
                                onChange={this.handleChange}
                                name="times"
                                type="number"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                            />   
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Button 
                                onClick={() => this.saveMedia(media)} 
                                variant="contained" 
                                color="primary"
                                margin="dense"
                                size="small"
                            >
                                Enregistrer
                            </Button>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={confirm_modal}
                    onClose={() => this.handleModalClickClose()}
                >
                    <DialogTitle id="alert-dialog-title">{"Suppresion: " + media.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Veux-tu vraiment supprimer cette URL ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            color="secondary"
                            variant="contained" 
                            margin="dense"
                            size="small"
                            className={classes.btn} 
                            onClick={(e) => this.deleteMedia(media.id)}
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
    rootTable : {
        width: '100%',
        overflowX: 'auto'
    },
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: "1.5px solid #B22132",
    },
    media: {
        height: 150,
        backgroundSize: 'contain',
    },
    input_file:{
        display: 'None',
    },
    upload_button : {
        marginTop: 15
    },
    subTitle: {
        marginBottom: 40,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    add_item : {
        marginLeft: 10,
    },
    btn : {
        margin: 5,
    },
});

export default withStyles (styles) (Media)