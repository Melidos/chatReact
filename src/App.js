import "./App.css";
import SignIn from "./components/SignIn";
import Chat from "./components/Chat";

import { useEffect } from "react";

import firebase from "firebase/app";

import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import {
  Grid,
  CircularProgress,
  AppBar,
  Toolbar,
  Button,
  Avatar,
} from "@material-ui/core";
import React from "react";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

const auth = firebase.auth();

function App() {
  useEffect(() => {
    document.title = "Chat en temps réel";
  });

  const [user, userLoading] = useAuthState(auth);

  if (userLoading) {
    return (
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: "100vh", fontSize: "1.5em", textAlign: "center" }}
      >
        Récuperation des informations de l'utilisateur
        <CircularProgress size='10rem' />
      </Grid>
    );
  }
  return (
    <React.Fragment>
      <header>
        <AppBar position='fixed'>
          <Toolbar>
            {user ? (
              <React.Fragment>
                <Avatar src={user.photoURL}></Avatar>
                <span style={{ paddingLeft: "10px", flexGrow: "1" }}>
                  {user.displayName}
                </span>
                <Button
                  onClick={() => auth.signOut()}
                  style={{ color: "white" }}
                >
                  Deconnexion
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span style={{ flexGrow: "1" }}></span>
                <Button
                  onClick={() => {
                    auth.signInWithPopup(
                      new firebase.auth.GoogleAuthProvider()
                    );
                  }}
                  style={{ color: "white" }}
                >
                  Connexion
                </Button>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </header>
      <Grid container direction='column' justify='center' alignItems='center'>
        <section>
          {user ? (
            <Chat user={user} auth={auth}></Chat>
          ) : (
            <SignIn auth={auth}></SignIn>
          )}
        </section>
      </Grid>
    </React.Fragment>
  );
}

export default App;
