import React from "react";
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';

class Trombinoscope extends React.Component {
  

	constructor(props) {
		super(props);
    }

  	render() {

		const { classes } = this.props;

		const pic_members = [
			{
				nom: 'Ayman Lamdasni',
				poste: 'Co-Président',
			},
			{
				nom: 'Alix Auvin',
				poste: 'Co-Président',
			},
			{
				nom: 'Pauline Mandon',
				poste: 'Trésorière',
			},
			{
				nom: 'Léo Tavernier',
				poste: 'Vice-Trésorier',
			},
			{
				nom: 'Mathilde Petit',
				poste: 'Resp Anim'
			},
			{
				nom: 'Maliana Hoatau',
				poste: 'Team Anim',
			},
			{
				nom: 'Nicolas Théron',
				poste: 'Team Anim',
			},
			{
				nom: 'Constant Dassonville',
				poste: 'Team Anim',
			},
			{
				nom: 'Oubine Perrin',
				poste: 'Team Anim',
			},
			{
				nom: 'Félix Roulleaux Dugage',
				poste: 'Resp Com'
			},
			{
				nom: 'Reda Sarehane',
				poste: 'Team Com',
			},
			{
				nom: 'Florestan Biaux',
				poste: 'Team Com',
			},
			{
				nom: 'Ariane Lozon',
				poste: 'Team Locaux',
			},
			{
				nom: 'Léo Romanet',
				poste: 'Team Locaux',
			},
			{
				nom: 'Yanis Aboura',
				poste: 'Team Locaux',
			},
			{
				nom: 'Alexandre Brasseur',
				poste: 'Appro Bières',
			},
			{
				nom: 'Jessica Guilbaud',
				poste: 'Appro Softs',
			},
			{
				nom: 'Rémy Dudzik',
				poste: 'Appro Softs',
			},
			{
				nom: 'Corentin Martin',
				poste: 'Appro Softs',
			},
			{
				nom: 'Josselin Pennors',
				poste: 'Resp Info',
			},
			{
				nom: 'Capucine Martin',
				poste: 'Team Info',
			},
		]
    	return (
			<React.Fragment>
				<Grid container	direction="row">
					{pic_members.map((member, index) => (
						<Grid xs={4} sm={3} item className={classes.card} key={index}>
							<div className={classes.card_content}>
								<div className={classes.card_img}>
									<img src="/images/axel.png" className={classes.img}/>
								</div>
								<div className={classes.card_description}>
									<div style={{alignItems:'center'}}>
										<h3>{member.nom}</h3>
										<h5>{member.poste}</h5>
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
	card_img : {
		// margin: 20,
		// position: 'relative',
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
