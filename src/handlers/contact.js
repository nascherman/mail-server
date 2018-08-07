const post = (req, res, next) => {
   console.log('Got POST request', req);
   next();
};

module.exports = {
    post
};