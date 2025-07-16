import {Link} from 'react-router-dom'
import DarkLightContext from '../../context/DarkLightContext'

import './index.css'

const TrendingVideoItem = props => {
  const {details} = props
  const {id, title, thumbnailUrl, name, viewCount, publishedAt} = details

  return (
    <DarkLightContext.Consumer>
      {value => {
        const {isDark} = value

        const tit = isDark ? 'twh' : 'tbh'

        return (
          <li className="lcon11">
            <Link to={`/videos/${id}`}>
              <div className="tcon11">
                <img
                  src={thumbnailUrl}
                  className="timg11"
                  alt="video thumbnail"
                />

                <div className="tcon2">
                  <p className={tit}>{title}</p>

                  <p className="ti">{name}</p>
                  <div className="vcol">
                    <p className="ti">{viewCount} views-</p>
                    <p className="ti">{publishedAt} </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </DarkLightContext.Consumer>
  )
}
export default TrendingVideoItem
