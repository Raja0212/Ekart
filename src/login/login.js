import React, { useState } from 'react'

function Login(props){

    const errorMsg = 'Please enter a valid details!!'
    const [showErrorMsg , changeErrorMsg] = useState(false)

    let handleSubmit = (e) => {
        if(document.getElementById('username').value ==='wagdy' && document.getElementById('password').value==='123'){
            changeErrorMsg(false)
            window.location.href='/products'
        }else{
            changeErrorMsg(true)
        }
    }

    return (
        <div>
            <nav class="navbar navbar-light bg-dark">
                <span class='navContent'>Login</span>
            </nav>
            <div class="form loginPanel" >
                <div class="form-group" >
                    <label class='cardPriceStyle'>Username</label>
                    <input type="text" id='username' name='username' autocomplete="off"  class="form-control rounded" />
                </div>
                <div class="form-group">
                    <label class='cardPriceStyle'>Password</label>
                    <input type="password" id='password' name='password'  class="form-control rounded" />
                </div>
                {showErrorMsg && <p class='error' >
                    {errorMsg}
                </p>}
                <div class='rightAlign' >
                    <button class='btn btn-primary' type='submit' onClick={handleSubmit} >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login