import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowErrMsg: false,
    isDark: false,
    errorMsg: '',
    checkboxInput: false,
  }

  showDarkorNot = () => {
    this.setState(prev => ({isDark: !prev.isDark}))
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prev => ({checkboxInput: !prev.checkboxInput}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isShowErrMsg: true, errorMsg})
  }

  submitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, checkboxInput, isShowErrMsg, errorMsg, isDark} =
      this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const passwordType = checkboxInput ? 'text' : 'password'
    const backgroundcolor = isDark ? 'con11' : 'con1'
    const label = isDark ? 'lab1' : 'lab2'
    const image = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
    return (
      <div className={backgroundcolor}>
        <form className="form" onSubmit={this.submitDetails}>
          <img src={image} className="img1" alt="website logo" />
          <label htmlFor="username" className={label}>
            USERNAME
          </label>
          <input
            type="text"
            className="inp"
            id="username"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUserName}
          />
          <label htmlFor="password" className={label}>
            PASSWORD
          </label>
          <input
            type={passwordType}
            className="inp"
            id="password"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />

          <div className="checon" htmlFor="check">
            <input
              type="checkbox"
              className="che"
              id="check"
              checked={checkboxInput}
              onChange={this.onChangeCheckbox}
            />
            <label className={label} htmlFor="check">
              Show Password
            </label>
          </div>
          <button className="button" type="submit">
            Login
          </button>
        </form>
        {isShowErrMsg && <p className="err">*{errorMsg}</p>}
      </div>
    )
  }
}
export default Login
