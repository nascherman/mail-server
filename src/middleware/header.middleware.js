"Origin, X-Requested-With, Content-Type, Accept"

const allowedHeaders = [
    'Accept',
    'Accept-Encoding',
    'Access-Control-Request-Headers',
    'Access-Control-Request-Method',
    'Cache-Control',
    'Connection',
    'Content-Type',
    'Host',

];

module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", '*');
    next();
};