import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Login = () => {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {
    // console.log("Google Button Clicked");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        console.log(result.user);
        setUser(result.user)
      })
      .catch(error => {
        console.log(error)
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Done");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Please Login</h2>
      {/* <button onClick={handleGoogleSignIn}>Sign In WIth Google</button>
      <button onClick={handleSignOut}>SignOut</button> */}

      {user ? (
        <button onClick={handleSignOut}>SignOut</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Sign In WIth Google</button>
          <button onClick={handleGithubSignIn}>Sign In With Github</button>
        </>
      )}

      {user && (
        <div>
          <h3>Name: {user?.displayName}</h3>
          <h5>Email: {user.email}</h5>
          <img src={user.photoURL} alt="Photo" />
        </div>
      )}
    </div>
  );
};

export default Login;
