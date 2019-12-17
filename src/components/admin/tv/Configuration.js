import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ajaxGet, ajaxPut } from '../../../utils/Ajax';

class Configuration extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            tvs : [],
            links: [],
            loading: true
        }
    }

    componentDidMount(){
        this.loadTVs();
    }

    loadTVs(){
        ajaxGet('tvs/').then(res => {
            this.setState({tvs: res.data})
            this.loadLinks();
        })
        .catch(error => {
            console.log(error)
        })
    }

    loadLinks(){
        ajaxGet('tv/links/').then(res => {
            this.setState({links: res.data, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }


    handleChangeLink(event, tv_index){
        let tvs = this.state.tvs;
        const links = this.state.links
        const link_index = links.findIndex(l => l.name === event.target.value);
        if (link_index >= 0) {
            tvs[tv_index].link = links[link_index];
            tvs[tv_index].link_id = links[link_index].id;
            this.setState({tvs: tvs});
            ajaxPut('tvs/' + tvs[tv_index].id + '/', tvs[tv_index]).then(res => {
                
            }).catch(error => {
                console.log(error);
            })
        }
        
    }
        

    render(){
        
        const { classes } = this.props;

        const {links, tvs, loading} = this.state;

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
                    Gestion des télés
                </Typography>
                
                {tvs.map((row, index) => (
                    <Paper className={classes.tv_paper} xs={6} key={index}>
                        <Grid container direction="row" key={index}>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.subTitle}>
                                    {row.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    className={classes.textField}
                                    name="link_id"
                                    value={row.link.name || ''}
                                    autoComplete="off"
                                    fullWidth
                                    onChange={(event) => this.handleChangeLink(event, index)}
                                    margin="normal"
                                    
                                >
                                    {links.map(link => (
                                        <MenuItem key={link.id} value={link.name}>
                                            {link.name} ({link.url})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
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
    tv_paper : {
        margin: 20,
        padding: 10,
    }
});

export default withStyles (styles) (Configuration)