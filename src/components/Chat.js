import React from "react";
import { useState, useEffect, useRef } from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import firebase from "firebase/app";

import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  FormControl,
} from "@material-ui/core";

export default function Chat(props) {
  const [messages, messagesLoading, error] = useCollectionData(
    firebase.firestore().collection("messages").orderBy("createdAt")
  );

  const [text, setText] = useState("");

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  if (messagesLoading) {
    return (
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: "100vh", fontSize: "1.5em", textAlign: "center" }}
      >
        Retrieving Messages
        <CircularProgress color='white' size='10rem' />
      </Grid>
    );
  } else {
    console.log(props.user);
  }
  return (
    <Grid
      container
      ref={messageRef}
      style={{
        paddingTop: "70px",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "60px",
        color: "white",
      }}
      spacing={3}
    >
      {messages.map((message) => {
        if (message.uid === props.user.uid) {
          return (
            <Grid container item direction='column' alignItems='flex-end'>
              <Grid item style={{ width: "fit-content" }}>
                <Paper
                  style={{
                    padding: "5px",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }}
                >
                  {message.text}
                </Paper>
              </Grid>
              <Grid item justify='flex-end' style={{ color: "#9e9e9e" }}>
                Posted by you
              </Grid>
            </Grid>
          );
        }
        return (
          <Grid container item direction='column' alignItems='flex-start'>
            <Grid item style={{ width: "fit-content" }}>
              <Paper
                style={{
                  padding: "5px",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                }}
              >
                {message.text}
              </Paper>
            </Grid>
            <Grid item justify='flex-end' style={{ color: "#9e9e9e" }}>
              Posted by {message.userName}
            </Grid>
          </Grid>
        );
      })}
      <TextField
        fullWidth
        id='messageTextArea'
        label='Your message'
        multiline
        rowsMax={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            firebase.firestore().collection("messages").add({
              createdAt: Date.now(),
              id: 3,
              photoURL: props.user.photoURL,
              text,
              uid: props.user.uid,
              userName: props.user.displayName,
            });
            setText("");
            e.preventDefault();
          }
        }}
        variant='filled'
        style={{
          borderRadius: "5px",
          background: "white",
          position: "fixed",
          bottom: "0",
          width: "90%",
          marginBottom: "10px",
          marginLeft: "10px",
        }}
      />
    </Grid>
  );
}
