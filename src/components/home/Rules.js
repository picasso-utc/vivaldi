import React from 'react';

export const YoutubeIframe =  <iframe 
	width = "100%"
	height = "100%"
	src="https://www.youtube.com/embed/b3qqC5aZ0c8"
	frameBorder="0" 
	allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
 	allowFullScreen>	 
</iframe>

class Rules extends React.Component {

    constructor() {
			super();
			this.state = {
				isActive: false,
			};
    }
    
	render() {
		return (
			<section className ="Rules" style ={style.rules}>
                <h1 style={style.sectionTitle}>
									Les règles du Pic
								</h1>
								<div className ="videoContainer" style ={style.videoContainer}>
									{YoutubeIframe}
								</div>
      </section>
		);
	}
}


export const style = {
	rules: {
		height: window.innerHeight + "px",
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
	videoContainer: {
		padding: "1em",
		height: "80%",
		border: "red 2px solid",
	},
}

export default Rules;