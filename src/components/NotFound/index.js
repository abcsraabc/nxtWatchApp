import DarkLightContext from '../../context/DarkLightContext'
import SideBar from '../SideBar'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <DarkLightContext.Consumer>
    {value => {
      const {isDark} = value
      const tit = isDark ? 'twn' : 'tbn'
      const backgroundcolorh = isDark ? 'nocon11' : 'nocon1'
      const notimg = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <div className={backgroundcolorh}>
          <Header />
          <div className='nco'>
            <SideBar />
            <div className='nn'>
              <img src={notimg} className='no' alt='not found' />
              <h1 className={tit}>Page Not Found</h1>
              <p className={tit}>
                we are sorry, the page you requested could not be found.
              </p>
            </div>
          </div>
        </div>
      )
    }}
  </DarkLightContext.Consumer>
)
export default NotFound
