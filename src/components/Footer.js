import React from "react";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { asset_url } from "../utils/Config";

class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.footer}
        >
          <Grid item className={classes.footer_content}>
            <Typography variant="body1" gutterBottom>
              Pour toute question relative au <strong>Pic'Asso</strong> :{" "}
              <a href="mailto:picasso@assos.utc.fr" className={classes.link}>
                picasso@assos.utc.fr
              </a>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Vous êtes responsables :{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://assos.utc.fr/picasso/charte-consommateur.pdf"
                className={classes.link}
              >
                Charte
              </a>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Signer la charte du permanencier{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={asset_url("/charte")}
                className={classes.link}
              >
                ici
              </a>
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.copyright}
            >
              @2024 Copyright Pic'Asso
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const styles = (theme) => ({
  footer: {
    padding: "10px",
    margin: "0px",
    backgroundColor: "var(--color-light)",
    color: "white",
    boxShadow:
      "0px -2px 4px -1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)",
  },
  footer_content: {
    textAlign: "center",
    padding: "0px",
    margin: "0px",
  },
  copyright: {
    //color: '#B22132',
  },
  link: {
    textDecoration: "None",
    color: "var(--color-primary)",
  },
});

export default withStyles(styles)(Footer);
