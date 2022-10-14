import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ajaxDelete, ajaxGet, ajaxPost, ajaxPatch } from '../../../utils/Ajax';
import { ListItem, ListItemText, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import { format } from 'date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CardMedia from '@material-ui/core/CardMedia';

class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsletter: [],
            loading: true,
            edit: false,
            newNews: {
                title: '',
                datePublication: '',
                content: '',
                image: null,
            },
            editContent: {
                title: '',
                author: '',
                dateCreation: new Date(),
                datePub: this.formatDate(new Date()),
                id: 0,
                content: '',
                image: null,
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveNews = this.saveNews.bind(this);
        this.deleteNews = this.deleteNews.bind(this);
        this.editNews = this.editNews.bind(this);
        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.updateNews = this.updateNews.bind(this);
        this.handleFileChangeNew = this.handleFileChangeNew.bind(this);
        this.handleFileChangeEdit = this.handleFileChangeEdit.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    componentDidMount() {
        this.loadNewsletter();
    }

    deleteNews(id) {
        ajaxDelete('newsletter/?id=' + id).then((res) => {
            this.loadNewsletter();
        });
    }

    loadNewsletter() {
        ajaxGet('newsletter').then((res) => {
            let news = res.data;
            for (let i = 0; i < news.length; i++) {
                news[i].publication_date = new Date(news[i].publication_date);
                news[i].creation_date = new Date(news[i].creation_date);
            }
            news = news.sort(function (a, b) {
                if (a.publication_date < b.publication_date) {
                    return 1;
                }
                return -1;
            });
            this.setState({ newsletter: news });
            this.setState({ loading: false });
        });
    }

    saveNews() {
        ajaxPost('newsletter/', {
            title: this.state.newNews.title,
            publication_date: new Date(this.state.newNews.datePublication),
            content: this.state.newNews.content,
            author_id: localStorage.getItem('login'),
            image: null,
        }).then((res) => {
            this.fileUpload(this.state.newNews.new_image, res.data.id);
            this.setState({
                newNews: {
                    title: '',
                    datePublication: '',
                    content: '',
                    image: null,
                    new_image: null,
                },
            });

            this.loadNewsletter();
        });
    }

    handleChange(event) {
        this.setState({
            newNews: {
                ...this.state.newNews,
                [event.target.name]: event.target.value,
            },
        });
    }

    handleFileChangeNew(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        let media = null;
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            media = reader.result;
            this.setState({
                newNews: {
                    ...this.state.newNews,
                    image: media,
                    new_image: file,
                },
            });
        };
    }

    handleFileChangeEdit(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        let media = null;
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            media = reader.result;
            this.setState({
                editContent: {
                    ...this.state.editContent,
                    image: media,
                    new_image: file,
                },
            });
        };
    }

    async fileUpload(file, id) {
        const fd = new FormData();
        fd.append('image', file);
        ajaxPatch('newsletter/' + id + '/', fd)
            .then(() => {
                this.handleModalClickClose();
            })
            .catch((errors) => {});
    }

    handleChangeEdit(event) {
        this.setState({
            editContent: {
                ...this.state.editContent,
                [event.target.name]: event.target.value,
            },
        });
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hour = date.getHours();
        const min = date.getMinutes();
        return year + '-' + month + '-' + day + 'T' + hour + ':' + min;
    }

    editNews(index) {
        this.loadNewsletter();
        this.setState({ edit: true });
        let tempPub = new Date(this.state.newsletter[index].publication_date);
        let tempCrea = new Date(this.state.newsletter[index].creation_date);
        this.setState({
            editContent: {
                title: this.state.newsletter[index].title,
                author: this.state.newsletter[index].author_id,
                dateCreation: this.formatDate(tempCrea),
                datePub: this.formatDate(tempPub),
                id: this.state.newsletter[index].id,
                content: this.state.newsletter[index].content,
                image: this.state.newsletter[index].image,
                new_image: this.state.newsletter[index].image,
            },
        });
    }

    updateNews(id) {
        ajaxPost('newsletter/?id=' + id, {
            title: this.state.editContent.title,
            publication_date: new Date(this.state.editContent.datePub),
            content: this.state.editContent.content,
        }).then(() => {
            this.fileUpload(this.state.editContent.new_image, id);
            this.handleModalClickClose();
            this.loadNewsletter();
        });
    }

    handleModalClickClose() {
        this.setState({ edit: false });
    }

    render() {
        const { classes } = this.props;

        const { newsletter, loading, newNews, edit, editContent } = this.state;

        if (loading) {
            return (
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <CircularProgress className={classes.progress} />
                    </Grid>
                </Grid>
            );
        }

        return (
            <div className="admin_container">
                <Grid container direction="row">
                    <Typography variant="h6">
                        <ChevronRightIcon />
                        Ajouter une newsletter
                    </Typography>
                    <Paper className={classes.paper_box}>
                        <Table>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    <TextField
                                        label="Titre"
                                        className={classes.textField}
                                        name="title"
                                        value={newNews.title}
                                        onChange={this.handleChange}
                                        autoComplete="off"
                                        margin="dense"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        InputProps={{ style: { fontSize: 12 } }}
                                    />
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    <TextField
                                        id="datetime-local"
                                        label="Date de publication"
                                        type="datetime-local"
                                        name="datePublication"
                                        value={newNews.datePublication}
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    <TextField
                                        label="Content"
                                        className={classes.textField}
                                        name="content"
                                        value={newNews.content}
                                        onChange={this.handleChange}
                                        autoComplete="off"
                                        margin="dense"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        InputProps={{ style: { fontSize: 12 } }}
                                    />
                                </TableCell>
                                {this.state.newNews.image !== null ? (
                                    <TableCell className={classes.cell}>
                                        <img
                                            src={this.state.newNews.image}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        />
                                    </TableCell>
                                ) : (
                                    <></>
                                )}
                                <TableCell className={classes.cell}>
                                    <input
                                        accept="image/*;"
                                        style={{ display: 'none' }}
                                        id="contained-button-file-new"
                                        type="file"
                                        name="newImage"
                                        onChange={this.handleFileChangeNew}
                                    />
                                    <label htmlFor="contained-button-file-new">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            className={styles.upload_button}
                                            name="media"
                                            color="secondary"
                                        >
                                            Photo
                                        </Button>
                                    </label>
                                </TableCell>
                            </TableRow>
                        </Table>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={this.saveNews}
                                className={classes.btnAddNews}
                            >
                                Ajouter
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid container direction="row">
                    <Typography variant="h6" className={classes.subTitle}>
                        <ChevronRightIcon className={classes.titleIcon} />
                        Liste des newsletter
                    </Typography>
                    <Paper className={classes.paper_box}>
                        <List className={classes.listPerms}>
                            {newsletter.map((element, index) => {
                                let pub = format(element.publication_date, 'MMMM do, yyyy H:mma');
                                return (
                                    <React.Fragment key={index}>
                                        <ListItem
                                            className={classes.suggestionItem}
                                            component="div"
                                        >
                                            <ListItemText
                                                primary={
                                                    element.title +
                                                    ' - écrit par ' +
                                                    element.author_id
                                                }
                                                secondary={'Publication : ' + pub + ' '}
                                            />
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={() => this.editNews(index)}
                                                className={classes.btnAddNews}
                                            >
                                                Editer
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                className={classes.btnAddNews}
                                                color="secondary"
                                                onClick={() => this.deleteNews(element.id)}
                                            >
                                                Supprimer
                                            </Button>
                                        </ListItem>
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </Paper>
                </Grid>
                <Dialog open={edit} onClose={() => this.handleModalClickClose()}>
                    <DialogTitle>
                        {'Crée le: ' + editContent.dateCreation + ' par ' + editContent.author}
                    </DialogTitle>
                    <DialogContent>
                        <Table>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    <TextField
                                        label="Titre"
                                        className={classes.textField}
                                        value={editContent.title}
                                        onChange={this.handleChangeEdit}
                                        name="title"
                                        fullWidth
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    <TextField
                                        id="datetime-local"
                                        label="Date de publication"
                                        type="datetime-local"
                                        name="datePub"
                                        value={editContent.datePub}
                                        className={classes.textField}
                                        onChange={this.handleChangeEdit}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    <TextField
                                        label="Content"
                                        className={classes.textField}
                                        value={editContent.content}
                                        onChange={this.handleChangeEdit}
                                        name="content"
                                        fullWidth
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </TableCell>
                                {this.state.editContent.image !== null ? (
                                    <TableCell className={classes.cell}>
                                        <CardMedia
                                            className={classes.media}
                                            image={
                                                editContent.image
                                                    ? 'kraken.picasso-utc.fr' + editContent.image
                                                    : ''
                                            }
                                            style={{ width: '100%' }}
                                        />
                                    </TableCell>
                                ) : (
                                    <></>
                                )}
                                <TableCell className={classes.cell}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="contained-button-file-edit"
                                        type="file"
                                        name="editImage"
                                        onChange={this.handleFileChangeEdit}
                                    />
                                    <label htmlFor="contained-button-file-edit">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            className={styles.upload_button}
                                            name="media"
                                            color="secondary"
                                        >
                                            Photo
                                        </Button>
                                    </label>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="secondary"
                            variant="contained"
                            margin="dense"
                            size="small"
                            className={classes.btn}
                            onClick={(e) => this.updateNews(editContent.id)}
                        >
                            Sauvegarder
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const styles = (theme) => ({
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: '1.5px solid #B22132',
    },
    paper_box: {
        width: '100%',
        overflowX: 'auto',
        marginBottom: 20,
    },
    listPerms: {
        width: '100%',
        height: 300,
        overflowY: 'scroll',
    },
    suggestionItem: {
        paddingLeft: 15,
        paddingBottom: 0,
        paddingTop: 0,
        fontSize: 14,
        minHeight: 30,
    },
    textField: {
        width: '100%',
        fontSize: 12,
    },
    textFieldContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    container_createNews: {
        justifyContent: 'space-around',
    },
    btnAddNews: {
        marginTop: 10,
        marginBottom: 20,
        marginRight: 5,
        marginLeft: 5,
    },
    markdownEdit: {
        marginTop: 10,
        width: '100%',
    },
    cell: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    media: {
        height: 150,
        backgroundSize: 'contain',
    },
});

export default withStyles(styles)(Newsletter);
