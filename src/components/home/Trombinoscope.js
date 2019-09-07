import React from "react";
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import { asset_url } from '../../utils/Config';

class Trombinoscope extends React.Component {
  
  	render() {

		const { classes } = this.props;

		const pic_members = [
			{
				nom: 'Ayman Lamdasni',
				poste: 'Co-Président',
				image: '/images/ayman.png',
			},
			{
				nom: 'Alix Auvin',
				poste: 'Co-Président',
				image: '/images/alix.png',
			},
			{
				nom: 'Pauline Mandon',
				poste: 'Trésorière',
				image: '/images/pauline.png',
			},
			{
				nom: 'Léo Tavernier',
				poste: 'Vice-Trésorier',
				image: '/images/leo.png',
			},
			{
				nom: 'Mathilde Petit',
				poste: 'Resp Anim',
				image: '/images/mathilde.png',
			},
			{
				nom: 'Maliana Hoatau',
				poste: 'Team Anim',
				image: '/images/ayman.png',
			},
			{
				nom: 'Nicolas Théron',
				poste: 'Team Anim',
				image: '/images/nicolas.png',
			},
			{
				nom: 'Constant Dassonville',
				poste: 'Team Anim',
				image: '/images/constant.png',
			},
			{
				nom: 'Oubine Perrin',
				poste: 'Team Anim',
				image: '/images/oubine.png',
			},
			{
				nom: 'Félix Roulleaux Dugage',
				poste: 'Resp Com',
				image: '/images/ayman.png',
			},
			{
				nom: 'Reda Sarehane',
				poste: 'Team Com',
				image: '/images/reda.png',
			},
			{
				nom: 'Florestan Biaux',
				poste: 'Team Com',
				image: '/images/ayman.png',
			},
			{
				nom: 'Ariane Lozon',
				poste: 'Team Locaux',
				image: '/images/ariane.png',
			},
			{
				nom: 'Léo Romanet',
				poste: 'Team Locaux',
				image: '/images/ayman.png',
			},
			{
				nom: 'Yanis Aboura',
				poste: 'Team Locaux',
				image: '/images/yanis.jpg',
			},
			{
				nom: 'Alexandre Brasseur',
				poste: 'Appro Bières',
				image: '/images/brass.png',
			},
			{
				nom: 'Jessica Guilbaud',
				poste: 'Appro Softs',
				image: '/images/jessica.png',
			},
			{
				nom: 'Rémy Dudzik',
				poste: 'Appro Softs',
				image: '/images/ayman.png',
			},
			{
				nom: 'Corentin Martin',
				poste: 'Appro Softs',
				image: '/images/ayman.png',
			},
			{
				nom: 'Josselin Pennors',
				poste: 'Resp Info',
				image: '/images/josselin.png',
			},
			{
				nom: 'Capucine Martin',
				poste: 'Team Info',
				image: '/images/ayman.png',
			},
		]
    	return (
			<React.Fragment>
				<Grid container	direction="row">
					{pic_members.map((member, index) => (
						<Grid xs={4} sm={3} item className={classes.card} key={index}>
							<div className={classes.card_content}>
								<div className={classes.card_img}>
									<img src={asset_url(member.image)} className={classes.img}/>
								</div>
								<div className={classes.card_description}>
									<div style={{alignItems:'center'}}>
										<h2>{member.nom}</h2>
										<h3>{member.poste}</h3>
									</div>
								</div>
							</div>
						</Grid>
					))}
				</Grid>

			</React.Fragment>
    	);
  	}
}

const styles = theme => ({
	card: {
		padding: '0 .75rem',
	},
	card_content: {
		position: 'relative',
		margin: '.5rem 0 1rem 0',
		borderRadius: 2,
		boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
	},
	img: {
		width: '100%',
		borderRadius: '2px 2px 0 0',
		display: 'block',
		left: 0,
		right: 0,
		botoom: 0,
		top: 0
	},
	card_description : {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		opacity: 0,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		padding: '0px 10px',
		borderRadius: '2px 2px 0 0',
		transition: 'all 0.5s ease 0s',

		'&:hover': {
			opacity: "1",
			backgroundColor: 'rgba(178, 33, 50, 0.75)',
		},
	}
});

export default withStyles (styles) (Trombinoscope)
