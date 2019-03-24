import React from 'react'

class Popup extends React.Component {
  render() {
    if(!this.props.show) {
      return null
    }
    const items = this.props.games.map((item) =>
      <li key={item.id}>{item.name}</li>
    )

    return (
      <div className="popup-backdrop">
        <div className="popup">
          <button className="popup-close" onClick={this.props.onClose}>Cancel</button>
          <ul>
            {items}
          </ul>
        </div>
      </div>
    )
  }
}

export default Popup
