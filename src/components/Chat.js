import React, { useState, useEffect, useRef } from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import firebase from "firebase/app";

import { v4 as uuidv4 } from "uuid";

import { CircularProgress, Grid, Paper, TextField } from "@material-ui/core";

export default function Chat(props) {
  const [messages, messagesLoading] = useCollectionData(
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
        style={{ minHeight: "100vh", fontSize: "1.5em", textAlign: "center" }}
      >
        Récupération des messages
        <CircularProgress size='10rem' />
      </Grid>
    );
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
            <Grid
              container
              item
              direction='column'
              alignItems='flex-end'
              key={message.id}
            >
              <Grid
                item
                style={{ width: "fit-content", cursor: "pointer" }}
                onClick={async () => {
                  const docs = await firebase
                    .firestore()
                    .collection("messages")
                    .where("id", "==", message.id)
                    .get();

                  docs.forEach((doc) => doc.ref.delete());
                }}
              >
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
              <Grid item style={{ color: "#9e9e9e" }}>
                Posté par vous
              </Grid>
            </Grid>
          );
        }
        return (
          <Grid
            container
            item
            direction='column'
            alignItems='flex-start'
            key={message.id}
          >
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
            <Grid item style={{ color: "#9e9e9e" }}>
              Posté par {message.userName}
            </Grid>
          </Grid>
        );
      })}
      <TextField
        fullWidth
        id='messageTextArea'
        label='Votre message'
        multiline
        rowsMax={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            firebase.firestore().collection("messages").add({
              createdAt: Date.now(),
              id: uuidv4(),
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
          bottom: "0px",
          width: "92%",
          margin: "auto",
          marginBottom: "1px",
        }}
      />
    </Grid>
  );
}
