import React from 'react'
import axios from 'axios'

import Auth from '../lib/auth'

import io from 'socket.io-client'

import MessagesForm from './messagesForm'


class Chat extends React.Component {
  constructor(){
    super()

    this.state = { data: {}, errors: {} }

    this.socket = io('localhost:4000')

    this.sendMessage = (allMessages) => {
      this.socket.emit('sendMessage', (allMessages))
    }

    this.socket.on('receiveMessage', function(data){
      addMessage(data)
    })

    const addMessage = data => {
      this.setState({ messages: data })
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getMessages = this.getMessages.bind(this)

  }

  componentDidMount() {
    this.getMessages()
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }


  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/messages', this.state.data, { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then(() => axios.get('/api/messages'))
      .then((res)=> this.setState({...this.state, messages: res.data}))
      .then(() => this.sendMessage(this.state.messages))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  getMessages() {
    axios.get('/api/messages')
      .then((res) => this.setState({...this.state, messages: res.data}))
  }


  render() {
    {this.state.messages && console.log(this.state.messages)}
    return(
      <div className="contains-news">
        <MessagesForm
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          data={this.state.data}/>
        {!this.state.messages && <p> ...loading the chatbox...</p>}
        <div className = "chatBox">
          {this.state.messages && this.state.messages.map((message, i) =>
            <div className ="messages" key={i}>
              <small><span style={{color: `${message.user.color}`}}>{message.user.username}</span>: <span>{message.message}</span> </small>
            </div>
          )}
        </div>
      </div>
    )
  }

}

export default Chat
