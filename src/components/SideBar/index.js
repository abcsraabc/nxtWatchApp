import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddFill} from 'react-icons/ri'
import DarkLightContext from '../../context/DarkLightContext'

import './index.css'

class SideBar extends Component {
  render() {
    return (
      <DarkLightContext.Consumer>
        {value => {
          const {isDark, activeTab, activeTabItem} = value

          const tit = isDark ? 'stw' : 'stb'

          const onClickHome = () => {
            activeTabItem('Home')
          }

          const onClickGaming = () => {
            activeTabItem('Gaming')
          }

          const onClickTrending = () => {
            activeTabItem('Trending')
          }

          const onClickSavedVideos = () => {
            activeTabItem('SavedVideos')
          }

          const dark = isDark ? 'linkimg3' : 'linkimg1'

          const activeh = activeTab === 'Home' ? dark : 'linkimg2'

          const activeg = activeTab === 'Gaming' ? dark : 'linkimg2'
          const activet = activeTab === 'Trending' ? dark : 'linkimg2'
          const actives = activeTab === 'SavedVideos' ? dark : 'linkimg2'

          const images = isDark ? (
            <AiFillHome size={30} color="white" />
          ) : (
            <AiFillHome size={30} color="black" />
          )

          const re1 =
            activeTab === 'Home' ? <AiFillHome size={30} color="red" /> : images

          const images2 = isDark ? (
            <HiFire size={30} color="white" />
          ) : (
            <HiFire size={30} color="black" />
          )
          const re2 =
            activeTab === 'Trending' ? (
              <HiFire size={30} color="red" />
            ) : (
              images2
            )

          const images3 = isDark ? (
            <SiYoutubegaming size={30} color="white" />
          ) : (
            <SiYoutubegaming size={30} color="black" />
          )
          const re3 =
            activeTab === 'Gaming' ? (
              <SiYoutubegaming size={30} color="red" />
            ) : (
              images3
            )

          const images4 = isDark ? (
            <RiPlayListAddFill size={30} color="white" />
          ) : (
            <RiPlayListAddFill size={30} color="black" />
          )
          const re4 =
            activeTab === 'SavedVideos' ? (
              <RiPlayListAddFill size={30} color="red" />
            ) : (
              images4
            )

          const sicon = isDark ? 'bgb' : 'bgw'
          return (
            <div className={sicon}>
              <ul className="sul">
                <Link to="/">
                  <li className={activeh} onClick={onClickHome}>
                    <p>{re1}</p>

                    <p className={tit}>Home</p>
                  </li>
                </Link>
                <Link to="/trending">
                  <li onClick={onClickTrending} className={activet}>
                    <p>{re2}</p>
                    <p className={tit}>Trending </p>
                  </li>
                </Link>
                <Link to="/gaming" className="linkimg">
                  <li onClick={onClickGaming} className={activeg}>
                    <p>{re3}</p>
                    <p className={tit}>Gaming</p>
                  </li>
                </Link>
                <Link to="/saved-videos">
                  <li className={actives} onClick={onClickSavedVideos}>
                    <p>{re4}</p>
                    <p className={tit}> Saved videos</p>
                  </li>
                </Link>
              </ul>

              <div className="colu">
                <p className={tit}>CONTACT US</p>
                <div className="con22">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="faceimg"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="faceimg"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="faceimg"
                  />
                </div>
                <p className={tit}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </DarkLightContext.Consumer>
    )
  }
}
export default withRouter(SideBar)
