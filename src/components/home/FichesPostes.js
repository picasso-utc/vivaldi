import React from "react";
import { withStyles } from '@material-ui/core/styles'
import postes from '../../utils/postes.json'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import BuildIcon from '@material-ui/icons/Build';
import GroupIcon from '@material-ui/icons/Group';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SchoolIcon from '@material-ui/icons/School';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';

class FichesPostes extends React.Component {
  

	constructor(props) {
		super(props);
		this.state = {
			postes: [],
			poste_selected: false,
			poste_index: '',
			be_member_selected: false
		}
	}

	
	componentDidMount(){
		this.setState({
			postes: postes.postes
		}, () => {
			this.setState({loading: false})
		})
	}

	seeBeMemberSection(){
		this.setState({poste_index: '', poste_selected: false}, () => {
			this.setState({be_member_selected: true})
		})
	}

	seePosteSection(poste_index){
		this.setState({poste_index: poste_index, be_member_selected: false}, () => {
			this.setState({poste_selected: true})
		})
	}
	
	
	unselect(){
		this.setState({
			poste_index: '',
			poste_selected: false,
			be_member_selected: false
		})
	}

  	render() {

		const { poste_selected, be_member_selected, poste_index } = this.state;

		const { classes } = this.props;

		const postes = [
			{
				"name" : "Présidence",
				"icon": <SchoolIcon className={classes.icon}/>,
				"description": "Le rôle de la présidence est basé sur de la gestion externe et interne.\nIl faut tout d’abord permettre la communication entre les associations et le Pic’asso ainsi que s’assurer d’une bonne relation avec l’administration (#maaaail). C’est grâce à cela que le Pic’Asso peut être ouvert tout au long du semestre et proposer de nombreux évènements. Concrètement il faut s’occuper de dialoguer avec l’administration pour tout demande d’un côté et répondre aux divers mails des associations, des étudiants, etc... de l’autre. \nLa présidence a également pour mission de choisir de son équipe pour le semestre et de la gérer afin que tout le monde soit à fond et kiff son expérience dans l’asso. Il faut de plus animer les réunions hebdomadaires du dimanche après midi.\nEn conclusion être à ce poste c’est se porter garant du bon fonctionnement du Pic’Asso à tous les niveaux.",
				"tasks": [
					"Choisir une team chaude et l’encourager tout au long du semestre afin qu’elle soit bouillante",
					"Gestion des relations entre le Pic’Asso et les autres association (prêt de matériel, ouverture du Pic, gestion évènements)",
					"Faire le relais entre le Pic’Asso et l’administration",
					"Répondre à pleins plein de mails YOUHOU",
					"Etre garant du bon fonctionnement de l’asso",
					"Payer la 1ère tournée du semestre"
				]
			},
			{
				"name" : "Trésorerie",
				"icon": <AccountBalanceIcon className={classes.icon}/>,
				"description": "La trésorerie demande avant tout de la rigueur, de l’organisation et de la régularité.\nToutes les semaines, des nouvelles factures sont à enregistrer dans le logiciel Picsous et il faut rembourser les personnes faisant les courses pour les permanences.\nIl faut également gérer tous les prestataires des softs et des bières.\nIl faut faire chaque semaine les virements nécessaires et répertorier toutes les factures afin d’avoir un suivi détaillé des dépenses et achats du Pic, demandées par notre comptable. ",
				"tasks": [
					"Éviter la banqueroute",
					"Rembourser les perms (enregistrement factures + virements)",
					"Veiller à subvenir aux besoins du pic : paiement des achats des différentes team + factures",
					"Déclaration des impôts/Communication avec la comptable"
				]
			},
			{
				"name" : "Communication",
				"icon": <CameraAltIcon className={classes.icon}/>,
				"description": "La communication du PIC, c’est son identité. C’est le visage que tout le monde voit sur les réseaux et dans les locaux, c’est son univers, son thème, ses couleurs, ses formes, son style, son humour. En tant que foyer de tous les UTCéens, il faut que chacun s’y sente bien intégré, des nouveaux aux vieux cons en passant par les plus excentriques ou les plus timidounets. La com du Pic’asso est un moyen puissant d’expression et il touche du monde, soyez rigoureux, respectueux mais surtout créatifs.\nSon but est de transmettre toutes les informations importantes en dosant un peu tout : les graphismes, les affiches, les posts facebook, les events, les stories, l’humour, le sérieux, l’important, le présentiel.. Il y a énormément de supports possibles, chacun ayant ses avantages et inconvénients.\nLa particularité par rapport aux autres assos, c’est que le PIC a des choses à dire presque tous les jours, de la première à la dernière semaine du semestre (et même un peu plus). Il est donc primordial de planifier les tâches et leurs supports bien en avance (on peut pas faire 5 posts facebook par jours sur tout le semestre par exemple, beaucoup d’infos seraient perdues). Sans oublier qu’il y a pas mal de travail à fournir sur les différents visuels, surtout si vous voulez faire les choses bien !\nLe maître mot est donc de bien hiérarchiser ! ",
				"tasks": [
					"Être respectueux & impressionnant en communiquant l'actualité du Pic",
					"Savoir hiérarchiser les informations pour ne pas qu’elles se perdent",
					"Être créatif dans la réalisations de support de communication (vidéo, image etc..) et dans l’innovation artistique du Pic (stickers, Tag etc..)",
					"Incarner et utiliser Ted Teddy Pic’Asso"
				]
			},
			{
				"name" : "Communication",
				"icon": <MovieCreationIcon className={classes.icon}/>,
				"description": "La communication du PIC, c’est son identité. C’est le visage que tout le monde voit sur les réseaux et dans les locaux, c’est son univers, son thème, ses couleurs, ses formes, son style, son humour. En tant que foyer de tous les UTCéens, il faut que chacun s’y sente bien intégré, des nouveaux aux vieux cons en passant par les plus excentriques ou les plus timidounets. La com du Pic’asso est un moyen puissant d’expression et il touche du monde, soyez rigoureux, respectueux mais surtout créatifs.\nSon but est de transmettre toutes les informations importantes en dosant un peu tout : les graphismes, les affiches, les posts facebook, les events, les stories, l’humour, le sérieux, l’important, le présentiel.. Il y a énormément de supports possibles, chacun ayant ses avantages et inconvénients.\nLa particularité par rapport aux autres assos, c’est que le PIC a des choses à dire presque tous les jours, de la première à la dernière semaine du semestre (et même un peu plus). Il est donc primordial de planifier les tâches et leurs supports bien en avance (on peut pas faire 5 posts facebook par jours sur tout le semestre par exemple, beaucoup d’infos seraient perdues). Sans oublier qu’il y a pas mal de travail à fournir sur les différents visuels, surtout si vous voulez faire les choses bien !\nLe maître mot est donc de bien hiérarchiser ! ",
				"tasks": [
					"Être respectueux & impressionnant en communiquant l'actualité du Pic",
					"Savoir hiérarchiser les informations pour ne pas qu’elles se perdent",
					"Être créatif dans la réalisations de support de communication (vidéo, image etc..) et dans l’innovation artistique du Pic (stickers, Tag etc..)",
					"Incarner et utiliser Ted Teddy Pic’Asso"
				]
			},
			{
				"name" : "Animation",
				"icon": <SportsKabaddiIcon className={classes.icon}/>,
				"description": "La communication du PIC, c’est son identité. C’est le visage que tout le monde voit sur les réseaux et dans les locaux, c’est son univers, son thème, ses couleurs, ses formes, son style, son humour. En tant que foyer de tous les UTCéens, il faut que chacun s’y sente bien intégré, des nouveaux aux vieux cons en passant par les plus excentriques ou les plus timidounets. La com du Pic’asso est un moyen puissant d’expression et il touche du monde, soyez rigoureux, respectueux mais surtout créatifs.\nSon but est de transmettre toutes les informations importantes en dosant un peu tout : les graphismes, les affiches, les posts facebook, les events, les stories, l’humour, le sérieux, l’important, le présentiel.. Il y a énormément de supports possibles, chacun ayant ses avantages et inconvénients.\nLa particularité par rapport aux autres assos, c’est que le PIC a des choses à dire presque tous les jours, de la première à la dernière semaine du semestre (et même un peu plus). Il est donc primordial de planifier les tâches et leurs supports bien en avance (on peut pas faire 5 posts facebook par jours sur tout le semestre par exemple, beaucoup d’infos seraient perdues). Sans oublier qu’il y a pas mal de travail à fournir sur les différents visuels, surtout si vous voulez faire les choses bien !\nLe maître mot est donc de bien hiérarchiser ! ",
				"tasks": [
					"Être respectueux & impressionnant en communiquant l'actualité du Pic",
					"Savoir hiérarchiser les informations pour ne pas qu’elles se perdent",
					"Être créatif dans la réalisations de support de communication (vidéo, image etc..) et dans l’innovation artistique du Pic (stickers, Tag etc..)",
					"Incarner et utiliser Ted Teddy Pic’Asso"
				]
			},
			{
				"name" : "Informatique",
				"icon": <ImportantDevicesIcon className={classes.icon}/>,
				"description": "La communication du PIC, c’est son identité. C’est le visage que tout le monde voit sur les réseaux et dans les locaux, c’est son univers, son thème, ses couleurs, ses formes, son style, son humour. En tant que foyer de tous les UTCéens, il faut que chacun s’y sente bien intégré, des nouveaux aux vieux cons en passant par les plus excentriques ou les plus timidounets. La com du Pic’asso est un moyen puissant d’expression et il touche du monde, soyez rigoureux, respectueux mais surtout créatifs.\nSon but est de transmettre toutes les informations importantes en dosant un peu tout : les graphismes, les affiches, les posts facebook, les events, les stories, l’humour, le sérieux, l’important, le présentiel.. Il y a énormément de supports possibles, chacun ayant ses avantages et inconvénients.\nLa particularité par rapport aux autres assos, c’est que le PIC a des choses à dire presque tous les jours, de la première à la dernière semaine du semestre (et même un peu plus). Il est donc primordial de planifier les tâches et leurs supports bien en avance (on peut pas faire 5 posts facebook par jours sur tout le semestre par exemple, beaucoup d’infos seraient perdues). Sans oublier qu’il y a pas mal de travail à fournir sur les différents visuels, surtout si vous voulez faire les choses bien !\nLe maître mot est donc de bien hiérarchiser ! ",
				"tasks": [
					"Être respectueux & impressionnant en communiquant l'actualité du Pic",
					"Savoir hiérarchiser les informations pour ne pas qu’elles se perdent",
					"Être créatif dans la réalisations de support de communication (vidéo, image etc..) et dans l’innovation artistique du Pic (stickers, Tag etc..)",
					"Incarner et utiliser Ted Teddy Pic’Asso"
				]
			},
			{
				"name" : "Appro-Soft",
				"icon": <FastfoodIcon className={classes.icon}/>,
				"description": "La communication du PIC, c’est son identité. C’est le visage que tout le monde voit sur les réseaux et dans les locaux, c’est son univers, son thème, ses couleurs, ses formes, son style, son humour. En tant que foyer de tous les UTCéens, il faut que chacun s’y sente bien intégré, des nouveaux aux vieux cons en passant par les plus excentriques ou les plus timidounets. La com du Pic’asso est un moyen puissant d’expression et il touche du monde, soyez rigoureux, respectueux mais surtout créatifs.\nSon but est de transmettre toutes les informations importantes en dosant un peu tout : les graphismes, les affiches, les posts facebook, les events, les stories, l’humour, le sérieux, l’important, le présentiel.. Il y a énormément de supports possibles, chacun ayant ses avantages et inconvénients.\nLa particularité par rapport aux autres assos, c’est que le PIC a des choses à dire presque tous les jours, de la première à la dernière semaine du semestre (et même un peu plus). Il est donc primordial de planifier les tâches et leurs supports bien en avance (on peut pas faire 5 posts facebook par jours sur tout le semestre par exemple, beaucoup d’infos seraient perdues). Sans oublier qu’il y a pas mal de travail à fournir sur les différents visuels, surtout si vous voulez faire les choses bien !\nLe maître mot est donc de bien hiérarchiser ! ",
				"tasks": [
					"Être respectueux & impressionnant en communiquant l'actualité du Pic",
					"Savoir hiérarchiser les informations pour ne pas qu’elles se perdent",
					"Être créatif dans la réalisations de support de communication (vidéo, image etc..) et dans l’innovation artistique du Pic (stickers, Tag etc..)",
					"Incarner et utiliser Ted Teddy Pic’Asso"
				]
			},
			{
				"name" : "Appro-Bière",
				"icon": <LocalBarIcon className={classes.icon}/>,
				"description": "La communication du PIC, c’est son identité. C’est le visage que tout le monde voit sur les réseaux et dans les locaux, c’est son univers, son thème, ses couleurs, ses formes, son style, son humour. En tant que foyer de tous les UTCéens, il faut que chacun s’y sente bien intégré, des nouveaux aux vieux cons en passant par les plus excentriques ou les plus timidounets. La com du Pic’asso est un moyen puissant d’expression et il touche du monde, soyez rigoureux, respectueux mais surtout créatifs.\nSon but est de transmettre toutes les informations importantes en dosant un peu tout : les graphismes, les affiches, les posts facebook, les events, les stories, l’humour, le sérieux, l’important, le présentiel.. Il y a énormément de supports possibles, chacun ayant ses avantages et inconvénients.\nLa particularité par rapport aux autres assos, c’est que le PIC a des choses à dire presque tous les jours, de la première à la dernière semaine du semestre (et même un peu plus). Il est donc primordial de planifier les tâches et leurs supports bien en avance (on peut pas faire 5 posts facebook par jours sur tout le semestre par exemple, beaucoup d’infos seraient perdues). Sans oublier qu’il y a pas mal de travail à fournir sur les différents visuels, surtout si vous voulez faire les choses bien !\nLe maître mot est donc de bien hiérarchiser ! ",
				"tasks": [
					"Être respectueux & impressionnant en communiquant l'actualité du Pic",
					"Savoir hiérarchiser les informations pour ne pas qu’elles se perdent",
					"Être créatif dans la réalisations de support de communication (vidéo, image etc..) et dans l’innovation artistique du Pic (stickers, Tag etc..)",
					"Incarner et utiliser Ted Teddy Pic’Asso"
				]
			},
			{
				"name" : "Locaux",
				"icon": <BuildIcon className={classes.icon}/>,
				"description": "La communication du PIC, c’est son identité. C’est le visage que tout le monde voit sur les réseaux et dans les locaux, c’est son univers, son thème, ses couleurs, ses formes, son style, son humour. En tant que foyer de tous les UTCéens, il faut que chacun s’y sente bien intégré, des nouveaux aux vieux cons en passant par les plus excentriques ou les plus timidounets. La com du Pic’asso est un moyen puissant d’expression et il touche du monde, soyez rigoureux, respectueux mais surtout créatifs.\nSon but est de transmettre toutes les informations importantes en dosant un peu tout : les graphismes, les affiches, les posts facebook, les events, les stories, l’humour, le sérieux, l’important, le présentiel.. Il y a énormément de supports possibles, chacun ayant ses avantages et inconvénients.\nLa particularité par rapport aux autres assos, c’est que le PIC a des choses à dire presque tous les jours, de la première à la dernière semaine du semestre (et même un peu plus). Il est donc primordial de planifier les tâches et leurs supports bien en avance (on peut pas faire 5 posts facebook par jours sur tout le semestre par exemple, beaucoup d’infos seraient perdues). Sans oublier qu’il y a pas mal de travail à fournir sur les différents visuels, surtout si vous voulez faire les choses bien !\nLe maître mot est donc de bien hiérarchiser ! ",
				"tasks": [
					"Être respectueux & impressionnant en communiquant l'actualité du Pic",
					"Savoir hiérarchiser les informations pour ne pas qu’elles se perdent",
					"Être créatif dans la réalisations de support de communication (vidéo, image etc..) et dans l’innovation artistique du Pic (stickers, Tag etc..)",
					"Incarner et utiliser Ted Teddy Pic’Asso"
				]
			},
			{
				"name" : "ESTU Parking",
				"icon": <MusicNoteIcon className={classes.icon}/>,
				"description": "La communication du PIC, c’est son identité. C’est le visage que tout le monde voit sur les réseaux et dans les locaux, c’est son univers, son thème, ses couleurs, ses formes, son style, son humour. En tant que foyer de tous les UTCéens, il faut que chacun s’y sente bien intégré, des nouveaux aux vieux cons en passant par les plus excentriques ou les plus timidounets. La com du Pic’asso est un moyen puissant d’expression et il touche du monde, soyez rigoureux, respectueux mais surtout créatifs.\nSon but est de transmettre toutes les informations importantes en dosant un peu tout : les graphismes, les affiches, les posts facebook, les events, les stories, l’humour, le sérieux, l’important, le présentiel.. Il y a énormément de supports possibles, chacun ayant ses avantages et inconvénients.\nLa particularité par rapport aux autres assos, c’est que le PIC a des choses à dire presque tous les jours, de la première à la dernière semaine du semestre (et même un peu plus). Il est donc primordial de planifier les tâches et leurs supports bien en avance (on peut pas faire 5 posts facebook par jours sur tout le semestre par exemple, beaucoup d’infos seraient perdues). Sans oublier qu’il y a pas mal de travail à fournir sur les différents visuels, surtout si vous voulez faire les choses bien !\nLe maître mot est donc de bien hiérarchiser ! ",
				"tasks": [
					"Être respectueux & impressionnant en communiquant l'actualité du Pic",
					"Savoir hiérarchiser les informations pour ne pas qu’elles se perdent",
					"Être créatif dans la réalisations de support de communication (vidéo, image etc..) et dans l’innovation artistique du Pic (stickers, Tag etc..)",
					"Incarner et utiliser Ted Teddy Pic’Asso"
				]
			}
		]

		

    	return (
			<React.Fragment>
				<Grid container direction="row" justify="center" alignItems="center">
					<Typography variant="body1" className={classes.info_generale}>
						Clique sur les icônes pour en apprendre plus !
						<br/>
						Les candidatures sont à envoyer à l'adresse picasso@assos.utc.fr à la fin du semestre, suis les actualités du Pic sur Facebook pour être au courant des dates !
					</Typography>
				</Grid>
				<div className={classes.root}>
					<table className={classes.table}>
						<thead></thead>
						<tbody>
							<tr style={{margin: 10}}>
								<td className={classes.cell} onClick={() => this.seeBeMemberSection()}>
									<Grid container direction="row" justify="center" alignItems="center">
										<Typography variant="h6" className={classes.poste_title}>
											Etre membre du Pic'Asso
										</Typography>
									</Grid>
									<Grid container direction="row" justify="center" alignItems="center" style={{height: 100, color: '#B22132'}}>
										<GroupIcon className={classes.icon}/>
									</Grid>
								</td>
								{postes.map((poste, index) => (
									<td key={index} className={classes.cell} onClick={() => this.seePosteSection(index)}>
										<Grid container direction="row" justify="center" alignItems="center">
											<Typography variant="h6" className={classes.poste_title}>
												{poste.name}
											</Typography>
										</Grid>
										<Grid container direction="row" justify="center" alignItems="center" style={{height: 100, color: '#B22132'}}>
											{poste.icon}
										</Grid>
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
				{be_member_selected && 
					<React.Fragment>
						<Grid container direction="row" justify="center" alignItems="center">
							<Typography variant="h6" className={classes.description_title}>
								Etre membre du Pic'Asso
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="body1" className={classes.survey_description}>
								Être membre du Pic, c’est un véritable bonheur et énormément de libertées, 
								mais c’est aussi un travail au quotidien et il est plus simple de les effectuer 
								quand on a l’habitude de passer du temps dans le foyer. Avoir l’amour du Pic est 
								donc NÉ-CE-SSAIRE! 
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="h6" className={classes.description_title} style={{color: '#B22132'}}>
								! Semaine de rentrée !
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="body1" className={classes.survey_description}>
								Tu vas pouvoir durant plus d’une semaine décorer le pic, l’animer, le rendre beau, 
								cuisiner, servir puis le nettoyer, mais aussi team-builder, rencontrer ta nouvelle famille 
								et te faire à ton nouveau rôle dans le pic’asso durant la première semaine de rentrée. 
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="h6" className={classes.description_title} style={{color: '#B22132'}}>
								! Évènements du Pic !
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="body1" className={classes.survey_description}>
								Tout au long du semestre, le Pic’asso organisera plusieurs évènements et tu te devras 
								d’y participer, d’être présent et de donner de ton temps afin de les rendre plus magique 
								les uns que les autres! Estu parking, Pic Nic Electronique, Perms du Pic, Goûter de Pâques, 
								Associathon, Repas des permanenciers et bien d’autres ont besoin de toi pour exister! 
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="h6" className={classes.description_title} style={{color: '#B22132'}}>
								! Perms du Pic !
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="body1" className={classes.survey_description}>
								Tout au long du semestre, tu vas pouvoir tenir des astreintes durant lesquelles tu seras 
								référent au pic et tu guideras les autres étudiants afin que tout se passe bien durant 
								les superbes permanences au Pic’asso. 
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="h6" className={classes.description_title} style={{color: '#B22132'}}>
								! Remplir les Soft/Aider aux livraisons !
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="body1" className={classes.survey_description}>
							Le travail de toute une vie est de remplir de temps en temps le frigo de canettes, les rayons de 
							snacks sucrées/salées et aider aux livraisons soft/bière afin que chaques utcéens soient fiers 
							de leur épicerie étudiante &#60;3 
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="h6" className={classes.description_title} style={{color: '#B22132'}}>
								! S’occuper des locaux  !
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="body1" className={classes.survey_description}>
								En tant que membre du Pic, les locaux sont en quelques sortes ta deuxième maison. C’est pourquoi 
								tu dois pouvoir être disponible pour le ranger si des malotrus le salissent, mettent le désordre, 
								cassent des choses ou simplement pour répondre à toutes les demandes (emprunt de matériel, rallonges etc...). 
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="h6" className={classes.description_title} style={{color: '#B22132'}}>
								! Venir en Réunion !
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="body1" className={classes.survey_description}>
								Généralement le Dimanche, le Pic organise une réunion hebdomadaire où tu pourras discuter 
								avec l’équipe de tout et de rien, tu as le devoir d’être présent pour débriefer ton travail 
								et surtout proposer des idées innovantes afin de rendre le pic plus beau et original que jamais!  
							</Typography>
						</Grid>
						<Grid container direction="row" justify="center" alignItems="center">
							<Typography variant="h6" className={classes.description_title}>
								Passer le meilleur semestre de sa vie ! <span style={{fontSize: 12}}>(Parce que le Pic, c’est la vie, vive le pic)</span>
							</Typography>
						</Grid>
						<Grid container direction="row" justify="center" alignItems="center">
							<Button 
								variant="contained" 
								className={classes.btn}
								onClick={() => this.unselect()}
							>
								Masquer
							</Button>
						</Grid>
					</React.Fragment>
				}
				{poste_selected && 
					<React.Fragment>
						<Grid container direction="row" justify="center" alignItems="center">
							<Typography variant="h6" className={classes.description_title}>
								{postes[poste_index].name}
							</Typography>
						</Grid>
						<Grid container direction="row">
							<Typography variant="body1" className={classes.survey_description}>
								{postes[poste_index].description}
							</Typography>
						</Grid>
						<Grid container direction="row" justify="center" alignItems="center">
							<Typography variant="h6" className={classes.description_title} style={{color: '#B22132'}}>
								! Important !
							</Typography>
						</Grid>
						<Grid container direction="row">
							<ul>
								{postes[poste_index].tasks.map((task, index) => (
									<li>
										<Typography variant="body1" className={classes.survey_description}>
											{task}
										</Typography>
									</li>
								))}
							</ul>
						</Grid>
						<Grid container direction="row" justify="center" alignItems="center">
							<Button 
								variant="contained" 
								className={classes.btn}
								onClick={() => this.unselect()}
							>
								Masquer
							</Button>
						</Grid>
					</React.Fragment>
				}
			</React.Fragment>
    	);
  	}
}

const styles = theme => ({
	root: {
		width: '100%',
		overflowX: 'auto'
	},
	table : {
		marginBottom: 10,
		borderCollapse: 'collapse',
		width: '90%',
		marginRight: '5%',
		marginLeft: '5%',
	},
	leftTitleCell: {
		fontSize: 16,
		width: '10%',
		minWidth: 50,
		fontWeight: 500,
	},
	topTitleCell: {
		width: '15%',
		paddingBottom: 10,
		fontSize: 16,
		fontWeight: 500,
		textAlign: 'center',
		margin: 0,
		minWidth: 100,
	},
	poste_title : {
		display: 'inline-block',
		height: 60,
		overflow: 'hidden !important',
		textOverflow: 'ellipsis',
		fontWeight: 400,
	},
	description_title: {
		marginTop:20,
		fontWeight: 400,
	},
	survey_description : {
		padding: 5,
		marginTop: 5,
		fontWeight: 200,
	},
	info_generale: {
		padding: 5,
		marginTop: -20,
		fontWeight: 200,
		textAlign: 'center',
		fontSize: 14,
		marginBottom: 20
	},
	cell: {
		maxWidth: 180,
		width: '30%',
		padding: 5,
		textAlign: 'center',
		margin: 0,
		color: 'white',
		fontWeight: 300,
		minWidth: 150,
	},
    survey_img : {
        height: 100,
		borderRadius: 5,
		marginBottom: 10,
		maxWidth: '100%',
        objectFit: 'contain'
	},
	btn : {
		margin: 10
	},
	icon : {
		height: '100%',
		width: '100%'
	}
});

export default withStyles (styles) (FichesPostes)
