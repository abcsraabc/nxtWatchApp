import {BsBrightnessHigh} from 'react-icons/bs'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import DarkLightContext from '../../context/DarkLightContext'

import './index.css'

const Header = props => (
  <DarkLightContext.Consumer>
    {value => {
      const {isDark, changeTheme} = value

      const onClickChangeTheme = () => {
        changeTheme()
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.get('jwt_token')
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const image = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

      const darkOrLightImg = isDark ? (
        <BsBrightnessHigh size={50} color="white" />
      ) : (
        <FaMoon size={50} color="black" />
      )

      const backgroundcolor = isDark ? 'hcon11' : 'hcon1'

      const buttondet = isDark ? 'light' : 'dark'
      const borw = isDark ? 'popw' : 'popb'
      const popbut = isDark ? 'buttb' : 'buttw'
      const bcon = isDark ? 'blacon' : 'whicon'

      return (
        <nav>
          <div className={backgroundcolor}>
            <div>
              <Link to="/">
                <button data-testid="theme" className="bu" type="button">
                  <img src={image} className="img1" alt="website logo" />
                </button>
              </Link>
            </div>
            <div className="nav">
              <button
                className="img"
                type="button"
                onClick={onClickChangeTheme}
              >
                {darkOrLightImg}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                className="img"
                alt="profile"
              />
              <Popup
                modal
                trigger={
                  <button className={buttondet} type="button">
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className={bcon}>
                    <p className={borw}>Are you sure, you want to logout?</p>
                    <div className="bcon2">
                      <button
                        type="button"
                        onClick={() => close()}
                        className={popbut}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={onClickLogout}
                        className="butt2"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </nav>
      )
    }}
  </DarkLightContext.Consumer>
)

export default withRouter(Header)
