import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { addDays, formateToDjangoDate } from '../../../utils/Date';
import { ajaxGet, ajaxPost } from '../../../utils/Ajax'
import { Typography, TextField, Button, Grid, Menu, MenuItem, Paper } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

class Astreintes extends Component{

    constructor(props) {
		super(props);
		this.state = {
            creneaux: [],
            members: [],
			loading: true
        }
        
        this.displayCreneau = this.displayCreneau.bind(this)
        this.changeNewAstreinte = this.changeNewAstreinte.bind(this)
        this.goNextWeek = this.goNextWeek.bind(this)
        this.goPreviousWeek = this.goPreviousWeek.bind(this)
        this.saveAstreinte = this.saveAstreinte.bind(this)
	}

	
	componentDidMount(){
        this.loadDates();
        this.loadMembers();
	}


    loadMembers(){
        ajaxGet('admin/members').then(res => {
			this.setState({members: res.data})
		})
		.catch(error => {
			// this.setState({loading: false});
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
            endDate: endDate
        })
        this.loadAstreintes(formateToDjangoDate(startDate), formateToDjangoDate(endDate));
    }

	loadAstreintes(startDate, endDate){
		ajaxPost('perms/week/astreintes', {start_date: startDate, end_date: endDate}).then(res => {
			this.setState({creneaux: res.data.creneaux, loading: false})
		})
		.catch(error => {
			this.setState({loading: false});
		});
	}

	displayCreneau(date, creneau_type){
		if(date){
            date = formateToDjangoDate(date);
            const found_creneaux = this.state.creneaux.filter(c => c.date == date && c.creneau == creneau_type);
			if (found_creneaux.length > 0) {
				return found_creneaux[0];
            }
		}
		return '';
    }
    

    changeNewAstreinte(creneau, name, value){
        let creneaux= [...this.state.creneaux];
        const creneau_index = creneaux.findIndex(c => c.id == creneau.id);
        if (creneau_index >= 0) {
            creneaux[creneau_index][name] = value;
        }
        this.setState({creneaux: creneaux})
    }


    saveAstreinte(creneau){
        const creneaux = [...this.state.creneaux];
        const creneau_index = creneaux.findIndex(c => c.id == creneau.id);

        const data={
            member_id: creneau.new_member_id,
            astreinte_type: creneau.new_astreinte_type,
            creneau_id: creneau.id
        }

        ajaxPost('perm/astreintes/', data).then(res => {
            const astreinte = res.data.astreinte_type + " - " + res.data.member.userright.name;
            creneaux[creneau_index].new_astreinte_type = '';
            creneaux[creneau_index].new_member_id = '';
            creneaux[creneau_index].astreintes.push(astreinte);
            this.setState({creneaux: creneaux});
		})
		.catch(error => {
			// this.setState({loading: false});
		});
    }


    render(){
        
        const { classes } = this.props;
        const { startDate, members } = this.state;

        const week_days=[0,1,2,3,4]
		const creneau_types=[
            {code: 'M', name:'Matin'},
            {code: 'D', name:'Midi'},
			{code: 'S', name:'Soir'}
        ];
        
        const astreinte_types = [
            {code: 'M1', name:'Matin 1'},
            {code: 'M2', name:'Matin 2'},
            {code: 'D1', name:'Midi 1'},
            {code: 'D2', name:'Midi 2'},
			{code: 'S', name:'Soir'}
        ]

        return (
            <div className={classes.container}>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Lundi</th>
                            <th>Mardi</th>
                            <th>Mercredi</th>
                            <th>Jeudi</th>
                            <th>Vendredi</th>
                            <th>Samedi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creneau_types.map((creneau_type) => (
                            <tr key={creneau_type.code}>
                                <th className={classes.leftTitleCell}>{creneau_type.name}</th>
                                {week_days.map((week_day, index)=> {
                                    const creneau = this.displayCreneau(addDays(startDate, week_day), creneau_type.code)
                                    return (
                                        <td key={index} className={classes.cell}>                                        
                                            {creneau ? (
                                                <React.Fragment>
                                                    <span>{creneau.perm.nom}</span>
                                                    <hr/>
                                                    {creneau.astreintes.map(astreinte => (
                                                        <span key={astreinte}>{astreinte}<br/></span>
                                                    ))}
                                                    <select 
                                                        value={creneau.new_member_id} 
                                                        name = 'new_member_id'
                                                        onChange={event => this.changeNewAstreinte(creneau, event.target.name, event.target.value)}
                                                    >
                                                        <option value="" defaultValue></option>
                                                        {members.map(member => (
                                                            <option key={member.id} value={member.id}>{member.userright.name}</option>
                                                        ))}
                                                    </select>
                                                    <select 
                                                        value={creneau.new_astreinte_type} 
                                                        name = 'new_astreinte_type'
                                                        onChange={event => this.changeNewAstreinte(creneau, event.target.name, event.target.value)}
                                                    >
                                                        <option value="" defaultValue></option>
                                                        {creneau.creneau == "M" && <option value="M1">Matin 1</option>}
                                                        {creneau.creneau == "M" && <option value="M2">Matin 2</option>}
                                                        {creneau.creneau == "D" && <option value="D1">Midi 1</option>}
                                                        {creneau.creneau == "D" && <option value="D2">Midi 2</option>}
                                                        {creneau.creneau == "S" && <option value="S">Soir</option>}
                                                    </select>
                                                    <button disabled={!creneau.new_astreinte_type && !creneau.new_member_id} onClick={() => this.saveAstreinte(creneau)}>
                                                        Ajouter
                                                    </button>
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
                <button onClick={this.goNextWeek}>
                    Semaine précédente
                </button>
                <button onClick={this.goPreviousWeek}>
                    Semaine suivante
                </button>
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
    },
});

export default withStyles (styles) (Astreintes)