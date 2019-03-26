import React from 'react'


class PopupProfilePage extends React.Component {
  constructor() {
    super()

    this.state = {
      favouriteGames: []
    }
  }

  render() {
    if(!this.props.show) {
      return null
    }
    console.log(this.props)
    return (
      <div className="popup-backdrop">
        <div className="popup">
          <button className="popup-close" onClick={this.props.onClose}>Cancel</button>
          <ul>
            {this.props.games.map((item) =>
              <li onClick={() => this.props.handleClickGames(item)} key={item.id}>
                {item.name}
              </li>
            )}
          </ul>
        </div>
      </div>

    )
  }
}

export default PopupProfilePage
