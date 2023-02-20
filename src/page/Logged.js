import React, {useState} from 'react'
import './../css/background.css'
import './../css/logged.css'

import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import {getAnalytics} from "firebase/analytics"

import {useAuthState} from 'react-firebase-hooks/auth'

import LobbyJoin from './LobbyJoin'

const firebaseConfig = require('./../firebaseConfig.json')
  
const firebase = initializeApp(firebaseConfig)

const auth = getAuth(firebase)
const firestore = getFirestore(firebase)
getAnalytics(firebase)

const Logged = () => {

    const [user] = useAuthState(auth)

    return(
        <div>
            <div>
                {user ? (
                    <div className="sign-out">
                        <button onClick={() => auth.signOut()}>Disconnettiti</button>
                    </div>
                ) : (
                    <div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                )}
            </div>
            <div>
                {user ? <LobbyJoin firebase={firebase} firestore={firestore} auth={auth}/> : <Login/>}
            </div>
        </div>
    )
}

function Login() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)

    }

    const signInWithTwitter = () => {
        const provider = new TwitterAuthProvider()
        
        signInWithPopup(auth, provider)

    }

    const signInWithGitHub = () => {
        const provider = new GithubAuthProvider()

        signInWithPopup(auth, provider)

    }
    
    const signInWithDiscord = () => {

        //TODO: Add discord login function
        //https://github.com/luizkc/firebase-discord-oauth2-example

    }

    const signIn = () => {

        //TODO: Add password and mail login

    }
  
    return (
        <div>
            <div className="login">
                <div className="standard-login">
                    <h1>Accedi:</h1>
                    <input type="text" placeholder="e-mail" onChange={(event) => {setEmail(event.target.value)}}/>
                    <input type="password" placeholder="password" onChange={(event) => {setPassword(event.target.value)}}/>
                    <button className="confirm" onClick={signIn}>Conferma</button>
                </div>
                <div className="other-login">
                    <p>o accedi con:</p>

                    <button className="google-login" onClick={signInWithGoogle}>
                        <img className="google-login-img" src='./../assets/logo/Google.svg' alt=''/>
                    </button>

                    <button className="twitter-login" onClick={signInWithTwitter}>
                        <img className="twitter-login-img" src='./../assets/logo/Twitter.svg' alt=''/>
                    </button>

                    <button className="github-login" onClick={signInWithGitHub}>
                        <img className="github-login-img" src='./../assets/logo/GitHub.svg' alt=''/>
                    </button>

                    <button className="discord-login" onClick={signInWithDiscord}>
                        <img className="discord-login-img" src='./../assets/logo/Discord.svg' alt=''/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Logged