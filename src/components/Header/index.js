import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="bg-container">
      <div className="header-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
        <div className="buttons-container">
          <button type="button" className="header-btn">
            <AiFillHome />
          </button>
          <button type="button" className="header-btn">
            <BsFillBriefcaseFill />
          </button>
          <button type="button" className="header-btn">
            <FiLogOut />
          </button>
        </div>
        <ul className="header-options">
          <li>
            <Link to="/" className="home-heading">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="home-heading">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="log-out-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
