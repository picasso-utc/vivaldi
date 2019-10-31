import React from 'react';
import Auth from '../utils/Auth';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

class Login extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            mode : 'image',
            src : '',
        }
	}

	componentDidMount(){
        this.loadTVContent();
    }

    loadTVContent(){
        this.setState({src: '/images/halloween.png'});
    }
    


	render() {

        const { classes } = this.props;
        const { mode, src } = this.state;

		return (
            <div style={{textAlign: 'center', backgroundColor: '#000223'}}>
                {mode === "image"&&
                    <img src={src} style={{height: '100vh'}}/>
                }
                {mode === "video"&&
                    <video src="http://localhost:3000/tv/barbar.mp4" loop autoPlay muted style={{height: '100vh'}}/>
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

export default withStyles (styles) (Login)

