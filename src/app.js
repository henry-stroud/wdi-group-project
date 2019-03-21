import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'

class App extends React.Component {
  constructor() {
    super()
    this.state = { data: {} }
  }

  render() {
    return (
      <div>
        <h1> Dead bird for sale. Not going cheep </h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
