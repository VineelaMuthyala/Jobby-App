import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  state = {username: '', password: '', errorMessage: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmissionSuccess = jwtToken => {
    const {history} = this.props
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmissionFailure = () => {
    this.setState({errorMessage: true})
  }

  submitFrom = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmissionSuccess(data.jwt_token)
    } else {
      this.onSubmissionFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-login-container">
        <form className="login-container" onSubmit={this.submitFrom}>
          <div className="logo-container">
            <img
              className="web-site-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            />
          </div>
          <div className="login-details-container">
            <div className="label-container">
              <label className="login-text" htmlFor="username">
                USERNAME
              </label>
              <input
                className="login-input-text"
                type="text"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUsername}
                id="username"
              />
            </div>
            <div className="label-container">
              <label className="login-text" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="login-input-text"
                type="text"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
                id="password"
              />
            </div>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {errorMessage && (
            <p className="error-message">Username and Password didn`t match</p>
          )}
        </form>
      </div>
    )
  }
}

export default Home
