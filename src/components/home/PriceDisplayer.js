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
		setTimeout(() => {
			const index_drinks =  document.getElementById("index_drinks")
			index_drinks.scrollBy({ left: 60, behavior: 'smooth'})
			const index_snacks =  document.getElementById("index_snacks")
			index_snacks.scrollBy({ left: 60, behavior: 'smooth'})	
		}, 3000)
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
			{type: 'boissons', content : [
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
					<div key={index} className={classes.root} id={type==="boissons" ? "index_drinks" : "index_snacks"}>
						<Hidden mdUp implementation="css">
							<Grid container direction="row" className={classes.responsive_displayer}>
								{content.map((boisson, index) => (
									<Grid item key={index} className={classes.responsive_displayer_item}>
										<h3 className={classes.article_type}>{boisson.name}</h3>
										<table className={classes.table}>
											<tbody>
												{boisson.code in articles && (
													articles[boisson.code].map((soft, article_index) => (
														<tr key={article_index} className={classes.article_type}>
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
										<h3 className={classes.article_type}>{boisson.name}</h3>
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
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	article_type: {
		minWidth: 150,
	},
	article_name : {
		paddingLeft: 10,
		paddingRight: 5,
		fontWeight: 200,
	},
	article_price : {
		paddingRight: 15,
		paddingLeft: 5,
		whiteSpace: 'nowrap',
		fontWeight: 300,
	},
	responsive_displayer: {
		display: 'flex',
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
		marginBottom: 10,
	},
	responsive_displayer_item: {
		marginLeft: 15,
	},
});

export default withStyles (styles) (PriceDisplayer)
