import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFormDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = `https://apis.ccbp.in/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="style-container">
          <form className="form-container" onSubmit={this.onSubmitFormDetails}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo"
            />
            <div className="username-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                className="input"
                id="username"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="username-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                className="input"
                id="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
