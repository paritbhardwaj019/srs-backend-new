export default middleWareFn => (req, res, next) =>
  middleWareFn(req, res, next).catch(next);
