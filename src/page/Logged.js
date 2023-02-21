import React, {useState} from 'react'
import './../css/background.css'
import './../css/logged.css'

import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, getAuth} from 'firebase/auth'
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
    const [VerifyPassword, setVerifyPassword] = useState("")
    const [Register, setRegister] = useState(false)
    const [Error, setError] = useState(false)
    const [PasswordWrong, setPasswordWrong] = useState(false)
    const [PasswordMismatched, setPasswordMismatched] = useState(false)
    const [EmailExist, setEmailExist] = useState(false)
    const [InvalidMail, setInvalidMail] = useState(false)
    const [WeakPassword, setWeakPassword] = useState(false)

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

        signInWithEmailAndPassword(auth, Email, Password)
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    setRegister(true)
                    setPasswordWrong(false)
                    setError(false)
                } else if (error.code === 'auth/wrong-password') {
                    setPasswordWrong(true)
                    setError(true)
                }
            })

    }

    const registerIn = () => {

        let passwordStrength = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

        if (Password === VerifyPassword) {
            setError(false)
            setPasswordMismatched(false)
        } else {
            setError(true)
            setPasswordMismatched(true)
        }

        if (passwordStrength.test(Password)) {
            setError(false)
            setWeakPassword(false)
        } else {
            setError(true)
            setWeakPassword(true)
        } 

        createUserWithEmailAndPassword(auth, Email, Password)
            .catch((error) => {
                setError(true)
                if (error.code === 'auth/email-already-in-use') {
                    setEmailExist(true)
                    setRegister(false)
                } else if (error.code === 'auth/invalid-email') {
                    setInvalidMail(true)
                }
            })
    }
  
    return (
        <div className='logged'>
            {Error ? (
                <div className='password-error'>
                    {PasswordWrong ? (
                        <div>
                            <h2>Password Sbagliata</h2>
                            <p>La password del login non è corretta, se si è dimenticata usare il tasto "ripristina password"</p>
                        </div>
                    ) : (
                        <div>
                            {PasswordMismatched ? (
                                <div>
                                    <h2>Le password non corrispondono</h2>
                                    <p>La password inserita non corrisponde con quella di verifica</p>
                                </div>
                            ) : (
                                <div>
                                    {EmailExist ? (
                                        <div>
                                            <h2>Email già registrata</h2>
                                            <p>La mail inserita è già registrata, proseguire con il login:</p>
                                        </div>
                                    ) : (
                                        <div>
                                            {InvalidMail ? (
                                                <div>
                                                    <h2>Email non valida</h2>
                                                    <p>La mail inserita non è valida, inserire un indirizzo valido</p>
                                                </div>
                                            ) : (
                                                <div>
                                                    {WeakPassword ? (
                                                        <div>
                                                            <h2>Password troppo debole</h2>
                                                            <p>La password inserita non rispetta i parametri minimi di sicurezza:</p>
                                                            <ul>
                                                                <li>Minimo lunga 8 caratteri</li>
                                                                <li>Almeno una lettera maiuscola</li>
                                                                <li>Almeno una lettera minuscola</li>
                                                                <li>Almeno una numero</li>
                                                                <li>Almeno un carattere speciale</li>
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <></>
            )}
            <div className="login">
                <div className="standard-login">
                    {!Register ? (
                        <h1>Accedi:</h1>
                    ) : (
                        <h1>Registrati:</h1>
                    )}
                    <input type="text" placeholder="e-mail" onChange={(event) => {setEmail(event.target.value)}}/>
                    <input type="password" placeholder="password" onChange={(event) => {setPassword(event.target.value)}}/>
                    {!Register ? (
                        <button className="confirm" onClick={signIn}>Conferma</button>
                    ) : (
                        <div>
                            <input type="password" placeholder="verifica password" onChange={(event) => {setVerifyPassword(event.target.value)}}/>
                            <button className="confirm" onClick={registerIn}>Conferma</button>
                        </div>
                    )}
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

                    <a href="https://youtu.be/dQw4w9WgXcQ"><p>ripristina password</p></a>
                </div>
            </div>
        </div>
    )
}
//TODO:Add password reset

export default Logged