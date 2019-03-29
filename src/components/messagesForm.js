import React from 'react'

const MessagesForm = ({ handleChange, handleSubmit, data, errors }) => {
  return (
    <div className = "chat" >
      <h1> CHAT ROOM </h1>
      <form onSubmit={handleSubmit}>
        <div className = "input">
          <textarea
            className={`input ${errors.message ? 'is-danger': ''}`}
            name="message"
            placeholder="Message"
            onChange={handleChange}
            value={data.message || ''}
          ></textarea>
        </div>
        {errors.message && <small className="help is-danger">{errors.message}</small>}
        <button className="button is-info">Submit</button>
      </form>
    </div>
  )
}

export default MessagesForm
