import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ajaxGet } from '../utils/Ajax';


class TV extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            tv : {}
        }
	}

	componentDidMount(){
        this.init();
    }

    init(){
        const query = new URLSearchParams(window.location.search);
        const tv_id = query.get('id')
        if(tv_id){
            this.loadTV(tv_id);
            setInterval(() => this.loadTV(tv_id), 30000);
            // Toutes les 2 heures refresh de la page
            setInterval(() => this.reloadTV(), 2 * 60* 60 * 1000);
        }
    }

    reloadTv(){
        window.location.reload();
    }

    loadTV(tv_id){
        ajaxGet('tvs/' + tv_id + '/').then((res) => {
            if (!this.state.tv.id) {
                this.setState({tv: res.data});
            } else {
                if (this.state.tv.link.name !== res.data.link.name) {
                    window.location.reload();
                }
            }
        })
    }


	render() {

        const { classes } = this.props;
        const { tv } = this.state;

		return (
            
            <div className={classes.root}>
                {tv.id &&
                    <iframe title="main" src={tv.link.url} className={classes.iframe_style}></iframe>
                }
            </div>         
		);
	}
}

const styles = theme => ({
    root : {
        width: '100%',
        height: '100vh',
        overflowY: 'hidden',
    },
    iframe_style: {
        width: '100%',
        height: '100%',
    }
});

export default withStyles (styles) (TV)

