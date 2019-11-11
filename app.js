const httpProxy = require("http-proxy");
const puppeteer = require('puppeteer-extra')
const port = process.env.PORT || 3000;

const host = "0.0.0.0";
async function createServer(WSEndPoint, host, port) {
  await httpProxy
    .createServer({
      target: WSEndPoint,
      ws: true,
      localAddress: host
    })
    .listen(port);
  return `ws://${host}:${port}`;
}
puppeteer.launch({ 
  headless: true,
  defaultViewport:null,
  devtools: false
})
.then(async browser => {
    const pagesCount = (await browser.pages()).length; 
    const browserWSEndpoint = await browser.wsEndpoint();
    const customWSEndpoint = await createServer(browserWSEndpoint, host, port);
    console.log({ browserWSEndpoint, customWSEndpoint, pagesCount });
})