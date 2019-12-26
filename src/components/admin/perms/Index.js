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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Details from './Details';
import { ajaxGet } from '../../../utils/Ajax';

class Index extends Component{
    constructor(props) {
        super(props)

        this.state = {
            notations : []
        }
        this.consultNotation = this.consultNotation.bind(this)

    }

    componentDidMount(){
        ajaxGet('perms/notation/all').then(res => {
            this.setState({notations: res.data.perms})
            console.log(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    consultNotation(notation_id){
        console.log(notation_id)
        window.open('details?id='+notation_id,'Data','height=250,width=250');
    }

    render(){


        
        const { classes } = this.props;

        const {notations} = this.state;
        console.log(notations)


        return (
            <div className={classes.container}>
                <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Notation des perms
                </Typography>
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    Perm
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Organisation
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Décoration
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Menu
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Ambiance
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notations.map((row, index) => (
                                <TableRow hover key={index} className={classes.row} onClick={(event) => this.consultNotation(row.id)}>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.nom} - {row.nom_resp}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.note_orga == 0 && <span className={classes.dot}></span>}
                                        {row.note_orga < 2 && row.note_orga > 0 &&<span className={classes.dot_red}></span>}
                                        {row.note_orga < 3 && row.note_orga >= 2 &&<span className={classes.dot_orange}></span>}
                                        {row.note_orga < 4 && row.note_orga >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {row.note_orga >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.note_deco == 0 && <span className={classes.dot}></span>}
                                        {row.note_deco < 2 && row.note_deco > 0 &&<span className={classes.dot_red}></span>}
                                        {row.note_deco < 3 && row.note_deco >= 2 &&<span className={classes.dot_orange}></span>}
                                        {row.note_deco < 4 && row.note_deco >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {row.note_deco >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.note_menu == 0 && <span className={classes.dot}></span>}
                                        {row.note_menu < 2 && row.note_menu > 0 &&<span className={classes.dot_red}></span>}
                                        {row.note_menu < 3 && row.note_menu >= 2 &&<span className={classes.dot_orange}></span>}
                                        {row.note_menu < 4 && row.note_menu >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {row.note_menu >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.note_anim == 0 && <span className={classes.dot}></span>}
                                        {row.note_anim < 2 && row.note_anim > 0 &&<span className={classes.dot_red}></span>}
                                        {row.note_anim < 3 && row.note_anim >= 2 &&<span className={classes.dot_orange}></span>}
                                        {row.note_anim < 4 && row.note_anim >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {row.note_anim >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
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

    dot : {
      height: "25px",
      width: "25px",
      backgroundColor: "#bbb",
      borderRadius: "50%",
      display: "inline-block"
    },
    dot_red : {
      height: "25px",
      width: "25px",
      backgroundColor: "#E34242",
      borderRadius: "50%",
      display: "inline-block"
    },
    dot_orange : {
      height: "25px",
      width: "25px",
      backgroundColor: "#F4B528",
      borderRadius: "50%",
      display: "inline-block"
    },
    dot_lgreen : {
      height: "25px",
      width: "25px",
      backgroundColor: "#56BA2A",
      borderRadius: "50%",
      display: "inline-block"
    },
    dot_green : {
      height: "25px",
      width: "25px",
      backgroundColor: "#285507",
      borderRadius: "50%",
      display: "inline-block"
    }
});

export default withStyles (styles) (Index)