import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import DarkLightContext from '../../context/DarkLightContext'
import './index.css'

const SavedVideoItem = props => {
  const {details} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = details
  const {name} = channel

  const publish = new Date(publishedAt)
  const date = formatDistanceToNow(publish)

  return (
    <DarkLightContext.Consumer>
      {value => {
        const {isDark, removeItem} = value

        const tit = isDark ? 'twh' : 'tbh'

        const onRemove = () => {
          removeItem(id)
        }

        return (
          <Link to={`/videos/${id}`}>
            <li className="lcon11">
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
                    <p className="ti">{date} ago</p>
                  </div>
                </div>
              </div>

              <button className="rebut1" onClick={onRemove} type="button">
                Remove
              </button>
            </li>
          </Link>
        )
      }}
    </DarkLightContext.Consumer>
  )
}
export default SavedVideoItem
