import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ajaxGet, ajaxPost, ajaxDelete } from '../../../utils/Ajax';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class CurrentPerm extends Component{
 
    
    constructor(props) {
        super(props)
        this.state = {
            current_creneau : {},
            loading: true,
        }
    }

    componentDidMount(){
        this.loadCurrentPerm();
    }

    loadCurrentPerm(){
        ajaxGet('perms/current/creneau').then(res => {
            this.setState({loading: false, current_creneau: res.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){

        const { current_creneau, loading } = this.state;
        
        const { classes } = this.props;

        if(loading){
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
                {current_creneau.id? (
                    <div>
                        <Typography variant="h5" gutterBottom className={classes.title}>
                            {current_creneau.perm.nom}
                        </Typography>
                        <Grid container>
                            <Grid item>
                                <Typography variant="body1" gutterBottom>
                                    Responsable: {current_creneau.perm.nom_resp} ({current_creneau.perm.mail_resp})<br/>
                                    Date : {current_creneau.date}
                                </Typography> 
                            </Grid>
                        </Grid>
                        <Typography variant="h6" noWrap className={classes.subTitle}>
                            <ChevronRightIcon className={classes.subTitleIcon}/>
                            Articles
                        </Typography>
                    </div>
                ): (
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Pas de perm en cours ...
                    </Typography>
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
        border: "2px solid #B22132",
    },
    title: {
        textAlign: 'center',
    },
    subTitle: {
        marginTop: 10,
        marginBottom: 10,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
});

export default withStyles (styles) (CurrentPerm)