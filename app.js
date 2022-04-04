var express = require('express');
var sanitizer = require('sanitize')();
var app = express();
const http = require('http');
var Web3 = require('web3')

let addressOfContract = '0x260428e36989ee6c6829F8a6E361cba99C7a8447'
let endPoint = 'https://mainnet.infura.io/v3/'  //TODO: change to your infura endpoint!

let abi = []; //TODO: get ABI in .json format from etherscan.io

var server = app.listen(7080, function () {
    var host = '127.0.0.1'
    var port = 7080
    console.log("Example app listening at http://%s:%s", host, port)
})


app.get('/name', function (req, res) {
    // Destinguishes browser from server side
    if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
        // we are in the browser and metamask injected a provider and is running
        web3 = new Web3(window.web3.currentProvider);
    } else {
        // we are in the server side and metmask is not available
        const provider = new Web3.providers.HttpProvider(
            endPoint
        );
        web3 = new Web3(provider);
    }

    var apeId = sanitizer.value(req.query.id, 'int');
    console.log(apeId);
    var ethContract = new web3.eth.Contract(abi, addressOfContract);

    ethContract.methods.getTokenClan(apeId).call().then(function (response) {
        res.end(response);
    });
});
