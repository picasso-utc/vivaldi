import React from 'react';
import axios from 'axios';
import { func } from 'prop-types';

const funFact = ["Josselin prend son petit déjeuner tout les matins au Pic. ", "pic <3"] 
const BACKEND_PATH = "test"

class LeSaviezVous extends React.Component {

    constructor(props) {
			super(props);
			this.state = {
				active: false,
				text: "le saviez vous",
				fading: false,
			};
			this.funFact = funFact
	}
	
	componentDidMount() {
		axios.get(BACKEND_PATH)
			.then(res => {this.funFact = res.data})
			.catch(err => { throw err })

		this.setState({
			text : this.funFact[Math.floor(Math.random()* 2)] 
		})
		this.timer = setInterval(() => this.updateText(), 7000)
	}
	  
	componentWillUnmount() {
		clearInterval(this.timer)
		clearTimeout(this.delay)
	}
	  
	updateText() {
		this.setState({fading: true})
		this.delay = setTimeout( () => this.setState({
			text: this.funFact[Math.floor(Math.random()* 2)],
			fading: false
		}),
		2000)
	}
    
	render() {
		return (
			<section id ="LeSaviezVous" className ="LeSaviezVous" style ={style.leSaviezVous}>
                <h1 style={style.sectionTitle}>
					Le saviez vous ?
				</h1>
				<div style ={style.sliderContainer} >
					<p style ={this.state.fading ? style.textFading : style.textNormal}>" {this.state.text} "</p>
				</div>
      		</section>
		);
	}
}


export const style = {
	leSaviezVous: {
		height: window.innerHeight,
		paddingTop: 64,
		display: "block",
	},
	sectionTitle: {
		fontSize: 60,
		fontFamily: "Roboto",
		textAlign: "center",
		display: "block",
		marginBottom: "20px",
	},
	sliderContainer: {
		padding: "1em",
		height: "80%",
		border: "red 2px solid",
		fontSize: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	textNormal: {
		width: "100%",
		fontSize: 50,
		fontFamily: "Sans-serif",
		textAlign: "center",
	},
	textFading: {
		width: "100%",
		fontSize: 50,
		fontFamily: "Sans-serif",
		textAlign: "center",
		visibility: "visible",
		opacity: 0,
		transition: "opacity 2s linear",
	},
}

export default LeSaviezVous;