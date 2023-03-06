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
            user_login: ''
        }
        
        this.displayCreneau = this.displayCreneau.bind(this)
        this.changeNewAstreinte = this.changeNewAstreinte.bind(this)
        this.goNextWeek = this.goNextWeek.bind(this)
        this.goPreviousWeek = this.goPreviousWeek.bind(this)
        this.saveAstreinte = this.saveAstreinte.bind(this)
        this.shotgunAstreinte = this.shotgunAstreinte.bind(this)
	}

	
	componentDidMount(){
        this.loadDates();
        this.loadMembers();
	}

    loadUser() {
        ajaxGet('auth/me').then(res => {
            let login = res.data.login

            let user_id = this.state.members.find(member => member.userright.login === login)?.id;

			this.setState({user_id: user_id});
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
                }

                // Empty astreintes
                let size = creneaux[index].size;
                let astreintes = creneaux[index].astreintes;

                if(size > astreintes.length) {
                    for(let subIndex = 0; subIndex < size - astreintes.length; subIndex++) {
                        creneaux[index].astreintes.push("? - libre - 0")
                    }
                }
            }

            console.log(creneaux)

			this.setState({creneaux: res.data.creneaux, loading: false})
		})
		.catch(error => {
			this.setState({loading: false});
		});
	}

	displayCreneau(date, creneau_type){
		if(date){
            date = formateToDjangoDate(date);
            const found_creneaux = this.state.creneaux.filter(c => c.date === date && c.creneau === creneau_type);
			if (found_creneaux.length > 0) {
				return found_creneaux[0];
            }
		}
		return '';
    }
    

    changeNewAstreinte(creneau, name, value){
        let creneaux= [...this.state.creneaux];
        const creneau_index = creneaux.findIndex(c => c.id === creneau.id);
        if (creneau_index >= 0) {
            creneaux[creneau_index][name] = value;
        }
        this.setState({creneaux: creneaux})
    }


    saveAstreinte(creneau){
        const creneaux = [...this.state.creneaux];
        const creneau_index = creneaux.findIndex(c => c.id === creneau.id);

        const data={
            member_id: creneau.new_member_id,
            astreinte_type: creneau.new_astreinte_type,
            creneau_id: creneau.id
        }

        ajaxPost('perm/astreintes/', data).then(res => {
            const astreinte = res.data.astreinte_type + " - " + res.data.member.userright.name + " - " + res.data.id;
            creneaux[creneau_index].new_member_id = '';
            creneaux[creneau_index].astreintes.push(astreinte);
            this.setState({creneaux: creneaux});
		})
		.catch(error => {
			// this.setState({loading: false});
		});
    }

    async shotgunAstreinte(creneau, new_astreinte_type){
        const creneaux = [...this.state.creneaux];
        const creneau_index = creneaux.findIndex(c => c.id === creneau.id);


        // Already full :(
        if(creneau.size <= creneau.astreintes.filter((elem) => !(elem.includes('libre'))).length) return;

        const data= {
            member_id: this.state.user_id,
            astreinte_type: new_astreinte_type,
            creneau_id: creneau.creneau_id
        }

        await this.loadAstreintes(formateToDjangoDate(this.state.startDate), formateToDjangoDate(this.state.endDate))

        ajaxPost('perm/astreintes/', data).then(res => {
            this.loadAstreintes(formateToDjangoDate(this.state.startDate), formateToDjangoDate(this.state.endDate));
		})
		.catch(error => {
			// this.setState({loading: false});
		});
    }

    handleModalClickClose(){
        this.setState({astreinte_id: '', confirm_modal: false})
    }

    handleConfirmModalOpen(astreinte_id){
        this.setState({astreinte_id: astreinte_id, confirm_modal: true})
    }

    deleteAstreinte(){
        const astreinte_id = this.state.astreinte_id
        if (astreinte_id) {
            ajaxDelete('perm/astreintes/' + astreinte_id + '/').then(() => {
                this.setState({confirm_modal: false, astreinte_id: ''})
                this.reloadAstreinte(this.state.startDate, this.state.endDate);
            })
            .catch((error) => {
            })
        } else {
            this.setState({confirm_modal: false, astreinte_id: ''})
        }
    }

    render(){
        
        const { classes } = this.props;
        const { startDate, members, loading, confirm_modal } = this.state;

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
                                        const creneau = this.displayCreneau(addDays(startDate, week_day), creneau_type.code)
                                        console.log(creneau)
                                        return (
                                            <td key={index} className={classes.cell}>                                        
                                                {creneau ? (
                                                    <React.Fragment>
                                                        <span>{creneau.perm.nom}</span>
                                                        <hr/>
                                                        {creneau.creneau === "M" && <div>
                                                            <Button variant="contained" value="M1" onClick={() => this.shotgunAstreinte(creneau.creneaux.M1, "M1")}>
                                                                <div>
                                                                    <p>
                                                                        Matin | 09:30 - 10:15
                                                                    </p>
                                                                    {creneau.creneaux.M1.astreintes.map(astreinte => (
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
                                                        </div>}
                                                        {creneau.creneau === "M" && <div>
                                                            <Button 
                                                                variant="contained" 
                                                                value="M2" 
                                                                onClick={() => this.shotgunAstreinte(creneau.creneaux.M2, "M2")} 
                                                            >
                                                                <div>
                                                                    <p>
                                                                        Matin | 10:00 - 12:00
                                                                    </p>
                                                                    {creneau.creneaux.M2.astreintes.map(astreinte =>  (
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
                                                        </div>}
                                                        {creneau.creneau === "D" && <div><button value="D1" onClick={() => this.shotgunAstreinte(creneau, "D1")}>Midi 1</button><br/></div>}
                                                        {creneau.creneau === "D" && <div><button value="D2" onClick={() => this.shotgunAstreinte(creneau, "D2")}>Midi 2</button><br/></div>}
                                                        {creneau.creneau === "S" && <div><button value="S" onClick={() => this.shotgunAstreinte(creneau, "S")}>Soir</button><br/></div>}
                                                    </React.Fragment>
                                                ):(
                                                    ''  
                                                )}
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
                <Dialog
                    open={confirm_modal}
                    onClose={() => this.handleModalClickClose()}
                >
                    <DialogTitle>Suppresion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Veux-tu vraiment supprimer cette astreinte ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            color="secondary"
                            variant="contained" 
                            margin="dense"
                            size="small"
                            className={classes.btn} 
                            onClick={(e) => this.deleteAstreinte()}
                        >
                            Supprimer
                        </Button>    
                    </DialogActions>
                </Dialog>
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