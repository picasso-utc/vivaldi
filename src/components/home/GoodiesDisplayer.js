import React from "react";
import { withStyles } from '@material-ui/core/styles'

import { ajaxGet } from '../../utils/Ajax';

class GoodiesDisplayer extends React.Component {
  

	constructor(props) {
		super(props);
		this.state = {
			winners: []
		}
	}

	
	componentDidMount(){
		this.loadGoodiesWinners();
	}

	
	loadGoodiesWinners(){
        ajaxGet('payutc/goodies').then(res => {
            this.setState({winners: res.data.winners});
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false})
        })
    }

  	render() {

		const { winners } = this.state;

    	return (
			<React.Fragment>
				{winners.length == 0 ? (
					<p>Pas de goodies</p>
				):(
					winners.map((winner, index) => (
						<p key={index}>{winner.winner}</p>
					))
				)}
			</React.Fragment>
    	);
  	}
}

const styles = theme => ({

});

export default withStyles (styles) (GoodiesDisplayer)
