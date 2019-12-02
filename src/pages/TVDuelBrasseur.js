import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ajaxPost } from '../utils/Ajax';
import { asset_url } from '../utils/Config';
import Grid from '@material-ui/core/Grid';


class TVDuelBrasseur extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            beers : {
                duel_1 : {
                    delirium : {
                        id: 458,
                        percentage: ''
                    },
                    cuvee: {
                        id: 457,
                        percentage: ''
                    },
                },
                duel_2 : {
                    delired: {
                        id: 15479,
                        percentage: ''
                    },
                    // AtyPic
                    pechemel: {
                        id: 1403,
                        percentage: ''
                    }
                    // Barbar
                },
                duel_3 : {
                    delinoel: {
                        id : 13896,
                        percentage: ''
                    },
                    // Friels
                    bush: {
                        id: 1399,
                        percentage: ''
                    }
                    // Chimay bleu
                },
                duel_4 : {
                    argentum: {
                        id: 1394,
                        percentage: ''
                    },
                    // Carolus Bouteille
                    surfine: {
                        id: 1398,
                        percentage: ''
                    }
                    // Westmalle triple
                }
            }
            // beers : {
            //     duel_1 : {
            //         delirium : {
            //             id: 458,
            //             percentage: ''
            //         },
            //         cuvee: {
            //             id: 457,
            //             percentage: ''
            //         },
            //     },
            //     duel_2 : {
            //         delired: {
            //             id: 13565,
            //             percentage: ''
            //         },
            //         pechemel: {
            //             id: 15707,
            //             percentage: ''
            //         }
            //     },
            //     duel_3 : {
            //         delinoel: {
            //             id : 15705,
            //             percentage: ''
            //         },
            //         bush: {
            //             id: 13798,
            //             percentage: ''
            //         }
            //     },
            //     duel_4 : {
            //         argentum: {
            //             id: 15706,
            //             percentage: ''
            //         },
            //         surfine: {
            //             id: 15704,
            //             percentage: ''
            //         }
            //     }
            // }
        }
	}

	componentDidMount(){
        this.loadBeerSells();
        setInterval(() => this.loadBeerSells(), 60*1000);
    }


    loadBeerSells(){
        ajaxPost('payutc/public/beers/sells', {'beers' :this.state.beers}).then(res => {
            let beers = res.data.beers;
            const duels = Object.keys(beers);
            for (let index = 0; index < duels.length; index++) {
                const duel_beers = Object.keys(beers[duels[index]]);
                let duel_total_sells = 0
                for (let beer_index = 0; beer_index < duel_beers.length; beer_index++) {
                    duel_total_sells += beers[duels[index]][duel_beers[beer_index]].quantity;
                }
                for (let beer_index = 0; beer_index < duel_beers.length; beer_index++) {
                    const beer_sells = beers[duels[index]][duel_beers[beer_index]].quantity;
                    const beer_div = document.getElementById(duel_beers[beer_index]);
                    if (beer_sells === 0) {
                        beers[duels[index]][duel_beers[beer_index]].percentage = "0.0%"
                        beer_div.style.width = '0%';
                    } else {
                        const percentage = 85 * (beer_sells/duel_total_sells);
                        beers[duels[index]][duel_beers[beer_index]].percentage = (100*(beer_sells/duel_total_sells)).toFixed(1) + "%"
                        beer_div.style.width = percentage + '%';
                    }
                }
            }
            this.setState({beers: beers})
        }).catch(error => {
            console.log(error);
        })
    }


	render() {

        const { classes } = this.props;
        const { beers } = this.state;
        const backgroundImage = {
            backgroundImage: 'url(\'' + asset_url('/images/background_logo.png') + '\')'
        }

		return (
            
            <div className={classes.main} style={backgroundImage}>
                
                <div style={backgroundImage} className={classes.pic}>
                    <Grid container direction="row" style={{height: '15%'}}></Grid>


                    {/* DUEL 1 */}
                    <Grid container direction="row" style={{height: '20%'}}>
                        <Grid item xs={3} className={classes.img_div_left} id="deli">
                            <img alt="deli_beer" src={asset_url("/images/delirium.jpg")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Délirium ({beers.duel_1.delirium.percentage})</span>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.left_score} id="delirium">
                                <img alt="deli_score" src={asset_url("/images/beer.gif")} className={classes.left_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.right_score} id="cuvee">
                                <img alt="cuvee_score" src={asset_url("/images/beer.gif")} className={classes.right_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.img_div_right}>
                            <img alt="cuvee_beer" src={asset_url("/images/cuvee.png")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Cuvée ({beers.duel_1.cuvee.percentage})</span>
                        </Grid>
                    </Grid>


                    {/* DUEL 2 */}
                    <Grid container direction="row" style={{height: '20%'}}>
                        <Grid item xs={3} className={classes.img_div_left}>
                            <img alt="delired_beer" src={asset_url("/images/deli_red.png")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Déli Red ({beers.duel_2.delired.percentage})</span>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.left_score} id="delired">
                                <img alt="delired_score" src={asset_url("/images/beer.gif")} className={classes.left_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.right_score} id="pechemel">
                                <img alt="pechemel_score" src={asset_url("/images/beer.gif")} className={classes.right_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.img_div_right}>
                            <img alt="pechemel_beer" src={asset_url("/images/pechemel.jpg")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Pêche Mel ({beers.duel_2.pechemel.percentage})</span>
                        </Grid>
                    </Grid>


                    {/* DUEL 3 */}
                    <Grid container direction="row" style={{height: '20%'}}>
                        <Grid item xs={3} className={classes.img_div_left}>
                            <img alt="delinoel_beer" src={asset_url("/images/delinoel.jpg")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Déli Noël ({beers.duel_3.delinoel.percentage})</span>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.left_score} id="delinoel">
                                <img alt="delinoel_score" src={asset_url("/images/beer.gif")} className={classes.left_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.right_score} id="bush">
                                <img alt="bush_score" src={asset_url("/images/beer.gif")} className={classes.right_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.img_div_right}>
                            <img alt="bush_beer" src={asset_url("/images/bush.jpg")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Bush Triple ({beers.duel_3.bush.percentage})</span>
                        </Grid>
                    </Grid>
                    

                    {/* DUEL 4 */}
                    <Grid container direction="row" style={{height: '20%'}}>
                        <Grid item xs={3} className={classes.img_div_left}>
                            <img alt="argentum_beer" src={asset_url("/images/argentum.jpg")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Argentum ({beers.duel_4.argentum.percentage})</span>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.left_score} id="argentum">
                                <img alt="argentum_score" src={asset_url("/images/beer.gif")} className={classes.left_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.right_score} id="surfine">
                                <img alt="surfine_score" src={asset_url("/images/beer.gif")} className={classes.right_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.img_div_right}>
                            <img alt="surfine_beer" src={asset_url("/images/surfine.png")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Surfine ({beers.duel_4.surfine.percentage})</span>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" style={{height: '5%'}}></Grid>

                </div>
            
            </div>        
		);
	}
}

const styles = theme => ({
    body: {
        fontWeight: 500,
    },
    main: {
        height: '100vh', 
        backgroundColor: '#000223', 
        color: 'white', 
        padding: '2% 1%',
        fontWeight: 600,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '5% 50%',
        backgroundSize: '10%',
    },       
    pic : {
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '95% 50%',
        backgroundSize: '10%',
        height: '100%', 
        border: '1.5px solid #B22132'
    },    
    img_div_left : {
        height: '100%', 
        paddingRight: 0,
        textAlign: 'right',
        paddingTop: 15,
    },
    img_div_right : {
        height: '100%', 
        paddingRight: 0,
        textAlign: 'left',
        paddingTop: 15,
    },
    beer_img : {
        objectFit: 'contain', 
        height: '80%',
        borderRadius: 5,
    },    
    beer_name : {
        height: '20%',
        fontSize: 20,
        display: 'block',
        marginTop: -5,
    },
    left : {
        textAlign: 'right',
    },    
    right : {
        textAlign: 'left',
    },
    div_score : {
        height: '100%',
        position: 'relative',
    },  
    left_score_img : {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },    
    right_score_img : {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },    
    left_score : {
        right: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        top: '35%',
        height: '30%',
        width: '80%',
        position: 'absolute',
        backgroundColor: '#B22132',
    },    
    right_score : {
        left: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        top: '35%',
        height: '30%',
        width: '80%',
        position: 'absolute',
        backgroundColor: '#B22132',
    },    
});

export default withStyles (styles) (TVDuelBrasseur)

