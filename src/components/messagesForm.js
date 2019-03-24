import React from 'react'

const MessagesForm = ({ handleChange, handleSubmit, data, errors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        className={`input ${errors.message ? 'is-danger': ''}`}
        name="message"
        placeholder="Message"
        onChange={handleChange}
        value={data.message || ''}
      />
      {errors.message && <small className="help is-danger">{errors.message}</small>}
      <button className="button is-info">Submit</button>
    </form>
  )
}

export default MessagesForm
