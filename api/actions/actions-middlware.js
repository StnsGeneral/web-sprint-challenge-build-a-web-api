// add middlewares here related to actions
const Actions = require('./actions-model');

function logger(req, res, next) {
  console.log(
    `Method: '${req.method}' called on the '${
      req.url
    }' endpoint, at [${new Date().toLocaleString()}]`
  );
  next();
}

module.exports = { logger };
