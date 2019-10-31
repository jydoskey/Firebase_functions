const format = require('./dateFormatter');

exports.helloHTTP = function helloHTTP(req, res) {
    res.status(200).send(format.formattedDate());
}

exports.psHelloPubSub = function helloPubSub(event, callback) {
    console.log(`Hello PubSub ${moment().format('MMMM Do YYYY, h:mn:ss a')}`);
    callback();
}

exports.psHelloStorage = function psHelloStorage(event, callback) {
    console.log(`Hello Storage ${moment().format('MMMM Do YYYY, h:mn:ss a')}`);
    callback();
}