import {Component} from 'react'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {RiPlayListAddFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {LikeButton, DislikeButton, SaveButton} from './StyledComponents'
import Header from '../Header'
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
    gameItemData: [],
    apiStatus: apiStatusConstants.initial,
    isLike: false,
    isDislike: false,
  }

  componentDidMount() {
    this.getGameItemDetails()
  }

  getGameItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
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
      const updatedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        thumbnailUrl: data.video_details.thumbnail_url,
        videoUrl: data.video_details.video_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },

        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState({
        gameItemData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  gameDataSuccessView = () => (
    <DarkLightContext.Consumer>
      {value => {
        const {isDark, addSavedVideos, savedVideos} = value
        const {isLike, isDislike} = this.state

        const {gameItemData} = this.state
        const {
          title,

          channel,
          viewCount,
          publishedAt,
          videoUrl,
          description,
        } = gameItemData

        const {name, profileImageUrl, subscriberCount} = channel

        const tit = isDark ? 'tw' : 'tb'

        const lod = isLike ? '#2563eb' : ' #64748b'
        const lod1 = isDislike ? ' #2563eb' : ' #64748b'

        let isSave
        const index = savedVideos.findIndex(i => i.id === gameItemData.id)

        if (index === -1) {
          isSave = false
        } else {
          isSave = true
        }
        const lod2 = isSave ? ' #2563eb' : ' #64748b'
        const lod3 = isSave ? 'saved' : 'save'

        const onClickLike = () => {
          this.setState(prev => ({isLike: !prev.isLike, isDislike: false}))
        }
        const onClickDislike = () => {
          this.setState(prev => ({isDislike: !prev.isDislike, isLike: false}))
        }

        const onClickSavedVideos = () => {
          addSavedVideos({...gameItemData})
        }

        return (
          <div className="rocon">
            <SideBar />
            <div className="conr">
              <ReactPlayer url={videoUrl} className="oimg" />
              <p className={tit}>{title}</p>
              <div className="hicon22">
                <div className="rocon">
                  <div className="vcol">
                    <p className="ti">{viewCount} views-</p>
                    <p className="ti">{publishedAt} </p>
                  </div>
                </div>
                <div className="rocon">
                  <div className="rocon">
                    <div>
                      <AiOutlineLike
                        size={20}
                        color={lod}
                        onClick={onClickLike}
                      />
                      <LikeButton
                        color={lod}
                        type="button"
                        onClick={onClickLike}
                      >
                        Like
                      </LikeButton>
                    </div>
                  </div>

                  <div className="rocon">
                    <div>
                      <BiDislike
                        size={20}
                        color={lod1}
                        onClick={onClickDislike}
                      />
                      <DislikeButton
                        color={lod1}
                        type="button"
                        onClick={onClickDislike}
                      >
                        Dislike
                      </DislikeButton>
                    </div>
                  </div>

                  <div className="rocon">
                    <div>
                      <RiPlayListAddFill
                        size={20}
                        color={lod2}
                        onClick={onClickSavedVideos}
                      />
                      <SaveButton
                        color={lod2}
                        type="button"
                        onClick={onClickSavedVideos}
                      >
                        {lod3}
                      </SaveButton>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="hr" />
              <div className="rocon">
                <img
                  src={profileImageUrl}
                  className="imgb"
                  alt="channel logo"
                />
                <div className="conr">
                  <p className={tit}>{name}</p>
                  <p className="ti">{subscriberCount} subscribers</p>
                  <p className={tit}>{description}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </DarkLightContext.Consumer>
  )

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
      <>
        <Header />
        <DarkLightContext.Consumer>
          {value => {
            const {isDark} = value

            const backgroundcolorh = isDark ? 'hocon11' : 'hocon1'

            return (
              <div className={backgroundcolorh} data-testid="videoItemDetails">
                {this.renderShowVideos()}
              </div>
            )
          }}
        </DarkLightContext.Consumer>
      </>
    )
  }
}
export default Home
