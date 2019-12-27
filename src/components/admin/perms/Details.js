import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ajaxGet } from '../../../utils/Ajax';

function afficheNote(creneau, notation){

    let note;
    switch (creneau.creneau) {
        case "M":
            note = notation.mean_m;
            break;
        case "S":
            note = notation.mean_s;
            break;
        case "D":
            note = notation.mean_d;
            break;
    }

    if (note === null || note === 0)
        return "grey";
    if (note < 2 )
        return "red";
    if (note < 3)
        return "orange";
    if (note < 4){
        return "lgreen";       
    }

    return "green";
}

class Details extends Component{
    constructor(props) {
        super(props)

        this.state = {
            notation : [],
            creneau : [],
            loading: true
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const id = query.get('id');
        ajaxGet('perms/notation/'+id).then(res => {
            this.setState({notation: res.data, creneau: res.data.creneau, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }

    

    render(){

        const { classes } = this.props;
        const { notation, creneau, loading } = this.state;

        if(loading){
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

        return(
            <div className={classes.container}>
                <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Notation perm {notation.nom}
                </Typography>

               <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
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
                                <TableRow>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {notation.note_orga === 0 && <span className={classes.dot}></span>}
                                        {notation.note_orga < 2 && notation.note_orga > 0 &&<span className={classes.dot_red}></span>}
                                        {notation.note_orga < 3 && notation.note_orga >= 2 &&<span className={classes.dot_orange}></span>}
                                        {notation.note_orga < 4 && notation.note_orga >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {notation.note_orga >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {notation.note_deco === 0 && <span className={classes.dot}></span>}
                                        {notation.note_deco < 2 && notation.note_deco > 0 &&<span className={classes.dot_red}></span>}
                                        {notation.note_deco < 3 && notation.note_deco >= 2 &&<span className={classes.dot_orange}></span>}
                                        {notation.note_deco < 4 && notation.note_deco >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {notation.note_deco >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {notation.note_menu === 0 && <span className={classes.dot}></span>}
                                        {notation.note_menu < 2 && notation.note_menu > 0 &&<span className={classes.dot_red}></span>}
                                        {notation.note_menu < 3 && notation.note_menu >= 2 &&<span className={classes.dot_orange}></span>}
                                        {notation.note_menu < 4 && notation.note_menu >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {notation.note_menu >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {notation.note_anim === 0 && <span className={classes.dot}></span>}
                                        {notation.note_anim < 2 && notation.note_anim > 0 &&<span className={classes.dot_red}></span>}
                                        {notation.note_anim < 3 && notation.note_anim >= 2 &&<span className={classes.dot_orange}></span>}
                                        {notation.note_anim < 4 && notation.note_anim >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {notation.note_anim >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </Paper>



                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cellLeft}>
                                    Créneau
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Avis général
                                </TableCell>
                                <TableCell className={classes.cellLeft}>
                                    Commentaire
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {creneau.map((cren, index) => (
                                <TableRow>
                                    <TableCell component="th" scope="row" className={classes.cellLeft}>
                                        {cren.creneau === "D" && <span>Midi</span>}
                                        {cren.creneau === "S" && <span>Soir</span>}
                                        {cren.creneau === "M" && <span>Matin</span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {(() => {
                                            switch(afficheNote(cren, notation)) {
                                                case "grey" :
                                                    return <span className={classes.dot}></span>
                                                case "red" :
                                                    return <span className={classes.dot_red}></span>
                                                case "orange" :
                                                    return <span className={classes.dot_orange}></span>
                                                case "lgreen" :
                                                    return <span className={classes.dot_lgreen}></span>
                                                case "green" :
                                                    return <span className={classes.dot_green}></span>
                                            }
                                        })()}
                                    </TableCell>
                                    <TableCell>
                                    {cren.notation.map((row, index) => (
                                        <div>
                                            {row.commentaire}
                                        </div>
                                    ))}
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
        overflowX: 'auto',
        marginBottom: 20,
    },
    cell : {
        textAlign : 'center'
    },
    cellLeft : {
        textAlign : 'left'
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

export default withStyles (styles) (Details)