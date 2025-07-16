import {Component} from 'react'
import {HiFire} from 'react-icons/hi'

import Header from '../Header'
import SavedVideoItem from '../SavedVideoItem'

import DarkLightContext from '../../context/DarkLightContext'
import SideBar from '../SideBar'

import './index.css'

class SavedVideos extends Component {
  gameDataSuccessView = () => (
    <DarkLightContext.Consumer>
      {value => {
        const {savedVideos} = value

        return (
          <div className="recon">
            <ul className="ul">
              {savedVideos.map(i => (
                <SavedVideoItem key={i.id} details={i} />
              ))}
            </ul>
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
        return (
          <div className="fcon1">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
              className="fimg"
              alt="no saved videos"
            />
            <h1 className={tit}>No saved videos found</h1>
            <p className={tit}>You can save your videos while watching them</p>
          </div>
        )
      }}
    </DarkLightContext.Consumer>
  )

  render() {
    return (
      <DarkLightContext.Consumer>
        {value => {
          const {isDark, savedVideos, removeAllItems} = value
          const len = savedVideos.length > 0
          const backgroundcolorh = isDark ? 'hocon11' : 'hocon1'
          const tit = isDark ? 'twh' : 'tbh'
          const timage = isDark ? (
            <HiFire color="red" size={30} />
          ) : (
            <HiFire color="black" size={30} />
          )
          const gro = isDark ? 'gro2' : 'gro1'

          const onClickRemoveAll = () => {
            removeAllItems()
          }
          return (
            <div className={backgroundcolorh} data-testid="savedvideos">
              <Header />
              <div className="scl">
                <SideBar />

                <div className="dco">
                  <div className={gro}>
                    <p>{timage}</p>
                    <h1 className={tit}>Saved Videos</h1>
                  </div>
                  <div className="co">
                    {len ? (
                      <div>
                        <div className="remove">
                          <button
                            className="rebut1"
                            onClick={onClickRemoveAll}
                            type="button"
                          >
                            Remove All
                          </button>
                        </div>
                        {this.gameDataSuccessView()}
                      </div>
                    ) : (
                      this.failureView()
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </DarkLightContext.Consumer>
    )
  }
}
export default SavedVideos
