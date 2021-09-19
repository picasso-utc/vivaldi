import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Hidden from '@material-ui/core/Hidden';


export const YoutubeIframe =  <iframe 
	title="rules"
	width = "100%"
	height = "100%"
	src="https://www.youtube.com/watch?v=91bKukiTL8s"
	frameBorder="0" 
	allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
 	allowFullScreen>	 
</iframe>

class Rules extends React.Component {
    
	render() {

		const { classes } = this.props;

		return (
			<React.Fragment>
				<Hidden xsDown implementation="css">
					<Grid className={clsx(classes.videoContainer, classes.large)}>
						{YoutubeIframe}
					</Grid>
				</Hidden>
				<Hidden smUp implementation="css">
					<Grid className={clsx(classes.videoContainer, classes.small)}>
						{YoutubeIframe}
					</Grid>
				</Hidden>
			</React.Fragment>
		);
	}
}


const styles = theme => ({
	videoContainer: {	
		paddingTop: 20,
		paddingBottom: 20,
	},
	small: {
		height: window.innerHeight/3,
		paddingLeft: 10,
		paddingRight: 10,
	},
	large: {
		height: 2*window.innerHeight/3,
		paddingLeft: 60,
		paddingRight: 60,
	},
});

export default withStyles(styles)(Rules);
