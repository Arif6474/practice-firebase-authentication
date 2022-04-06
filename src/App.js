
import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () =>{
      signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log(result);
        const user = result.user
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      })
  }
  const handleGoogleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({})
    })
    .catch(() => {
      setUser({})
    })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then((result) => {
      const user = result.user;
      console.log(result);
      setUser(user)
    })
    .catch((error) => {
      console.error(error);
    })
  }
  return (
    <div className="App">
      { user.uid ?
      <button onClick={handleGoogleSignOut}>Sign out</button> :
     <div>
      <button onClick={handleGoogleSignIn}>Google Sign in</button>
      <button onClick= {handleGithubSignIn}>Github Sign in</button>
      </div>
}
      <h2>name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
