import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosSearch} from 'react-icons/io'
import {BsX} from 'react-icons/bs'
import {HomeContainer} from './StyledComponents'
import Header from '../Header'
import HomeVideoItem from '../HomeVideoItem'
import DarkLightContext from '../../context/DarkLightContext'

import SideBar from '../SideBar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    gameData: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    isDisplay: false,
  }

  componentDidMount() {
    this.getGameDetails()
  }

  getGameDetails = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    console.log(url)
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
    this.setState({searchInput: ''}, this.getGameDetails)
  }

  gameDataSuccessView = () => {
    const {gameData} = this.state
    return gameData.length > 0 ? (
      <ul className="ul">
        {gameData.map(i => (
          <HomeVideoItem key={i.id} details={i} />
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
            <h1 className={tit}>Oops! Something Went Wrong</h1>
            <p className={tit}>
              We are having some trouble to complete your request. <br />
              Please try again.
            </p>
            <button className="fbut" type="button" onClick={this.onClickRetry}>
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

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getGameDetails)
  }

  getSearchInput = () => {
    this.getGameDetails()
  }

  displayOrNot = () => {
    this.setState(prev => ({isDisplay: !prev.isDisplay}))
  }

  render() {
    return (
      <DarkLightContext.Consumer>
        {value => {
          const {isDark} = value
          const {searchInput, isDisplay} = this.state

          const backgroundcolorh = isDark ? '#181818' : 'white'
          const obut = isDark ? 'obut2' : 'obut1'
          const ban = isDisplay ? 'banner2' : 'banner1'
          const inpt = isDark ? 'inpt1' : 'inpt2'
          return (
            <HomeContainer
              backgroundcolor={backgroundcolorh}
              data-testid="home"
            >
              <Header />
              <div className="r">
                <SideBar />
                <div className="co">
                  <div className={ban} data-testid="banner">
                    <button
                      onClick={this.displayOrNot}
                      type="button"
                      data-testid="close"
                      className="into bu"
                    >
                      <BsX />
                    </button>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      className="pim"
                      alt="nxt watch logo"
                    />

                    <p className="bh1">
                      Buy Nxt Watch Premium prepaid plans with UPI
                    </p>
                    <button className="gbut" type="button">
                      GET IT NOW
                    </button>
                  </div>

                  <div className="inputcon1">
                    <input
                      className={inpt}
                      type="search"
                      value={searchInput}
                      onChange={this.onChangeSearchInput}
                      placeholder="Search"
                    />

                    <button
                      className="bu"
                      onClick={this.getSearchInput}
                      type="button"
                      data-testid="searchButton"
                    >
                      <IoIosSearch className={obut} />
                    </button>
                  </div>
                  {this.renderShowVideos()}
                </div>
              </div>
            </HomeContainer>
          )
        }}
      </DarkLightContext.Consumer>
    )
  }
}
export default Home
