import React from 'react'
import { BrowserRouter as Browser, Link } from 'react-router-dom'

class Register extends React.Component {
  constructor() {
    super()

    this.state = { data: {} }

  }
  render() {
    return (
      <Browser>
        <main>
          <div className="contains-registerForm">
            <form className="registerForm">
              <input className="registerInput"
                name="email"
                placeholder="email"
              />

              <input className="registerInput"
                name="username"
                placeholder="username"
              />

              <input className="registerInput"
                name="password"
                placeholder="Password"
              />

              <input className="registerInput"
                name="passwordConfirmation"
                placeholder="repeat password"
              />

              <button className="submit-login"> Register </button>
            </form>
            <p> Already signed up? Click <Link to='/login'>here</Link> to log in! </p>
          </div>
        </main>
      </Browser>
    )
  }
}





export default Register
