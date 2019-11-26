import React from 'react';
import { URL } from '../utils/Config';
import { ajaxGet } from '../utils/Ajax';


class TVContent extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            media : [],
            params : {
                media_type: "I",
                index: -1,
                times: '',
            },
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
            if (params.media_type === "I") {
                setTimeout(() => {
                    this.displayMedia();
                }, 1000*params.times)
            } else if (params.media_type === "V"){
                const video = document.getElementById('video-' + params.media_id);
                video.currentTime = 0;
                video.play();
            }
        }
    }


    loadNextMedia(){
        if (this.state.media.length === 0) {
            this.setState({index: 0});
            return null;
        }
        let index = this.state.params.index;
        index = (index + 1)%this.state.media.length;
        const media_to_dispaly = this.state.media[index];
        const params = {
            index: index,
            media_type: media_to_dispaly.media_type,
            times: media_to_dispaly.times,
            media_id: media_to_dispaly.id,
        }
        this.setState({
            params: params
        })
        this.setState({index: index, media_type: media_to_dispaly.media_type, times: media_to_dispaly.times});
        return params
    }



    loadTVContent(){
        ajaxGet('tv/public/media').then((res) => {
            if(this.state.media.length === 0){
                this.setState({media: res.data.media});
                this.displayMedia();
            } else {
                const media = this.state.media;
                let change = false;
                // On vérifie que les médias dans le state sont bien tous présents dans l'appel API
                for (let index = 0; index < media.length; index++) {
                    const media_index = res.data.media.findIndex(m => m.id === media[index].id)
                    if (media_index < 0) {
                        change = true;
                    }
                }
                // On vérifie que les médians dans l'appel API sont bien tous présents dans le state
                for (let index = 0; index < res.data.media.length; index++) {
                    const media_index = media.findIndex(m => m.id === res.data.media[index].id);
                    if (media_index < 0) {
                        change = true;
                    }
                }
                if (change) {
                    window.location.reload();
                }
            }
        })
    }


    endVideo(event, index){
        if(index === this.state.params.index){
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
    }


	render() {

        const { params, media } = this.state;

		return (
            
            <React.Fragment>
                {media.map((m, index) => (
                    <React.Fragment>
                        
                            {m.media_type === "I" &&
                                <div style={index === params.index ?
                                    {display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, height: '100vh', 
                                    background: '#000', position: 'absolute', top:0, left: 0, right: 0, bottom: 0}
                                    : {display: 'None'}
                                }>
                                    <img 
                                        alt={media.name}
                                        src={URL + '/media/' + m.media} 
                                        style={index === params.index ? 
                                            {maxWidth: '100vw', maxHeight: '100vh'}
                                            : {maxWidth: '100vw', maxHeight: '100vh', display : 'none'}
                                        }
                                    />
                                </div>
                            }
                            {m.media_type === "V" &&
                                <div style={index === params.index ?
                                    {display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, height: '100vh', background: '#000',
                                    position: 'absolute', top:0, left: 0, right: 0, bottom: 0}
                                    : {display: 'none'}    
                                }>
                                    <video 
                                        src={URL + '/media/' + m.media} 
                                        muted 
                                        autoPlay
                                        id={`video-${m.id}`}
                                        style={index === params.index ? 
                                            {maxWidth: '100vw', maxHeight: '100vh'}
                                            : {maxWidth: '100vw', maxHeight: '100vh', display : 'none'}
                                        }
                                        onEnded={(e) => this.endVideo(e, index)}
                                    />
                                </div>
                            }
                        </React.Fragment>
                    ))}
            </React.Fragment>         
		);
	}
}



export default (TVContent)

