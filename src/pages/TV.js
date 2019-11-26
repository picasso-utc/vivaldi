import React from 'react';
import Auth from '../utils/Auth';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { asset_url, URL } from '../utils/Config';
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
        }
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
                    <iframe src={tv.link.url} className={classes.iframe_style}></iframe>
                }
            </div>         
		);
	}
}

const styles = theme => ({
    root : {
        width: '100%',
        height: '100vh',
    },
    iframe_style: {
        width: '100%',
        height: '100vh',
    }
});

export default withStyles (styles) (TV)

