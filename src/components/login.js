import React from 'react'
import { BrowserRouter as Browser, Link } from 'react-router-dom'

class Login extends React.Component {
  constructor() {
    super()

    this.state = { data: {} }

  }
  render() {
    return (
      <Browser>
        <main>
          <div className="contains-loginForm">
            <form className="loginForm">
              <input className="loginFormInput"
                name="email"
                placeholder="email"
              />

              <input className="loginFormInput"
                name="password"
                placeholder="Password"
              />

              <button className="submit-login"> Log in </button>
            </form>
            <p> Not signed up? Click <Link to='/register'>here</Link> to register! </p>
          </div>
        </main>
      </Browser>
    )
  }
}





export default Login
