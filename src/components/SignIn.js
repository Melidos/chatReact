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
          Please sign in to use the chat
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
          SIGN IN
        </Button>
      </Grid>
    );
  }
}
