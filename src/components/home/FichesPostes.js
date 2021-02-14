import React from "react";
import { withStyles } from '@material-ui/core/styles'
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
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SchoolIcon from '@material-ui/icons/School';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';

class FichesPostes extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			poste_selected: false,
			poste_index: '',
			be_member_selected: false
		}
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
		window.location.hash = null;
		window.location.hash = "#postes";
	}

  	render() {

		const { poste_selected, be_member_selected, poste_index } = this.state;

		const { classes } = this.props;

		const postes = [
			{
				"name" : "Présidence",
				"icon": <SchoolIcon className={classes.icon}/>,
				"description": "Le rôle de la présidence est basé sur de la gestion externe et interne. Il faut tout d’abord permettre la communication entre "
				+ "les associations et le Pic’asso ainsi que s’assurer d’une bonne relation avec l’administration (#maaaail). C’est grâce à cela que le Pic’Asso "
				+ "peut être ouvert tout au long du semestre et proposer de nombreux évènements. Concrètement il faut s’occuper de dialoguer avec l’administration "
				+ "pour tout demande d’un côté et répondre aux divers mails des associations, des étudiants, etc... de l’autre. \nLa présidence a également pour mission "
				+ "le choix de son équipe pour le semestre et de la gérer afin que tout le monde soit à fond et kiff son expérience dans l’asso. Il faut de plus animer "
				+ "les réunions hebdomadaires du dimanche après midi.\nEn conclusion être à ce poste c’est se porter garant du bon fonctionnement du Pic’Asso à tous les niveaux.",
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
				"description": "La trésorerie demande avant tout de la rigueur, de l’organisation et de la régularité. "
					+ "Toutes les semaines, des nouvelles factures sont à enregistrer dans le logiciel Picsous et il faut rembourser les personnes faisant les courses pour les permanences. "
					+ "Il faut également gérer tous les prestataires des softs et des bières. "
					+ "Il faut faire chaque semaine les virements nécessaires et répertorier toutes les factures afin d’avoir un suivi détaillé des dépenses et achats du Pic, demandés par notre comptable.",
				"tasks": [
					"Éviter la banqueroute",
					"Rembourser les perms (enregistrement factures + virements)",
					"Veiller à subvenir aux besoins du Pic : paiement des achats des différentes team + factures",
					"Déclaration des impôts / Communication avec la comptable"
				]
			},
			{
				"name" : "Communication",
				"icon": <CameraAltIcon className={classes.icon}/>,
				"description": "La communication du Pic, c'est son identité. C'est le visage que tout le monde voit sur les réseaux et dans les locaux, c'est son univers, son "
				+ "thème, ses couleurs, ses formes, son style, son humour (ah oui oui). En tant que foyer de tous les UTCéens, il faut que chacun s'y sente bien intégré, "
				+ "des nouveaux aux vieux cons en passant par les plus excentriques ou les plus timidounets. La com du Pic'Asso est un moyen puissant d'expression et il touche "
				+ "du monde, soyez rigoureux, respectueux mais surtout créatifs. "
				+ "Son but est de transmettre toutes les informations importantes en dosant un peu tout : les graphismes, les affiches, les posts facebook, les events, les stories, "
				+ "l'humour, le sérieux, l'important, le présentiel. Il y a énormément de supports possibles, chacun ayant ses avantages et inconvénients. "
				+ "La particularité par rapport aux autres assos, c'est que le Pic a des choses à dire presque tous les jours, de la première à la dernière semaine du semestre "
				+ "(et même un peu plus). Il est donc primordial de planifier les tâches et leurs supports bien en avance (on peut pas faire 5 posts Facebook par jours sur tout "
				+ "le semestre par exemple, beaucoup d'infos seraient perdues). Sans oublier qu'il y a pas mal de travail à fournir sur les différents visuels, surtout si vous voulez "
				+ "faire les choses bien ! Le maître mot est donc de bien hiérarchiser !",
				"tasks": [
					"Etre respectueux de tous les Utcéens, de l’admin, des autres assos dans toutes les formes de communications",
					"Incarner et utiliser Ted Teddy Picasso",
					"Être rigoureux sur l’organisation de la communication",
					"Régaler toute la Team du Pic en proposant de la Com de qualité",
					"Être créatif dans la réalisation de supports de communication (vidéo, image etc..) et dans l'innovation artistique du Pic (stickers, Tag etc..)",
					"Savoir hiérarchiser les informations pour ne pas qu'elles se perdent, et surtout pour en transmettre un maximum sans effort",
					"Et surtout, se faire plaisir en essayant d’apporter un max d’humour et de légèreté, le Pic c’est quand même un peu notre maison, on doit s’y sentir bien"
				]
			},
			{
				"name" : "Animation",
				"icon": <SportsKabaddiIcon className={classes.icon}/>,
				"description": "La team anim c'est la bonne humeur, la bonne ambiance, avoir plein d'idées, laisser libre court à son imagination mais également organiser, planifier et gérer pas mal de petites choses. "
				+ "Dès le début du semestre ça démarre fort avec la semaine de rentrée qu'il faut organiser une fois le thème choisi par la team : il faut gérer la déco, les anims, la bouffe, le planning, etc... "
				+ "On s’occupe également de laisser la possibilité à des groupes de potes et à des assos de tenir des permanences au Pic. Pour cela c’est à nous de définir le planning général du semestre en fonction "
				+ "des différentes contraintes et avec pour seul objectif de régaler un maximum de monde ! On se charge après de s’assurer qu’il soit tenu. "
				+ "Ensuite, tout au long du semestre on organise tous les événements du Pic à savoir Pic nic electro, Associathon, les tournois, le gouter de Pacques/Noel, la perm du Pic, le RDP et "
				+ "les team building !! On a également la possibilité de créer plein de nouveaux événements pour ambiancer notre foyer préféré !",
				"tasks": [
					"Organiser la semaine de rentrée",
					"Gérer le planning des perms du semestre",
					"Organiser tous les évènements du Pic",
					"Organiser les TB pour que tout le monde s'aime"
				]
			},
			{
				"name" : "Informatique",
				"icon": <ImportantDevicesIcon className={classes.icon}/>,
				"description": "La team info du Pic a plusieurs missions distinctes. Tu devras tout d’abord au début du semestre former l’équipe aux outils informatiques du Pic "
				+ "(après t’être toi même formé(e) bien sûr). Bien que paraissant simple, cette mission est assez complète et dense. Tu verras que tu pourras aussi avoir régulièrement un rôle "
				+ "de SAV/support tout au long du semestre dès qu’un membre de la team aura une question. C’est d’ailleurs toi qui aura la main mise sur Weezeevent #Payutc."
				+ "Les outils ont été codés du mieux possible mais il arrive qu’il y ait des soucis. Tout le monde se tournera vers toi pour que tu règles les soucis, t’en fais "
				+ "pas il y a une fat passation. Enfin, la partie la plus intéressante ! Coder des applis toujours plus folles, pour les événements tels que le duel des brasseurs, la "
				+ "perm Wall Street ou pour ajouter des fonctionnalités au site comme les sondages, les fiches de postes, … Tout est presque uniforme en terme de technologie au Pic, "
				+ "on utilise Django et Reactjs. Le poste est assez libre, à toi d'y laisser ta patte. Le tout c'est de prendre ce rôle à fond dès le début !",
				"tasks": [
					"Se former et former la team",
					"Etre à l’écoute des questions, débugger quand c'est nécessaire",
					"Développer de nouvelles folies pour régaler les Utcéens (ou juste toi si tout le monde s'en fout)",
					"Se tenir prêt pour les gros rushs"
				]
			},
			{
				"name" : "Appro-Soft",
				"icon": <FastfoodIcon className={classes.icon}/>,
				"description": "Être ApproSoft, ça prend pas mal de temps... mais si vous vous organisez bien, pas de soucis à se faire! "
				+ "Concrètement, le poste consiste à gérer les différents fournisseurs du Pic’Asso : Leclerc pour les courses, France Boissons pour les softs, "
				+ "JMA Distribution pour le frais, le Grenier à Sel pour les fruits, la Brûlerie pour le café/thé, la Boulangerie pour les petits-dejs de la régalade... "
				+ "Il y en a une petite dizaine. Ça demande de l’organisation car il faut gérer les stocks et le réapprovisionnement, et qu’il faut être capable de prévoir "
				+ "les quantités à commander. Mais on s’habitue vite, et tu finis par connaître les quantités “idéales” à acheter par semaine. "
				+ "En étant ApproSoft, tu peux aussi innover avec les produits et en chercher des nouveaux à proposer. Donc il y a de quoi de faire plaisir! "
				+"Et n’oublie pas : le Pic n’est pas une épicerie !",
				"tasks": [
					"Être organisé(e), ça aide ! Et avoir une voiture, c’est un must",
					"Chercher de nouveaux produits",
					"Gérer les fournisseurs, les commandes & les stocks",
					"Le Pic n’est pas une cantine"
				]
			},
			{
				"name" : "Appro-Bière",
				"icon": <LocalBarIcon className={classes.icon}/>,
				"description": "L’appro bière a un rôle important au Pic. Il s’occupe de l’approvisionnement des bières tout au long du semestre. C’est un travail de chaque instant qui "
				+ "demande de l'investissement, de la motivation et de la passion. Concernant le côté approvisionnement, il faut gérer les stocks afin d’éviter les ruptures mais aussi "
				+ "les surplus, tenter de prédire la consommation au mieux, calculer les prix et estimer les pertes. Selon ton emploi du temps, tu dois participer au livraison avec toute "
				+ "l’équipe et mettre les produits au frais tout en gérant les équipements qui sont parfois capricieux. JP (Jean-Paul Fontaine de la Cauette à Bière, notre fournisseur adoré) "
				+ "est toujours d’équerre pour t’aider en cas de problème. Concernant la partie bière, faire découvrir de nouveaux produits aux amateurs utcéens est la meilleure partie. Il faut être "
				+ "constamment à la recherche des meilleurs offres et dénicher les meilleurs produits. Il faut avoir des connaissances de base en bières, être curieux et bien dialoguer avec les "
				+ "commerciaux et la Cauette. Une cinquantaine de professionnels sont en relation directe avec l’appro bière, il faut les recevoir, discuter et négocier avec eux, car c’est toi "
				+ "l’image du Pic pour eux. Appro bière au Pic c’est de la motivation, de la curiosité, de l'enthousiasme, de l’endurance et tout ça sur un semestre entier non-stop.",
				"tasks": [
					"Approvisionner le Pic chaque semaine et gérer les stocks en essayant de prévoir la consommation",
					"Apporter de nouvelles bières de qualité pour régaler les amateurs",
					"Dialoguer avec les commerciaux pour obtenir des exclusivités et les meilleurs prix",
					"Organiser la semaine de dégustations et le duel des brasseurs",
					"Surprendre tout le monde avec des projets inédits (bière du Pic’, carnet de dégustation, visite de brasserie, bières exclusives…) "
				]
			},
			{
				"name" : "Locaux",
				"icon": <BuildIcon className={classes.icon}/>,
				"description": "La team locaux regroupe trois aspects : l’entretien, Bob et le DD. Le Pic accueille chaque jour quelques centaines de personnes qui "
				+ "viennent chiller, manger, boire une bière, danser, ... Due à cette forte affluence, le Pic se salit et s’use (très) vite. Son entretien, que ce "
				+ "soit ménager ou au niveau des différents équipements, requiert ainsi du temps et une vigilance permanente. Il faut donc maintenir les locaux du Pic "
				+ "propre et en bon état afin que tout le monde s’y sente bien ! L’objectif est avant tout d’impliquer et de responsabiliser chacun concernant l’entretien "
				+ "du foyer et de s’assurer que celui-ci est bien réalisé. Concernant l’aspect Bob, c’est la boite à outils du Picasso. La team locaux est ainsi chargée des "
				+ "réparations et des améliorations au sein du Pic #ingéniosité #atelierTN04. Pour finir, l’aspect DD consiste principalement à faire en sorte que le Pic s’ancre "
				+ "dans un effort durable. Cela passe par de multiples initiatives telles que l’amélioration du tri des déchets dans le foyer, la mise en place du recyclage des "
				+ "mégots de cigarette, l’évaluation des émissions carbones. Il reste encore un tas de choses à améliorer !",
				"tasks": [
					"Superviser, être le garant de l’entretien du Pic (même si c’est le rôle de tous)",
					"Gérer les stocks de produits, matériels d’entretien, outils",
					"Gestion de l’équipement du Pic (micro-ondes, vaisselle, filtres à eau, baby, billard ...) et réparations",
					"Superviser et créer des projets TN04 innovants",
					"Soutenir le DD au sein du Pic et auprès des Utcéens"
				]
			},
			{
				"name" : "ESTU Parking",
				"icon": <MusicNoteIcon className={classes.icon}/>,
				"description": "Le poste consiste à organiser l’ESTU Parking de A à Z, notamment. Il faut être rigoureux et bien organisé. Ça demande pas mal de boulot "
				+ "(#teamSolo) mais une fois l'ESTU terminée tu n’as presque plus rien à faire ;) Il faut commencer par choisir la brasserie qui sera mise à l’honneur et "
				+ "démarcher différentes assos pour animer la soirée. Tu devras échanger avec les différents corps de l’administration UTC, prévoir les moyens de secours "
				+ "qui seront mis en oeuvre et organiser la communication de l’event en lien avec la team com. Le jour J tu devras gérer le montage avec toute la team et faire "
				+ "en sorte que tout se passe bien pendant la soirée !",
				"tasks": [
					"Choix de la brasserie/bières de l’estu",
					"Choix des artistes",
					"Organisation des aspects logistiques de la soirée",
					"Coordination avec les assos participants à la soirée"
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
									<Grid container direction="row" justify="center" alignItems="center" style={{height: 100, color: '#F64618'}}>
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
										<Grid container direction="row" justify="center" alignItems="center" style={{height: 100, color: '#F64618'}}>
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
								Tu vas pouvoir durant plus d’une semaine décorer le Pic, l’animer, le rendre beau,
								cuisiner, servir puis le nettoyer, mais aussi team-builder, rencontrer ta nouvelle famille
								et te faire à ton nouveau rôle dans le Pic’asso.
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
								les uns que les autres! ESTU parking, Pic Nic Electronique, Perms du Pic, Goûter de Pâques,
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
								Généralement le dimanche, le Pic organise une réunion hebdomadaire où tu pourras discuter
								avec l’équipe de tout et de rien, tu as le devoir d’être présent pour débriefer ton travail
								et surtout proposer des idées innovantes afin de rendre le Pic plus beau et original que jamais!
							</Typography>
						</Grid>
						<Grid container direction="row" justify="center" alignItems="center">
							<Typography variant="h6" className={classes.description_title}>
								Passer le meilleur semestre de sa vie ! <span style={{fontSize: 12}}>(Parce que le Pic, c’est la vie, vive le Pic)</span>
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
		color: '#F64618',
		fontWeight: 300,
		minWidth: 150,
		cursor: 'pointer'
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
