import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {CircularProgress, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {ajaxGet, ajaxPost} from "../utils/Ajax";

class Shotgun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nb: this.props.location.pathname.split('/')[2],
            loading: true,
            login: '',
            shotgun: false,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount() {
        ajaxGet('shotgun/creneau/'+this.state.nb).then((res) => {
            this.setState({loading: false})
        })
        if(this.getCookie('SHOTGUN_'+this.state.nb)) {
            console.log('already')
            this.setState({shotgun: true})
            console.log(this.state.shotgun)
            console.log('cc')
        }
    }

    makeshotgun(){
        this.setState({loading:true})
        ajaxPost('shotgun/persons/',{login: this.state.login, id_creneau: this.state.nb, email: null}).then((res) =>{
            document.cookie = 'SHOTGUN_'+this.state.nb+'=True'
            this.setState({loading:false})
        })

    }

    handleChange(e){
        this.setState({login:e.target.value})
    }


    renderShutgun(classes){
        return(
            <Grid container direction="row" className={classes.font}
                  direction="column"
                  alignItems="center"
                  justify="center">
                <Typography variant="h1" className={classes.title}>
                    Shotgun
                </Typography>

                <TextField value={this.state.login} onChange={this.handleChange} label="Ton login" variant="outlined" className={classes.textField} />
                <Button variant="contained" className={classes.button} onClick={() => this.makeshotgun()}>SHOTGUN!</Button>
            </Grid>
        )
    }

    renderToSoon(classes){
        return(
            <Grid container direction="row" className={classes.font}
                  direction="column"
                  alignItems="center"
                  justify="center">
                <Typography variant="h1" className={classes.title}>
                    Trop tot moussaillon
                </Typography>
            </Grid>
            )

    }

    renderAlreadySotgun(classes){
        return(
            <Grid container direction="row" className={classes.font}
                  direction="column"
                  alignItems="center"
                  justify="center">
                <Typography variant="h6" className={classes.title}>
                    Ton shotgun a été pris en compte! Tu recevras une confirmation par mail bientot :)
                </Typography>
            </Grid>
        )

    }

    render() {
        const { classes} = this.props;
        if(this.state.loading){
            return(
                <Grid container direction="row" className={classes.font}
                      direction="column"
                      alignItems="center"
                      justify="center">
                    <CircularProgress />
                </Grid>
            )
        }
        else{
            if(this.state.shotgun){
                console.log('déjà')
                return this.renderAlreadySotgun(classes)
            }else{
                return this.renderShutgun(classes)
            }
        }

    }
}

const styles = theme => ({
    font:{
        height: '100vh',
        backgroundColor: '#F9BF38',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    title:{
      fontfamily: 'roboto',
        marginBottom: '20px',
    },
    textField:{
        backgroundColor: '#FFFFFF',
        marginBottom: '20px'
    },
})
export default withStyles(styles)(Shotgun)
