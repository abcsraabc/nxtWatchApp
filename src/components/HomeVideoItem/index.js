import {Link} from 'react-router-dom'
import DarkLightContext from '../../context/DarkLightContext'
import './index.css'

const HomeVideoItem = props => {
  const {details} = props
  const {
    id,
    title,
    thumbnailUrl,
    name,
    profileImageUrl,
    viewCount,
    publishedAt,
  } = details

  return (
    <DarkLightContext.Consumer>
      {value => {
        const {isDark} = value

        const tit = isDark ? 'tw' : 'tb'
        return (
          <Link to={`/videos/${id}`}>
            <li className="lconn">
              <div className="hicon1">
                <img
                  src={thumbnailUrl}
                  className="img11"
                  alt="video thumbnail"
                />

                <div className="hicon2">
                  <img
                    src={profileImageUrl}
                    className="piu"
                    alt="channel logo"
                  />
                  <div className="coo">
                    <p className={tit}>{title}</p>

                    <p className="ti">{name}</p>
                    <div className="vcol">
                      <p className="ti">{viewCount} </p>
                      <p className="ti">views-</p>
                      <p className="ti">{publishedAt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </DarkLightContext.Consumer>
  )
}
export default HomeVideoItem
