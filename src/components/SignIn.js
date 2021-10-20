import React, { Component } from "react";
import firebase from "firebase/app";

import { Button, Grid } from "@material-ui/core";

export default class SignIn extends Component {
  render() {
    return (
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: "100vh", fontSize: "1.5em" }}
      >
        <div style={{ color: "white", textAlign: "center" }}>
          Merci de vous connecter pour utiliser le chat TEST
        </div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            this.props.auth.signInWithPopup(
              new firebase.auth.GoogleAuthProvider()
            );
          }}
        >
          Connexion
        </Button>
      </Grid>
    );
  }
}
