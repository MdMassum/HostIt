const express = require('express')
const httpProxy = require('http-proxy')

const app = express()
const PORT = 8000;

const BASE_PATH = 'https://hostIt-outputs.s3.ap-south-1.amazonaws.com/__outputs'
const proxy = httpProxy.createProxy()

app.use((req,res)=>{
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    // Custom Domain - DB Query
    const resolvesTo = `${BASE_PATH}/${subdomain}`
    return proxy.web(req, res, { target: resolvesTo, changeOrigin: true })  // it creates a proxy server to target address
})

proxy.on('proxyReq', (proxyReq, req, res) => {  // if requested url doesnt contain file name then append indes.html
    const url = req.url;
    if (url === '/')
        proxyReq.path += 'index.html'

})

app.listen(PORT, ()=>{
    console.log(`Reverse Proxy Running on Port.. ${PORT}`)
})