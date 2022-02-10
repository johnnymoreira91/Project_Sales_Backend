import app from './server'

if (process.env.NODE_ENV === 'dev') {
  Connect(3001, 'dev')
} else if (process.env.NODE_ENV === 'prod') {
  Connect(8080, 'prod')
} else {
  Connect(3001, 'NO_AMBIENT_DEFINED')
}

function Connect (port, stage) {
  app.listen(port, () => {
    console.log(`Running on ${stage} process`)
  })
}
