import "./App.css";
import SignIn from "./components/SignIn";
import Chat from "./components/Chat";

import firebase from "firebase/app";

import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDIvVT-JoPoBl4X7yE8FA4SwfJrgdj_6ww",
  authDomain: "reactchat-644ad.firebaseapp.com",
  databaseURL: "https://reactchat-644ad-default-rtdb.firebaseio.com",
  projectId: "reactchat-644ad",
  storageBucket: "reactchat-644ad.appspot.com",
  messagingSenderId: "689838456581",
  appId: "1:689838456581:web:ccc673e6c13e8a9a5a016c",
});

const auth = firebase.auth();

function App() {
  const [user, userLoading] = useAuthState(auth);

  if (userLoading) {
    console.log("User is loading");
    return (
      <div>
        <header></header>
        User information is being loaded
      </div>
    );
  }
  console.log("User is loaded");
  console.log(user);
  return (
    <div>
      <header></header>
      <section>
        {user ? (
          <Chat user={user} auth={auth}></Chat>
        ) : (
          <SignIn auth={auth}></SignIn>
        )}
      </section>
    </div>
  );
}

export default App;
