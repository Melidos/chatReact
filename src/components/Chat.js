import React from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import firebase from "firebase/app";

export default function Chat(props) {
  const [messages, messagesLoading, error] = useCollectionData(
    firebase.firestore().collection("messages")
  );

  if (messagesLoading) {
    return <div>Messages are loading</div>;
  } else {
    console.log(props.user);
  }
  return (
    <div className=''>
      <p>Bonjour {props.user.displayName}</p>
      <button onClick={() => props.auth.signOut()}>Sign Out</button>
      {messages.map((message) => {
        return (
          <div
            className={`d-flex ${
              message.userID === props.user.uid
                ? "justify-content-start"
                : "justify-content-end"
            }`}
          >
            <div
              className={`border rounded-pill p-2 ${
                message.userID === props.user.uid
                  ? "border-primary bg-primary"
                  : "border-success bg-success"
              }`}
            >
              {message.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
