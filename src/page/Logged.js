import React, {useRef, useState, useEffect} from 'react'
import './../css/logged.css'

import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, getAuth} from 'firebase/auth'
import {getAnalytics} from "firebase/analytics"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"

import {useAuthState} from 'react-firebase-hooks/auth'

import LobbyJoin from './LobbyJoin'

const firebaseConfig = require('./../firebaseConfig.json')
const {publicKey} = require('./../ReCaptcha.json')
  
const firebase = initializeApp(firebaseConfig)

const auth = getAuth(firebase)
const firestore = getFirestore(firebase)
getAnalytics(firebase)

initializeAppCheck(firebase, {
    provider: new ReCaptchaV3Provider(publicKey),
    isTokenAutoRefreshEnabled: true
})

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
    const [PasswordMissing, setPasswordMissing] = useState(false)
    const [EmailMissing, setEmailMissing] = useState(false)
    const [PasswordWrong, setPasswordWrong] = useState(false)
    const [PasswordMismatched, setPasswordMismatched] = useState(false)
    const [EmailExist, setEmailExist] = useState(false)
    const [InvalidMail, setInvalidMail] = useState(false)
    const [WeakPassword, setWeakPassword] = useState(false)
    const [EmailResetSent, setEmailResetSent] = useState(false)
    const [PasswordReset, setPasswordReset] = useState(false)
    const [EmailResetMissing, setEmailResetMissing] = useState(false)
    const [RegisterError, setRegisterError] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
        ref.current.focus();
    }, []);

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

        setEmailResetSent(false)

        if (Email === "") {
            setError(true)
            setEmailMissing(true)
        } else {
            setError(false)
            setEmailMissing(false)

            if (Password === "") {
                setError(true)
                setPasswordMissing(true)
            } else {
                setError(false)
                setPasswordMissing(false)
                setPasswordWrong(false)

                signInWithEmailAndPassword(auth, Email, Password)
                    .catch((error) => {
                        if (error.code === "auth/user-not-found") {
                            setRegister(true)
                            setRegisterError(true)
                        } else if (error.code === 'auth/wrong-password') {
                            setPasswordWrong(true)
                            setError(true)
                        } else if (error.code === 'auth/invalid-email') {
                            setError(true)
                            setInvalidMail(true)
                        }
                    })

            }

        }
    }

    const registerIn = () => {

        setRegisterError(false)
        setError(false)

        let passwordStrength = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

        if (Password === VerifyPassword) {
            setError(false)
            setPasswordMismatched(false)

            if (passwordStrength.test(Password)) {
                setError(false)
                setWeakPassword(false)

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

            } else {
                setError(true)
                setWeakPassword(true)
            }

        } else {
            setError(true)
            setPasswordMismatched(true)
        }

    }

    const resetPasswordInit = () => {

        setPasswordReset(true)

    }

    const resetPassword = () => {

        setRegisterError(false)

        if (Email === "") {
            setError(true)
            setEmailResetMissing(true)
        } else {
            setError(false)
            setEmailMissing(false)

            sendPasswordResetEmail(auth, Email)
                .then(() => {
                    setPasswordReset(false)
                    setEmailResetSent(true)
                    setError(false)
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-email') {
                        setError(true)
                        setInvalidMail(true)
                    } else if (error.code === "auth/user-not-found") {
                        setRegisterError(true)
                        setRegister(true)
                        setPasswordReset(false)
                    }
                })
        }

    }

    const keyDownEvent = (event) => {
        if(event.code === 'Enter') {
            if (!Register && !PasswordReset) {
                signIn()
            } else if (Register && !PasswordReset) {
                registerIn()
            } else if (!Register && PasswordReset) {
                resetPassword()
            }
        }
    }
  
    return (
        <div className='logged' ref={ref} onKeyDown={keyDownEvent}>
            {RegisterError ? (
                <div className='alert'>
                    <h2>Utente non trovato</h2>
                    <p>La mail inserita non è associata a nessun account, continuare con la registrazione:</p>
                </div>
            ) : (
                <></>
            )}
            {EmailResetSent ? (
                <div className='alert'>
                    <h2>Email inviata</h2>
                    <p>La mail per il reset della password è stata inviata a '{Email}'</p>       
                </div>
            ) : (
                <></>
            )}
            {Error ? (
                <div className='error'>
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
                                                        <div>
                                                            {EmailMissing ? (
                                                                <div>
                                                                    <h2>Email mancante</h2>
                                                                    <p>Ti sorprenderò, ma se vuoi accedere serve una mail</p>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                {PasswordMissing ? (
                                                                    <div>
                                                                        <h2>Password mancante</h2>
                                                                        <p>Incredibile vero, per accedere serve una password</p>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        {EmailResetMissing ? (
                                                                            <div>
                                                                                <h2>Email mancante</h2>
                                                                                <p>Ti sorprenderò, ma se vuoi resettare la password serve una mail</p>
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
                {!PasswordReset ? (
                    <div>
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
                                <img className="google-login-img" src='./assets/logo/Google.svg' alt=''/>
                            </button>

                            <button className="twitter-login" onClick={signInWithTwitter}>
                                <img className="twitter-login-img" src='./assets/logo/Twitter.svg' alt=''/>
                            </button>

                            <button className="github-login" onClick={signInWithGitHub}>
                                <img className="github-login-img" src='./assets/logo/GitHub.svg' alt=''/>
                            </button>

                            <button className="discord-login" onClick={signInWithDiscord}>
                                <img className="discord-login-img" src='./assets/logo/Discord.svg' alt=''/>
                            </button>

                        </div>
                        <button className="reset" onClick={resetPasswordInit}><p>Ripristina password</p></button>
                    </div>
                ) :(
                    <div className="standard-login">
                        <h1>Reimposta Password:</h1>
                        <input type="text" placeholder="e-mail" onChange={(event) => {setEmail(event.target.value)}}/>
                        <button className="confirm" onClick={resetPassword}>Conferma</button>
                    </div>
                )}
            </div>
        </div>
    )
}

//TODO: Fix top/bottom position of login/error box
//TODO: Add Email verification

export default Logged