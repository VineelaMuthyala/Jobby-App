import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <img
        className="header-logo"
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      />
      <div className="menu-container">
        <Link to="/">
          <p className="menu-option">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="menu-option">Jobs</p>
        </Link>
      </div>
      <button className="logout-btn" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
