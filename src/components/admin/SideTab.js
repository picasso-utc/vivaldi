import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SideTab extends Component {
  render() {
    return(
      <Paper className={styles.SideTab}>
        <Menu open={true} className={styles.Nav}>
          <MenuItem><Link to='/'>Home</Link></MenuItem>
          <MenuItem><a href="https://docs.google.com/forms/d/e/1FAIpQLSeKzJpok5O63-oBmGxeLpUQ12aV4Cbg58OnZfcVAHrlnkTppA/viewform">Notation perms</a></MenuItem>
          <MenuItem><Link to='/admin/charte'>Charte</Link></MenuItem>
        </Menu>
      </Paper>
    )
  }
}

const styles = {
  SideTab: {
    width: "20%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    jusitfyContent: "space-between",
    backgroundColor: "white",
  },
  Nav: {
    display: "flex",
    flexDirection: "column",
    jusitfyContent: "space-between",
  }
}

export default SideTab
