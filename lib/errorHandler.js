function errorHandler(err, req, res, next) {
  let status = 500
  const response = { message: err.message }

  if(err.message === 'Unauthorized') status = 401
  if(err.message === 'Not Found') status = 404
  if(err.name === 'CastError') {
    status = 404
    response.message = 'Not Found'
  }
  if(err.name === 'JsonWebTokenError') status = 400
  if(err.name === 'ValidationError') {
    status = 422
    response.errors = {}
    response.message = 'Form validation failed'
    for(const field in err.errors) {
      response.errors[field] = err.errors[field].message
    }
  }

  res.status(status).json(response)
  next(err)
}

module.exports = errorHandler
