import './../css/login.css'
import React from 'react'

const Login = () => {
    return (
        <div>
            <div class="login">
                <form method="post">
                    <h1>Accedi:</h1>
                    <input type="text" name="nickname" placeholder="nickname" required/>
                    <input class="confirm" type="submit" value="Conferma"/>
                </form>
            </div>
            <div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
        </div>
    )
}
  
export default Login