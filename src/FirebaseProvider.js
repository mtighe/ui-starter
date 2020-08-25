import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";

const SessionContext = React.createContext({});

export function initializeApi() {
  const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }
}

export const useSessionContext = () => {
  return useContext(SessionContext);
};

export const useUser = () => {
  const { user } = useContext(SessionContext);
  return user;
};

export const SignedIn = ({ children }) => {
  const { user } = useContext(SessionContext);
  return user ? children : null;
};

export const SignedOut = ({ children }) => {
  const { user } = useContext(SessionContext);
  return user ? null : children;
};

export function signin(email, password, callback = () => {}) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(callback)
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error!");
      console.log(errorCode, errorMessage);
    });
}

export function signout() {
  return firebase.auth().signOut();
}

export function signup(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

      console.log({ errorCode, errorMessage });
    });
}

export function signinGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...

      console.log({ token, user });
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...

      console.log({ errorCode, errorMessage, email, credential });
    });
}

const SessionProvider = (props) => {
  const { children } = props;
  const [eventFired, setEventFired] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    initializeApi();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setEventFired(true);
    });
  }, [setUser]);

  // Firebase auth isn't ready until the auth state changed event has fired
  return eventFired ? (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  ) : null;
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SessionProvider;
