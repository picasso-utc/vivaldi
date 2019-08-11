import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class NewsDisplayer extends React.Component {

    constructor() {
			super();
			this.state = {
				isActive: false,
			};
	}
	
	createCard(content) {
		
	}
    
	render() {
		return (
			<section id="News" className ="News" style ={styles.NewsDisplayer}>
                <h1 style={styles.sectionTitle}>
					Actualité Picasso
				</h1>
				<div style ={styles.newsContainer} >
					{MediaCard({styles})}
					{MediaCard({styles})}
				</div>
      		</section>
		);
	}
}


function MediaCard(props) {
	const classes = props;	

	return (
	  <Card className={classes.card}>
		<CardActionArea>
		  <CardMedia
			className={classes.media}
			image="/images/logo_p19.png"
			title="Contemplative Reptile"
		  />
		  <CardContent>
			<Typography gutterBottom variant="h5" component="h2">
			  Lizard
			</Typography>
			<Typography component="p">
			  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
			  across all continents except Antarctica
			</Typography>
		  </CardContent>
		</CardActionArea>
		<CardActions>
		  <Button size="small" color="primary">
			Share
		  </Button>
		  <Button size="small" color="primary">
			Learn More
		  </Button>
		</CardActions>
	</Card>
	);
  }

const styles = {
	card: {
		maxWidth: 100,
	},
	media: {
		height: 140,
	},
	NewsDisplayer: {
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
	newsContainer: {
		padding: "1em",
		height: "80%",
		border: "red 2px solid",
	},
}

// export default withStyles(styles)(ImgMediaCard);
export default withStyles(styles)(NewsDisplayer);