import React from "react";
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';

import { ajaxGet } from '../../utils/Ajax';

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


    	return (
			<React.Fragment>
				<Grid container direction="row">
					<Grid item xs={3}>
						<h2>Softs</h2>
						<table className={classes.table}>
							<tbody>
								{'softs' in articles && (
									articles.softs.map((soft, index) => (
										<tr key={index}>
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
					<Grid item xs={3}>
						<h2>Pampryls</h2>
						<table className={classes.table}>
							<tbody>
								{'pampryls' in articles && (
									articles.pampryls.map((pampryl, index) => (
										<tr key={index}>
											<td className={classes.article_name}>
												{pampryl.name}
											</td>
											<td className={classes.article_price}>
												{(pampryl.price/100).toFixed(2)} €
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</Grid>
					<Grid item xs={3}>
						<h2>Bières Bouteilles</h2>
						<table className={classes.table}>
							<tbody>
								{'bieresBouteille' in articles && (
									articles.bieresBouteille.map((biereBouteille, index) => (
										<tr key={index}>
											<td className={classes.article_name}>
												{biereBouteille.name}
											</td>
											<td className={classes.article_price}>
												{(biereBouteille.price/100).toFixed(2)} €
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</Grid>
					<Grid item xs={3}>
						<h2>Bières Pression</h2>
						<table className={classes.table}>
							<tbody>
								{'bieresPression' in articles && (
									articles.bieresPression.map((bierePression, index) => (
										<tr key={index}>
											<td className={classes.article_name}>
												{bierePression.name}
											</td>
											<td className={classes.article_price}>
												{(bierePression.price/100).toFixed(2)} €
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</Grid>
				</Grid>
				<Grid container direction="row">
					<Grid item xs={3}>
						<h2>Snacks Salés</h2>
						<table className={classes.table}>
							<tbody>
								{'snacksSales' in articles && (
									articles.snacksSales.map((snackSale, index) => (
										<tr key={index}>
											<td className={classes.article_name}>
												{snackSale.name}
											</td>
											<td className={classes.article_price}>
												{(snackSale.price/100).toFixed(2)} €
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</Grid>
					<Grid item xs={3}>
						<h2>Snacks Sucrés</h2>
						<table className={classes.table}>
							<tbody>
								{'snacksSucres' in articles && (
									articles.snacksSucres.map((snackSucre, index) => (
										<tr key={index}>
											<td className={classes.article_name}>
												{snackSucre.name}
											</td>
											<td className={classes.article_price}>
												{(snackSucre.price/100).toFixed(2)} €
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</Grid>
					<Grid item xs={3}>
						<h2>P'tit Dej</h2>
						<table className={classes.table}>
							<tbody>
								{'petitDej' in articles && (
									articles.petitDej.map((p, index) => (
										<tr key={index}>
											<td className={classes.article_name}>
												{p.name}
											</td>
											<td className={classes.article_price}>
												{(p.price/100).toFixed(2)} €
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</Grid>
					<Grid item xs={3}>
						<h2>Glace</h2>
						<table className={classes.table}>
							<tbody>
								{'glace' in articles && (
									articles.glace.map((g, index) => (
										<tr key={index}>
											<td className={classes.article_name}>
												{g.name}
											</td>
											<td className={classes.article_price}>
												{(g.price/100).toFixed(2)} €
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</Grid>
				</Grid>
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
});

export default withStyles (styles) (PriceDisplayer)
