import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'

class CurrentPerm extends Component{
 
    
    constructor(props) {
        super(props)
    }

    render(){
        
        const { classes } = this.props;

        return (
            <div className={classes.container}>

            </div>
        );
    };

}

const styles = theme => ({
    container: {
        padding: 50,
    },
});

export default withStyles (styles) (CurrentPerm)