import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import TrendingVideoItem from '../TrendingVideoItem'
import DarkLightContext from '../../context/DarkLightContext'
import SideBar from '../SideBar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    gameData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGameDetails()
  }

  getGameDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      const updateData = data.videos.map(i => ({
        id: i.id,
        title: i.title,
        thumbnailUrl: i.thumbnail_url,
        name: i.channel.name,
        profileImageUrl: i.channel.profile_image_url,
        viewCount: i.view_count,
        publishedAt: i.published_at,
      }))
      this.setState({
        gameData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getGameDetails()
  }

  gameDataSuccessView = () => {
    const {gameData} = this.state
    return gameData.length > 0 ? (
      <ul className="tul">
        {gameData.map(i => (
          <TrendingVideoItem key={i.id} details={i} />
        ))}
      </ul>
    ) : (
      <DarkLightContext.Consumer>
        {value => {
          const {isDark} = value
          const tit = isDark ? 'tw' : 'tb'
          return (
            <div className="fcon1">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                className="fimg"
                alt="no videos"
              />
              <h1 className={tit}>No Search Results Found</h1>
              <p className={tit}>
                Try different key words or remove search filter
              </p>
              <button
                className="fbut"
                onClick={this.onClickRetry}
                type="button"
              >
                Retry
              </button>
            </div>
          )
        }}
      </DarkLightContext.Consumer>
    )
  }

  failureView = () => (
    <DarkLightContext.Consumer>
      {value => {
        const {isDark} = value
        const tit = isDark ? 'tb' : 'tw'
        const failimg = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="fcon1">
            <img src={failimg} className="failimgg" alt="failure view" />
            <h1 className={tit}>Oops! Somehing Went Wrong</h1>
            <p className={tit}>
              We are having some trouble to complete your request. <br />
              Please try again.
            </p>
            <button className="fbut" type="button">
              Retry
            </button>
          </div>
        )
      }}
    </DarkLightContext.Consumer>
  )

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="blue" height={50} width={50} />
    </div>
  )

  renderShowVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.gameDataSuccessView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inprogress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <DarkLightContext.Consumer>
        {value => {
          const {isDark} = value

          const backgroundcolorh = isDark ? 'hocon11' : 'hocon1'

          const timage = isDark ? (
            <HiFire color="red" size={30} />
          ) : (
            <HiFire color="black" size={30} />
          )
          const tit = isDark ? 'twh' : 'tbh'
          const gro = isDark ? 'gro2' : 'gro1'
          return (
            <div className={backgroundcolorh} data-testid="trending">
              <Header />
              <div className="r">
                <SideBar />
                <div className="dco">
                  <div className={gro}>
                    <p>{timage}</p>
                    <h1 className={tit}>Trending</h1>
                  </div>
                  <div className="co">{this.renderShowVideos()}</div>
                </div>
              </div>
            </div>
          )
        }}
      </DarkLightContext.Consumer>
    )
  }
}
export default Trending
