import React from 'react';
import Auth from '../utils/Auth';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { asset_url } from '../utils/Config';


class TV extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            mode : 'image',
            src : '',
        }
	}

	componentDidMount(){
        this.init();
    }

    init(){
        this.loadTVContent()
        setInterval(() => this.loadTVContent(), 60000*5) 
        
    }


    loadTVContent(){
        let mode = "image"
        let path = "/images/associathon.png";
        if (this.state.src === "/images/associathon.png") {
            path = "/images/saucisson.png";
        }
        this.changeState(mode, path);
    }

    changeState(mode, path){
        this.setState({mode: mode, src: asset_url(path)});
    }
    


	render() {

        const { classes } = this.props;
        const { mode, src } = this.state;

		return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', 
                        flex: 1, height: '100vh', background: '#000', position: 'absolute', top:0, left: 0, right: 0, bottom: 0}}>
                    {mode === "image"&&
                        <img src={src} style={{maxWidth: '100vw', maxHeight: '100vh'}}/>
                    }
                    {mode === "video"&&
                        <video src={src} loop autoPlay muted style={{maxWidth: '100vw', maxHeight: '100vh'}}/>
                    }
            </div>         
		);
	}
}

const styles = theme => ({
    container: {
        paddingTop: 100,
        textAlign: 'center',
	},
	progress: {
		margin: 20,
		color: '#B22132',
	}
});

export default withStyles (styles) (TV)

