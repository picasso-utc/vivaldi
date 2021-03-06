import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ajaxGet, ajaxPost } from '../../../utils/Ajax';

class TeamManagement extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            team : [],
            users: [],
            loading: true,
        }
    }

    componentDidMount(){
        this.loadMembers();
    }


    loadMembers(){
        ajaxGet('core/team').then(res => {
            this.setState({team: res.data.team, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
        ajaxGet('userrights').then(res => {
            const userrights = res.data.filter(u => u.right === "A" || u.right === "M");
            this.setState({users: userrights})
        })
        .catch(error => {
            console.log(error)
        })
    }


    addMember(userright_id){
        ajaxPost('admin/members/', {userright_id: userright_id}).then(res => {
            this.loadMembers();
        })
        .catch(error => {
            console.log(error);
        })
    }


    render(){
        
        const { classes } = this.props;

        const {team, loading, users} = this.state;

        function isUserAlreadyInTeam(user_id){
            const index = team.findIndex(t => t.userright_id === user_id);
            if(index >= 0){
                return true;
            }
            return false;
        }


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
                <Typography variant="h6" className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Liste des membres
                </Typography>
                <Grid container className={classes.note}>
                    Cet onglet permet d'ajouter à la Team tous les membres du Pic. Les personnes ayant des droits sur les systèmes du Pic
                    (anciennes team info, ...) mais ne faisant pas partie de la vraie team du Pic ne doivent donc pas être ajoutés. Cette team
                    a uniquement pour objectif l'attribution des astreintes et la notation des perms. 
                </Grid>
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    Nom
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Notation
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {team.map((row, index) => (
                                <TableRow hover key={index} className={classes.row}>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.userright.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.rated_astreintes} / {row.total_astreintes}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Typography variant="h6" className={classes.subTitle} style={{marginTop: 30}}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Ajouter de nouveaux membres
                </Typography>
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    Nom
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Droit
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row, index) => 
                                !isUserAlreadyInTeam(row.id) && (
                                    <TableRow hover key={index} className={classes.row}>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            {row.right === "A" && <span>Administrateur</span>}
                                            {row.right === "M" && <span>Membre</span>}
                                        </TableCell>
                                        <TableCell component="th" scope="row" className={classes.cell}>
                                            <Button 
                                                color="primary"
                                                variant="contained" 
                                                margin="dense"
                                                size="small"
                                                disabled={isUserAlreadyInTeam(row.id)}
                                                className={classes.btn} 
                                                onClick={() => this.addMember(row.id)}
                                            >
                                                Ajouter
                                            </Button>
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
    note: {
        backgroundColor: 'rgba(0,0,0, 0.05)',
        padding: 10,
        border: 'thin solid grey',
        marginTop: 16,
        marginBottom: 8,
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

export default withStyles (styles) (TeamManagement)