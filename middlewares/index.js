export const timeLog = (req, res, next) => {
  console.log('--- ', Date.now())
  next()
}

export const pathLog = function (req, res, next) {
  console.log('==== req', req.method, req.path);
  next();
}