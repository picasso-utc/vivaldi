import React, {Component} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  
  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

  function SnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
  
  SnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  };

class SnackbarComponent extends Component {

  	constructor(props) {
		super(props)
		this.state = {
			snackbar: {
				open: this.props.open,
				variant: this.props.variant,
        message: this.props.message,
        horizontal: 'right',
        vertical: 'top',
			},
		}
		this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open && this.props.open === true && this.state.snackbar.open === false){
            this.setState((state, props) => ({ 
                snackbar: {
                    open: props.open,
                    variant: props.variant,
                    message: props.message,
                    horizontal: props.horizontal || 'right',
                    vertical: props.vertical || 'top',
                } 
            }))
        }
    }

	handleSnackbarClose(){
		this.setState({
			snackbar: {
                ...this.state.snackbar,
            	open: false
			}
        })
        this.props.closeSnackbar();
	}

  	render() {
        const { snackbar } = this.state;
        
        return(
            <Snackbar
                anchorOrigin={{
                    vertical: snackbar.vertical,
                    horizontal: snackbar.horizontal,
                }}
                open={snackbar.open}
                autoHideDuration={this.props.duration? this.props.duration : 6000}
                onClose={this.handleSnackbarClose}
            >
                <SnackbarContentWrapper
                    onClose={this.handleSnackbarClose}
                    variant={snackbar.variant}
                    message={snackbar.message}
                />
            </Snackbar>	
        )
  	}
}


export default SnackbarComponent
