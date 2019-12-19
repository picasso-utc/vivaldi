import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ajaxPost } from '../utils/Ajax';
import { asset_url } from '../utils/Config';
import Grid from '@material-ui/core/Grid';


class PermPic extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            beers : {
                duel_1 : {
                    gauloise : {
                        id: 1401,
                        percentage: ''
                    },
                    friels: {
                        id: 13896,
                        percentage: ''
                    },
                },
                duel_2 : {
                    delirium: {
                        id: 458,
                        percentage: ''
                    },
                    cuvee: {
                        id: 457,
                        percentage: ''
                    }
                },
                duel_3 : {
                    barbar: {
                        id : 1403,
                        percentage: ''
                    },
                    valdieu: {
                        id: 12492,
                        percentage: ''
                    }
                },
            },
            duel : {
                score_1 : '',
                score_2 : '',
            }
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
            let duel_total_sells = 0;
            let duel_score = [0,0]
            for (let index = 0; index < duels.length; index++) {
                const duel_beers = Object.keys(beers[duels[index]]);

                duel_score[0] += beers[duels[index]][duel_beers[0]].quantity;
                duel_score[1] += beers[duels[index]][duel_beers[1]].quantity;
                duel_total_sells += beers[duels[index]][duel_beers[0]].quantity;
                duel_total_sells += beers[duels[index]][duel_beers[1]].quantity;

            }

            const div_1 = document.getElementById("vollaile");
            const div_2 = document.getElementById("cochons");
            let score_1 = "0.0%";
            let score_2 = "0.0%";
            if (duel_total_sells > 0) {
                score_1 = ((duel_score[0]/duel_total_sells)*100).toFixed(1) + "%";
                score_2 = ((duel_score[1]/duel_total_sells)*100).toFixed(1) + "%";
                div_1.style.width = score_1 
                div_2.style.width = score_2 
            } else {
                div_1.style.width = 0 + '%'
                div_2.style.width = 0 + '%'
            }

            this.setState({
                duel: {
                    score_1 : score_1,
                    score_2 : score_2,
                }
            })
        }).catch(error => {
            console.log(error);
        })
    }


	render() {

        const { classes } = this.props;
        const { duel } = this.state;

		return (
            
            <div className={classes.main}>
                
                <div className={classes.pic}>
                    <Grid container direction="row" style={{height: '3%'}}>
                    </Grid>
                    <Grid container direction="row" style={{height: '30%'}}>
                        <img src={asset_url("/images/duel_basse_cour.png")} className={classes.duel_img} alt="Duel des brasseurs"/>
                    </Grid>

                    <Grid container direction="row" style={{height: '11%'}}>

                    </Grid>


                    {/* DUEL */}
                    <Grid container direction="row" style={{height: '30%'}}>
                        <Grid item xs={3} className={classes.img_div_left}>
                            <img alt="delired_beer" src={asset_url("/images/team_vollaile.png")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Volaille ({duel.score_1})</span>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.left_score} id="vollaile">
                                <img alt="delired_score" src={asset_url("/images/beer.gif")} className={classes.left_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.div_score}>
                            <div className={classes.right_score} id="cochons">
                                <img alt="pechemel_score" src={asset_url("/images/beer.gif")} className={classes.right_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} className={classes.img_div_right}>
                            <img alt="pechemel_beer" src={asset_url("/images/team_cochons.png")} className={classes.beer_img}/>
                            <span className={classes.beer_name}>Cochons ({duel.score_2})</span>
                        </Grid>
                    </Grid>


                    <Grid container direction="row" style={{height: '19%'}}>

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
    },       
    pic : {
        height: '100%', 
        border: '2px solid #B22132'
    },    
    duel_img : {
        objectFit: 'contain', 
        height: '100%',
        width: '100%',
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
        height: '60%',
        marginTop: '20%',
        objectFit: 'cover',
    },    
    right_score_img : {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        height: '60%',
        marginTop: '20%',
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
    },    
    right_score : {
        left: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        top: '35%',
        height: '30%',
        width: '80%',
        position: 'absolute',
    },    
});

export default withStyles (styles) (PermPic)

