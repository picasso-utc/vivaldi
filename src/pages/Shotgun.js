import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {CircularProgress, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {ajaxGet, ajaxPost} from "../utils/Ajax";
import * as qs from "query-string";

const messages = {
    "max":"Le shotgun est déjà complet 😭",
    "login":"Le login fourni n'est pas reconnu 😭",
    "time":"Le shotgun n'a pas commencé / est fini ⏰",
    "succes":"Ton shotgun a bien été pris en compte! ☑️ Nous reviendrons vers toi par mail pour te confirmer ta participation️",
    "others":"Une erreur interne est arrivé, vérifiez votre lien ou envoyez un message au pic 🚨",
    "notFound":"Le shotgun semble ne pas éxister il est soit supprimé soit votre lien n'est pas le bon 🚧"
}

class Shotgun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nb: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id,
            loading: true,
            login: '',
            shotgun: false,
            text:'',
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
            this.setState({text:res.data['text']})
            let date = new Date(res.data['shotgunDate'])
            if(!res.data['actif'] || date >  Date.now()){
                this.setState({loading: false})
                this.setState({message:'time'})
            }
            this.setState({loading: false})
        }).catch((reason => {
            this.setState({message:'notFound'})
            this.setState({loading: false})
        }))
        if(this.getCookie('SHOTGUN_'+this.state.nb)) {
            this.setState({message:'succes'})
            this.setState({loading: false})
        }
    }

    makeshotgun(){

        this.setState({loading:true})
        ajaxPost('shotgun/persons/',{login: this.state.login, id_creneau: this.state.nb, email: null}).then((res) =>{
            document.cookie = 'SHOTGUN_'+this.state.nb+'=True'
            this.setState({message:'succes'})
            this.setState({loading:false})
        }).catch((exeption)=>{
            if (exeption.response) {
                switch (exeption.response.status){
                    case 400:
                        this.setState({message:'succes'})
                        document.cookie = 'SHOTGUN_'+this.state.nb+'=True'
                        break;
                    case 429:
                        this.setState({message:'max'})
                        break;
                    case 422:
                        this.setState({message:'login'})
                        break;
                    case 451:
                        this.setState({message:'time'})
                        break;
                    default:
                        this.setState({message:'others'})
                        break;
                }
            }
            this.setState({loading:false})

        })

    }

    handleChange(e){
        this.setState({login:e.target.value})
    }


    renderShutgun(classes){
        return(
            <div>
                <Grid container direction="column" className={classes.font}
                      alignItems="center"
                      justify="center">
                    <Typography variant="h1" className={classes.title}>
                        Shotgun
                    </Typography>
                    <Typography variant="h4" className={classes.title}>
                        {this.state.text}
                    </Typography>
                    <TextField value={this.state.login} onChange={this.handleChange} label="Ton login" variant="outlined" className={classes.textField} />
                    <Button variant="contained" className={classes.button} onClick={() => this.makeshotgun()}>SHOTGUN!</Button>
                </Grid>
            </div>
        )
    }

    renderMessageShotgun(classes, extraText){
        let customMessage = messages[this.state.message]
        return(
            <div>
                <Grid container direction="column" className={classes.font}
                      alignItems="center"
                      justify="center">
                    <Typography variant="h4">
                        {extraText}
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        {customMessage}
                    </Typography>
                </Grid>
            </div>
        )

    }

    render() {
        const { classes} = this.props;
        if(this.state.loading){
            return(
                <div>
                    <Grid container direction="column" className={classes.font}
                          alignItems="center"
                          justify="center">
                        <Typography>N'actualisez pas la page SVP (ça bosse) !</Typography>
                        <CircularProgress />
                    </Grid>
                </div>
            )
        }
        else{
            if(this.state.message){
                if(this.state.message === 'time'){
                    return this.renderMessageShotgun(classes,this.state.text)
                }
                else{
                    return this.renderMessageShotgun(classes)
                }
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
