import React, { Component } from "react";
import firebase from "firebase/app";

export default class SignIn extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.auth.signInWithPopup(
              new firebase.auth.GoogleAuthProvider()
            );
          }}
        >
          You have to SIGN IN to use the chat
        </button>
      </div>
    );
  }
}
