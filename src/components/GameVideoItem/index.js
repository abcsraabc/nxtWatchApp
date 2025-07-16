import {Link} from 'react-router-dom'
import DarkLightContext from '../../context/DarkLightContext'

import './index.css'

const GameVideoItem = props => {
  const {details} = props
  const {id, title, thumbnailUrl, viewCount} = details

  return (
    <DarkLightContext.Consumer>
      {value => {
        const {isDark} = value

        const tit = isDark ? 'tw' : 'tb'

        return (
          <Link to={`/videos/${id}`}>
            <li className="lcon">
              <div className="gcon1">
                <img
                  src={thumbnailUrl}
                  className="gimg"
                  alt="video thumbnail"
                />
                <p className={tit}>{title}</p>
                <p className="ti">{viewCount} Watching Worldwide</p>
              </div>
            </li>
          </Link>
        )
      }}
    </DarkLightContext.Consumer>
  )
}
export default GameVideoItem
