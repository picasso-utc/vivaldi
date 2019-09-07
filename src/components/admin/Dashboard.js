import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'

class Dashboard extends Component{
 
    
    constructor(props) {
        super(props)
    }

    render(){
        
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                En cours d'écriture lol
            </div>
        );
    };

}

const styles = theme => ({
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: "1.5px solid #B22132",
    },
});

export default withStyles (styles) (Dashboard)