import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { addDays, formateToDjangoDate, calendarDate } from '../../../utils/Date';
import { ajaxGet, ajaxPost, ajaxDelete } from '../../../utils/Ajax'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { Card, CardContent, Paper, Typography } from '@material-ui/core';

class AstreintesShotgun extends Component{

    constructor(props) {
		super(props);
		this.state = {
            creneaux: [],
            members: [],
            loading: true,

            astreinte_id: '',
            confirm_modal: false,
            user_login: '',
            isAdmin: false,

            // shotgun button part
            timer: '10.000',
            shotgunHasStarted: false,

            // shotgun enabled
            canShotgun: false
        }
        
        this.displayCreneau = this.displayCreneau.bind(this)
        this.goNextWeek = this.goNextWeek.bind(this)
        this.goPreviousWeek = this.goPreviousWeek.bind(this)
        this.shotgunAstreinte = this.shotgunAstreinte.bind(this)
	}

	
	componentDidMount(){
        this.loadDates();
        this.loadMembers();
        this.interval = setInterval(() => {
            this.loadAstreintes(formateToDjangoDate(this.state.startDate), formateToDjangoDate(this.state.endDate));
        }, 1000);
	}

    componentWillUnmount() {
        // Clear the interval right before component unmount
        clearInterval(this.interval);
    }

    loadUser() {
        ajaxGet('auth/me').then(res => {
            let login = res.data.login

            let right = res.data.right;

            let user_id = this.state.members.find(member => member.userright.login === login)?.id;

			this.setState({user_id: user_id, isAdmin: right === 'A'});
		})
		.catch(error => {
			this.setState({loading: false});
		});
    }

    loadMembers(){
        ajaxGet('admin/members').then(res => {
            let members = res.data;
            members = members.sort(function(a,b){
                if (a.userright.name > b.userright.name) {
                    return 1
                }
                return -1
            })
			this.setState({members: members, loading: false})
            this.loadUser();
		})
		.catch(error => {
			this.setState({loading: false});
		});
    }

	loadDates(startDate=null, endDate=null){
		if (!startDate || !endDate) {
			const currentDate = new Date();
			// On récupère le jour de la SVGElementInstance, entre 0 (dimanche) et 6
			const current_day = currentDate.getDay();
			// Le jour de départ doit être lundi, donc day = 1
			// Fonction addDays qui va enlever ou ajouter le nombre de jour nécessaire
			const startDate = addDays(currentDate, 1 - current_day);
			// Le jour de fin doit être samedi, donc day = 6
			const endDate = addDays(currentDate, 6-current_day)

			this.setState({startDate: startDate, endDate: endDate})

			// On envoie les dates avec le format Django
			this.loadAstreintes(formateToDjangoDate(startDate), formateToDjangoDate(endDate));
		} 
    }
    
    goNextWeek(){
        const startDate = addDays(this.state.startDate, 7);
        const endDate = addDays(this.state.endDate, 7); 
        this.reloadAstreinte(startDate, endDate);
    }

    goPreviousWeek(){
        const startDate = addDays(this.state.startDate, -7);
        const endDate = addDays(this.state.endDate, -7); 
        this.reloadAstreinte(startDate, endDate);
    }

    reloadAstreinte(startDate, endDate){
        this.setState({
            startDate: startDate,
            endDate: endDate,
            loading: true
        })
        this.loadAstreintes(formateToDjangoDate(startDate), formateToDjangoDate(endDate));
    }

	loadAstreintes(startDate, endDate){
        ajaxGet('perm/shotgun').then(res => {
            let shotguns = res.data;

            this.setState({canShotgun : shotguns.some((shotgun) => shotgun.date === startDate)})
        })
		ajaxPost('perms/week/astreintes', {start_date: startDate, end_date: endDate}).then(res => {
            let creneaux = res.data.creneaux;
            for (let index = 0; index < creneaux.length; index++) {
                if (creneaux[index].creneau === "M"){
                    // Separating into two distincts creneaux
                    let m2Creneaux = JSON.parse(JSON.stringify(creneaux[index]))
                    m2Creneaux.astreintes = creneaux[index].astreintes.filter((elem) => (elem.includes('M2')))
                    creneaux[index].astreintes = creneaux[index].astreintes.filter((elem) => (elem.includes('M1')))

                    m2Creneaux.creneau = "M2";
                    creneaux[index].creneau = "M1";

                    creneaux[index].title = "Matin | 09:30 - 10:15"
                    m2Creneaux.title = "Matin | 10:00 - 12:00"

                    creneaux.push(m2Creneaux);
                } else if (creneaux[index].creneau === "D"){
                    // Separating into two distincts creneaux
                    let d2Creneaux = JSON.parse(JSON.stringify(creneaux[index]))
                    d2Creneaux.astreintes = creneaux[index].astreintes.filter((elem) => (elem.includes('D2')))
                    creneaux[index].astreintes = creneaux[index].astreintes.filter((elem) => (elem.includes('D1')))

                    d2Creneaux.creneau = "D2";
                    creneaux[index].creneau = "D1";

                    creneaux[index].title = "Midi | 11:45 - 13:00"
                    d2Creneaux.title = "Midi | 12:45 - 14:15"

                    creneaux.push(d2Creneaux);
                } else if (creneaux[index].creneau === "S"){
                    creneaux[index].title = "Soir | 18:30 - 23:00"
                }

                // Empty astreintes
                let size = creneaux[index].size;
                let astreintes = creneaux[index].astreintes;
                let astreintesLength = astreintes.length

                if(size > astreintesLength) {
                    for(let subIndex = 0; subIndex < size - astreintesLength; subIndex++) {
                        creneaux[index].astreintes.push("? - libre - 0")
                    }
                }
            }

            let formatedCreneaux = {
                'M': creneaux.filter((elem) => elem.creneau.includes('M')), 
                'D' : creneaux.filter((elem) => elem.creneau.includes('D')), 
                'S' : creneaux.filter((elem) => elem.creneau.includes('S')),
            }

			this.setState({creneaux: formatedCreneaux, loading: false})
		})
		.catch(error => {
			this.setState({loading: false});
		});
	}

	displayCreneau(date, creneau_type){
		if(date && this.state.creneaux[creneau_type]){
            date = formateToDjangoDate(date);

            const found_creneaux = this.state.creneaux[creneau_type].filter(c => c.date === date);

			if (found_creneaux?.length > 0) {
				return found_creneaux;
            }
		}
		return '';
    }

    async shotgunAstreinte(creneau){
        const creneau_type = creneau.creneau;

        const creneaux = [...this.state.creneaux[creneau_type[0]]];
        const creneau_index = creneaux.findIndex(c => c.id === creneau.id);


        // Already full :(
        // if(creneau.size <= creneau.astreintes.filter((elem) => !(elem.includes('libre'))).length) return;

        const data= {
            member_id: this.state.user_id,
            astreinte_type: creneau_type,
            creneau_id: creneau.id
        }

        await this.loadAstreintes(formateToDjangoDate(this.state.startDate), formateToDjangoDate(this.state.endDate))

        if(!this.state.canShotgun) return;

        ajaxPost('perm/astreintes/', data).then(res => {
            this.loadAstreintes(formateToDjangoDate(this.state.startDate), formateToDjangoDate(this.state.endDate));
		})
		.catch(error => {
			// this.setState({loading: false});
		});
    }

    launchShotgun() {
        const elt = this;
        if(!this.state.shotgunHasStarted) {
            this.setState({shotgunHasStarted : true})
            var countDownDate = new Date();
            countDownDate.setSeconds(countDownDate.getSeconds() + 10);

            let interval = setInterval(function() {
                // Get today's date and time
                var now = new Date().getTime();
            
                // Find the distance between now and the count down date
                var diffTime = Math.abs(countDownDate - now);
                var distance = countDownDate - now;
            
                // Time calculations for seconds and milliseconds
                var seconds = Math.floor((diffTime) / 1000);
                var milliseconds = diffTime - Math.floor(diffTime / 1000) * 1000;
            
                // Display the result
                elt.setState({timer: seconds + "." + milliseconds})
            
                // If the count down is finished, write some text
                if (distance < 1) {
                    clearInterval(interval);
                    elt.setState({timer: "SHOTGUN !"})

                    const data= {
                        launched_by_id: elt.state.user_id,
                        date : formateToDjangoDate(elt.state.startDate)
                    }

                    ajaxPost('perm/shotgun/', data).then(res => {
                        this.loadAstreintes(formateToDjangoDate(this.state.startDate), formateToDjangoDate(this.state.endDate));
                    })
                    .catch(error => {
                        // this.setState({loading: false});
                    });
                }
            }, 100);
        }
    }

    render(){
        
        const { classes } = this.props;
        const { startDate, members, loading, confirm_modal, timer, canShotgun } = this.state;

        const week_days=[0,1,2,3,4,5]
		const creneau_types=[
            {code: 'M', name:'Matin'},
            {code: 'D', name:'Midi'},
			{code: 'S', name:'Soir'}
        ];

        if(loading){
            return (
                <Grid 
                    container 
                    className={classes.loader}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <CircularProgress  className="admin_loader" color="secondary"/>
                    </Grid>
                </Grid>
            )
        }

        return (
            <div className="admin_container">
                <div className="responsive_table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Lundi {calendarDate(startDate)}</th>
                                <th>Mardi {calendarDate(addDays(startDate,1))}</th>
                                <th>Mercredi {calendarDate(addDays(startDate,2))}</th>
                                <th>Jeudi {calendarDate(addDays(startDate,3))}</th>
                                <th>Vendredi {calendarDate(addDays(startDate,4))}</th>
                                <th>Samedi {calendarDate(addDays(startDate,5))}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {creneau_types.map((creneau_type) => (
                                <tr key={creneau_type.code}>
                                    <th className={classes.leftTitleCell}>{creneau_type.name}</th>
                                    {week_days.map((week_day, index)=> {
                                        const creneauPeriode = this.displayCreneau(addDays(startDate, week_day), creneau_type.code)
                                        return (
                                            <td key={index} className={classes.cell}>
                                                {creneauPeriode ? (
                                                    <React.Fragment>
                                                        <span>{creneauPeriode[0].perm.nom}</span>       
                                                        <hr/>
                                                        {
                                                            creneauPeriode.map((creneau) => (
                                                                <Button 
                                                                    key={`${creneau.id}${creneau.creneau}`} 
                                                                    variant="contained" 
                                                                    value={creneau.creneau} 
                                                                    onClick={() => this.shotgunAstreinte(creneau)}
                                                                    style={(creneau.astreintes.every((element) => !element.includes('libre')))? styles.style : (canShotgun)? {backgroundColor: "lightgreen"} : {backgroundColor: "rgb(230 238 232)"}}
                                                                >
                                                                    <div>
                                                                        <p>
                                                                            {creneau.title}
                                                                        </p>
                                                                        {creneau.astreintes.map(astreinte => (
                                                                            // Astreinte de la forme astreinte_type - nom_astreinteur - id_astreinte
                                                                            <Card variant="outlined">
                                                                                <CardContent style={{ padding: "0" }}>
                                                                                    <Typography variant="overline" color="textSecondary">
                                                                                        {astreinte.split('-')[1]?.trim().split(' ')[0]}
                                                                                    </Typography>
                                                                                </CardContent>
                                                                            </Card>
                                                                        ))}
                                                                    </div>
                                                                </Button>
                                                            ))
                                                        }
                                                    </React.Fragment>
                                                ): ('')
                                            }
                                        </td>        
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Grid container direction="row" justify="center" alignItems="center" className="top10">
                    <button onClick={this.goPreviousWeek} className="margin10">
                        Semaine précédente
                    </button>
                    <button onClick={this.goNextWeek} className="margin10">
                        Semaine suivante
                    </button>
                </Grid>
                {this.state.isAdmin &&
                    <div>
                        <Grid container direction="row" justify="center" alignItems="center" className="top10">
                            <Button 
                                variant='outlined'
                                style={{
                                    backgroundColor: 'salmon',
                                    color: 'white'
                                }}
                                onClick={ () => this.launchShotgun() }
                                disabled={this.state.canShotgun}
                            >
                                LANCER LE SHOTGUN
                            </Button>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className="top10">
                            <h2>{timer}</h2>
                        </Grid>
                    </div>
                }
            </div>
        );
    };

}

const styles = theme => ({
    container: {
        padding: 20,
		margin: 30,
		marginTop: 100,
		border: "2px solid #B22132",
    },
    section:{
		paddingBottom :70,
    },
    subTitle: {
		marginTop: 10,
		marginBottom: 10,
	},
	subTitleIcon: {
		marginRight: 8,
		paddingTop: 5,
    },
    textField: {
        marginTop: 16,
        paddingRight: 15,
        width: "100%",
    },
    btn: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
    }
});

export default withStyles (styles) (AstreintesShotgun)