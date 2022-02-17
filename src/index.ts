import app from './server'

const os = require('os')
const ifaces = os.networkInterfaces()

Object.keys(ifaces).forEach((ifname) => {
  let alias = 0

  ifaces[ifname].forEach((iface: { family: string; internal: boolean; address: any; }) => {
    if (iface.family !== 'IPv4' || iface.internal !== false) {
      return
    }

    if (alias >= 1) {
      console.log(`${ifname}:${alias}`, iface.address)
    } else {
      console.log(ifname, iface.address)
    }
    ++alias
  })
})

if (process.env.NODE_ENV === 'dev') {
  Connect(3001, 'dev')
} else if (process.env.NODE_ENV === 'prod') {
  Connect(8001, 'prod')
} else {
  Connect(3001, 'NO_AMBIENT_DEFINED')
}

function Connect (port, stage) {
  app.listen(port, () => {
    console.log(`Running on ${stage} process`)
  })
}
