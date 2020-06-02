import http from 'http'
import Controller from './ssr-controller'

export default async function start(
  serverOptions,
  port,
  hostname
) {
  const app = new Controller({
    ...serverOptions,
    customServer: false,
  })
  const srv = http.createServer(app.handleRequest())
  await new Promise((resolve, reject) => {
    // This code catches EADDRINUSE error if the port is already in use
    srv.on('error', reject)
    srv.on('listening', () => resolve())
    srv.listen(port, hostname)
  })
  // It's up to caller to run `app.prepare()`, so it can notify that the server
  // is listening before starting any intensive operations.
  return app
}
