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
        setInterval(() => this.loadTVContent(), 30000) 
        
    }


    loadTVContent(){
        const current_date = new Date();
        let mode = "image"
        if (current_date.getDate() === 31 && current_date.getMonth() === 9) {
            mode = "video";
            if (current_date.getHours() === 18 && current_date.getMinutes() >= 30) {
                const path="/media/gauloise.mp4";
                if (!this.state.mode !== mode || !this.state.src !== path) {
                    this.changeState(mode, path);
                }
            } else if (current_date.getHours() === 19 && current_date.getMinutes() <= 29){
                const path="/media/barbar.mp4";
                if (!this.state.mode !== mode || !this.state.src !== path) {
                    this.changeState(mode, path);
                }
            } else if (current_date.getHours() === 19 && current_date.getMinutes() >= 30){
                const path="/media/cidre.mp4";
                if (!this.state.mode !== mode || !this.state.src !== path) {
                    this.changeState(mode, path);
                }
            } else {
                mode = "image"
                const path="/images/halloween.png";
                if (!this.state.mode !== mode || !this.state.src !== path) {
                    this.changeState(mode, path);
                }
            }
            return ; 
        }
        const path="/images/halloween.png";
        if (!this.state.mode !== mode || !this.state.src !== path) {
            this.changeState(mode, path);
        }
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

