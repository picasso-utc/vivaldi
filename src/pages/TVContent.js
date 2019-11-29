import React from 'react';
import { URL, API_URL } from '../utils/Config';
import { ajaxGet } from '../utils/Ajax';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


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
            polls : [],
            current_poll_index : 0
        }
	}

	componentDidMount(){
        this.init();
    }

    init(){
        this.loadTVContent();
        // Récupération des médias toutes les 30s
        setInterval(() => this.loadTVContent(), 30 * 1000);
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
        let index = this.state.params.index;
        index = index + 1;
        // Fin de la boucle, passage aux sondages
        if (index === this.state.media.length) {
            this.loadSurveys();
        } else {
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

    loadSurveys(){
        ajaxGet('tv/surveys').then(res => {
            this.setState({polls: res.data.surveys}, () => {
                this.loadNextTVSurvey(res.data.surveys, -1);
            });
        })
    }

    loadNextTVSurvey(polls, index){
        if (polls.length > 0) {
            let current_poll_index = index;
            current_poll_index += 1;
            if (current_poll_index < polls.length) {
                this.setState({
                    current_poll_index: current_poll_index, 
                    params: {
                        ...this.state.params,
                        media_type : "P"
                    }
                }, () => {
                    setTimeout(() => {
                        this.loadNextTVSurvey(polls, current_poll_index);
                    }, 15*1000)
                })
            } else {
                this.reloadMediaLoop()
            }
        } else {
            this.reloadMediaLoop();
        }
    }


    reloadMediaLoop(){
        // On reprend la boucle à 0
        this.setState({
            params : {
                media_type: "I",
                index: -1,
                times: '',
            }
        }, () => {
            this.displayMedia();
        }); 
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

        const { params, media, polls, current_poll_index } = this.state;

		return (
            
            <React.Fragment>
                {media.map((m, index) => (
                    <React.Fragment key={index}>
                        
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
                    {params.media_type === "P" &&
                        <div 
                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, height: '100vh', background: '#000223',
                            position: 'absolute', top:0, left: 0, right: 0, bottom: 0, overflowY: 'hidden'}}
                        >
                            <div 
                                style={{margin:'auto', border : "#B22132 1px solid", padding: 15, position: 'absolute', height:'90%', 
                                width: '95%', color: 'white'}}
                            >
                                
                                <Grid 
                                    container 
                                    direction="row" 
                                    justify="center" 
                                    alignItems="center" 
                                    style={{height: '40%', paddingTop:10, overflowY: 'hidden', overflowX: 'hidden'}}
                                >
                                    {polls[current_poll_index].surveyitem_set.map((item, index) => (
                                        <div 
                                            key={index} 
                                            style={{height: '100%', padding: 10, width: '20%'}}
                                        >
                                            <Typography variant="h6" style={{height: '20%', textAlign: 'center'}}>
                                                {item.name}
                                            </Typography>
                                            <div style={{height: '60%', width: '100%', textAlign: 'center'}}>
                                                <img 
                                                    alt={URL + '/media/' + item.image} 
                                                    src={URL + '/media/' + item.image} 
                                                    style={{maxWidth: '100%', height: '100%', objectFit: 'contain', borderRadius: 5}}
                                                />
                                            </div>
                                            <Typography 
                                                variant="body1" 
                                                style={{height: '20%', marginTop: 15, textAlign: 'center'}}
                                            >
                                                {item.vote.toFixed(1)}%
                                            </Typography>
                                        </div>
                                    ))}
                                </Grid>
                                
                                <Grid 
                                    container 
                                    direction="row" 
                                    justify="center" 
                                    alignItems="center" 
                                    style={{height: '25%'}}
                                >
                                    <Typography variant="h3">
                                        {polls[current_poll_index].description}
                                    </Typography>
                                    
                                </Grid>
                                <Grid 
                                    container 
                                    direction="row" 
                                    justify="center" 
                                    alignItems="center" 
                                    style={{height: '30%'}}
                                >
                                    <img 
                                        alt="QR Cocde" 
                                        src={API_URL + 'tv/qrcode?survey_id=' + polls[current_poll_index].id} 
                                        style={{border: '#B22132 1.5px solid', height: '70%'}}
                                    />
                                </Grid>
                                <Grid 
                                    container 
                                    direction="row" 
                                    justify="center" 
                                    alignItems="center" 
                                    style={{height: '5%'}}
                                >
                                    <span style={{fontSize: 20}}>Votez ici !</span>
                                </Grid>
                            </div>
                        </div>
                    }
            </React.Fragment>         
		);
	}
}



export default (TVContent)

