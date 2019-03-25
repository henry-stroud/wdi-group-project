import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Popup extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {}
    }
  }


  render() {
    if(!this.props.show) {
      return null
    }
    return (
      <div className="popup-backdrop">
        <div className="popup">
          <button className="popup-close" onClick={this.props.onClose}>Cancel</button>
          <ul>
            {this.props.games.map((item) =>
              <li key={item.id}>
                <Link to='/gameforum'>{item.name}</Link>
              </li>

            )}
          </ul>
        </div>
      </div>

    )
  }
}

export default withRouter(Popup)
