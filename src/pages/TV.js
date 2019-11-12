import React from 'react';
import Auth from '../utils/Auth';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { asset_url, URL } from '../utils/Config';
import { ajaxGet } from '../utils/Ajax';


class TV extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            media : [],
            params : {
                media_type: "I",
                index: 0,
                times: '',
            }
        }
	}

	componentDidMount(){
        this.init();
    }

    init(){
        this.loadTVContent();
        setInterval(() => this.loadTVContent(), 30000);
        this.displayMedia();
    }

    displayMedia(){

        const params = this.loadNextMedia()
        if(params){
            if (params.media_type == "I") {
                setTimeout(() => {
                    this.displayMedia();
                }, 1000*params.times)
            }
        }
    }


    loadNextMedia(){
        if (this.state.media.length == 0) {
            this.setState({index: 0});
            return null;
        }
        let index = this.state.params.index;
        index = (index + 1)%(this.state.media.length);
        const media_to_dispaly = this.state.media[index];
        const params = {
            index: index,
            media_type: media_to_dispaly.media_type,
            times: media_to_dispaly.times
        }
        this.setState({
            params: params
        })
        this.setState({index: index, media_type: media_to_dispaly.media_type, times: media_to_dispaly.times});
        return params
    }



    loadTVContent(){
        ajaxGet('tv/public/media').then((res) => {
            if(this.state.media.length == 0){
                this.setState({media: res.data.media});
                this.displayMedia();
            }
        })
    }

    endVideo(event){
        let times = this.state.params.times;
        if (times <= 1) {
            this.displayMedia();
        } else {
            this.setState({
                params:{
                    ...this.state.params,
                    times: times-1
                }
            });
            event.target.play();
        }
    }


	render() {

        const { classes } = this.props;
        const { params, media } = this.state;

		return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', 
                        flex: 1, height: '100vh', background: '#000', position: 'absolute', top:0, left: 0, right: 0, bottom: 0}}>
                    { media.length > 0 &&
                        <React.Fragment>
                            {params.media_type === "I" &&
                                <img src={URL + '/media/' + media[params.index].media} style={{maxWidth: '100vw', maxHeight: '100vh'}}/>
                            }
                            {params.media_type === "V" &&
                                <video 
                                    src={URL + '/media/' + media[params.index].media} 
                                    autoPlay
                                    muted 
                                    style={{maxWidth: '100vw', maxHeight: '100vh'}}
                                    onEnded={(e) => this.endVideo(e)}
                                />
                            }
                        </React.Fragment>
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

