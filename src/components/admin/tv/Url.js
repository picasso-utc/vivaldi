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
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../../../utils/Ajax';

class Url extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            links : [],
            link : {
                name: '',
                url: '',
            },
            mode: 'create',
            open_modal: false,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.loadLinks();
    }


    handleChange(event){
        this.setState({
            link: {
                ...this.state.link,
                [event.target.name]: event.target.value
            }
        })
    }

    handleModalClickOpen = () => {
        this.setState({open_modal: true})
    }

    handleModalClickClose = () => {
        this.setState({open_modal: false})
        this.loadLinks();
        this.reloadNewLink();
    };


    selectLink = (event, link) => {
        this.setState({link: link, mode: 'edit'})
        this.handleModalClickOpen();
    }

    loadLinks(){
        ajaxGet('tv/links/').then(res => {
            this.setState({links: res.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    reloadNewLink(){
        this.setState({link: {
            name: '',
            url: '',     
        }, mode: 'create'})
    }


    saveLink(){
        const link = this.state.link
        if(this.state.mode == "create"){
            ajaxPost('tv/links/', link).then((res) => {  
                this.setState({
                    link: {
                        ...this.state.link,
                        id: res.data.id
                    },
                    mode: "edit",
                })
            })
            .catch((error) => {
                console.log(error);
            })  
        } else if (this.state.mode == "edit"){
            ajaxPut('tv/links/' + link.id + '/', link).then((res) => {
            })
            .catch((error) => {
                console.log(error);
            }) 
        }
    }


    deleteLink(index){
        const link_id = this.state.links[index].id
        ajaxDelete('tv/links/' + link_id + '/').then(() => {
            let links = this.state.links;
            links = links.filter(l => l.id !== link_id)
            this.setState({links: links})
        })
        .catch((error) => {

        })
    }

        

    render(){
        
        const { classes } = this.props;

        const {links, link, mode, open_modal} = this.state;


        return (
            <div className={classes.container}>
                <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Liste des URLs
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
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    Nom
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    URL
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {links.map((row, index) => (
                                <TableRow hover key={index} className={classes.row}>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.url}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        <Button 
                                            color="primary"
                                            variant="contained" 
                                            margin="dense"
                                            size="small"
                                            className={classes.btn} 
                                            onClick={(e) => this.selectLink(e, row)}
                                        >
                                            Consulter
                                        </Button>
                                        <Button 
                                            color="secondary"
                                            variant="contained" 
                                            margin="dense"
                                            size="small"
                                            className={classes.btn} 
                                            onClick={(e) => this.deleteLink(index)}
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
                            <span>Lien : {link.name}</span>
                        ):
                        (
                            <span>Ajouter un nouveau lien</span>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container direction="row">
                            <TextField
                                label="Nom"
                                className={classes.textField}
                                value={link.name}
                                onChange={this.handleChange}
                                name="name"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                label="URL"
                                className={classes.textField}
                                value={link.url}
                                onChange={this.handleChange}
                                name="url"
                                fullWidth
                                margin="dense"
                                variant="outlined"
                            />   
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Button 
                                onClick={() => this.saveLink()} 
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

export default withStyles (styles) (Url)