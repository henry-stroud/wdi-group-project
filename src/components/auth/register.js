import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Auth from '../../lib/auth'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },

      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }

  handleChange({ target: {name, value} }) {
    const data = {...this.state.data, [name]: value}
    this.setState( { data }, () => {
      console.log(this.state)
      const errors = {...this.state.errors, [name]: ''}
      this.setState({ data, errors })
    } )

  }

  handleSubmit (e) {
    e.preventDefault()
    axios.post('api/register', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/createprofile')
        console.log(res.data)
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleClick (e) {
    e.target.value = ''
  }

  render() {
    return (
      <main>
        <div className="contains-registerForm animated flipInY">
          <form onSubmit={this.handleSubmit} className="registerForm">
            <input className={`registerInput ${this.state.errors.email ? 'error': ''}`}
              name="email"
              placeholder="email"
              value={`${this.state.errors.email ? `${this.state.errors.email.message}`: `${this.state.data.email}`}`}
              onChange={this.handleChange}
              onClick={this.handleClick}
            />
            <input className={`registerInput ${this.state.errors.username ? 'error': ''}`}
              name="username"
              placeholder="username"
              value={`${this.state.errors.username ? `${this.state.errors.username.message}`: `${this.state.data.username}`}`}
              onChange={this.handleChange}
              onClick={this.handleClick}
            />
            <input className={`registerInput ${this.state.errors.password ? 'error': ''}`}
              name="password"
              placeholder="Password"
              value={`${this.state.errors.password ? `${this.state.errors.password.message}`: `${this.state.data.password}`}`}
              onChange={this.handleChange}
              type={`${this.state.errors.password ? 'text': 'password'}`}
              onClick={this.handleClick}
            />
            <input className={`registerInput ${this.state.errors.passwordConfirmation ? 'error': ''}`}
              name="passwordConfirmation"
              placeholder="repeat password"
              value={`${this.state.errors.passwordConfirmation ? `password ${this.state.errors.passwordConfirmation.message}`: `${this.state.data.passwordConfirmation}`}`}
              onChange={this.handleChange}
              type={`${this.state.errors.passwordConfirmation ? 'text': 'password'}`}
              onClick={this.handleClick}
            />
            <button className="submit-login"> Register </button>
          </form>
          <p> Already signed up? Click <Link to='/login'><span>here</span></Link> to log in! </p>
        </div>
      </main>
    )
  }
}





export default Register
