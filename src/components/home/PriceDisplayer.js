import React from "react";
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import { ajaxGet } from '../../utils/Ajax';
import Hidden from '@material-ui/core/Hidden';


class PriceDisplayer extends React.Component {
  

	constructor(props) {
		super(props);
		this.state = {
			articles : {}
		}
	}
	
	componentDidMount(){
		this.loadArticles();
	}

	loadArticles(){
        ajaxGet('payutc/public/articles').then(res => {
            this.setState({articles: res.data});
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false})
        })
    }

  	render() {

		const { articles } = this.state;

		const { classes } = this.props;


		const pic_articles = [
			{type: 'boisons', content : [
				{name: 'Softs', code: 'softs'},
				{name: 'Pampryls', code: 'pampryls'},
				{name: 'Bières Bouteilles', code: 'bieresBouteille'},
				{name: 'Bières Pression', code: 'bieresPression'},
			]},
			{type: 'snacks', content : [
				{name: 'Snacks Salés', code: 'snacksSales'},
				{name: 'Snacks Sucrés', code: 'snacksSucres'},
				{name: 'P\'tit Dej', code: 'petitDej'},
				{name: 'Glaces', code: 'glace'},
			]}
		]


    	return (
			<React.Fragment>
				{pic_articles.map(({type, content}, index) => (
					<div key={index}>
						<Hidden mdUp implementation="css">
							<Grid container direction="row" className={classes.responsive_displayer}>
								{content.map((boisson, index) => (
									<Grid item key={index} className={classes.responsive_displayer_item}>
										<h2>{boisson.name}</h2>
										<table className={classes.table}>
											<tbody>
												{boisson.code in articles && (
													articles[boisson.code].map((soft, article_index) => (
														<tr key={article_index}>
															<td className={classes.article_name}>
																{soft.name}
															</td>
															<td className={classes.article_price}>
																{(soft.price/100).toFixed(2)}€
															</td>
														</tr>
													))
												)}
											</tbody>
										</table>
									</Grid>
								))}
							</Grid>
						</Hidden>
						<Hidden smDown implementation="css">
							<Grid container direction="row">
								{content.map((boisson, index) => (
									<Grid item key={index} md={3}>
										<h2>{boisson.name}</h2>
										<table className={classes.table}>
											<tbody>
												{boisson.code in articles && (
													articles[boisson.code].map((soft, article_index) => (
														<tr key={article_index}>
															<td className={classes.article_name}>
																{soft.name}
															</td>
															<td className={classes.article_price}>
																{(soft.price/100).toFixed(2)}€
															</td>
														</tr>
													))
												)}
											</tbody>
										</table>
									</Grid>
								))}
							</Grid>
						</Hidden>
					</div>
				))}
			</React.Fragment>
			
    	);
  	}
}

const styles = theme => ({
	table : {
		borderLeft: '1.5px solid #B22132',
	},
	article_name : {
		paddingLeft: 5,
		paddingRight: 5,
	},
	article_price : {
		paddingRight: 15,
		paddingLeft: 5,
		whiteSpace: 'nowrap',
	},
	responsive_displayer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	},
	responsive_displayer_item: {
		marginLeft: 15,
	},
});

export default withStyles (styles) (PriceDisplayer)
