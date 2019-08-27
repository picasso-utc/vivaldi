import React from "react";
import { withStyles } from '@material-ui/core/styles'

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


    	return (
			<React.Fragment>
				{'softs' in articles && (
					articles.softs.map((soft, index) => (
						<p key={index}>{soft.name} {soft.price}</p>
					))
				)}

				{'bieresBouteille' in articles && (
					articles.bieresBouteille.map((biereBouteille, index) => (
						<p key={index}>{biereBouteille.name} {biereBouteille.price}</p>
					))
				)}

				{'snacksSucres' in articles && (
					articles.snacksSucres.map((snackSucre, index) => (
						<p key={index}>{snackSucre.name} {snackSucre.price}</p>
					))
				)}

				{'snacksSales' in articles && (
					articles.snacksSales.map((snackSale, index) => (
						<p key={index}>{snackSale.name} {snackSale.price}</p>
					))
				)}

				{'glace' in articles && (
					articles.glace.map((g, index) => (
						<p key={index}>{g.name} {g.price}</p>
					))
				)}

				{'petitDej' in articles && (
					articles.petitDej.map((p, index) => (
						<p key={index}>{p.name} {p.price}</p>
					))
				)}

				{'pampryls' in articles && (
					articles.pampryls.map((pampryl, index) => (
						<p key={index}>{pampryl.name} {pampryl.price}</p>
					))
				)}

				{'bieresPression' in articles && (
					articles.bieresPression.map((bierePression, index) => (
						<p key={index}>{bierePression.name} {bierePression.price}</p>
					))
				)}

			</React.Fragment>
    	);
  	}
}

const styles = theme => ({

});

export default withStyles (styles) (PriceDisplayer)
