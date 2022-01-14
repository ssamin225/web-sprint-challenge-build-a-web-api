// add middlewares here related to projects
const Project = require('./projects-model');

const valiadateId = (req, res, next) => {
  Project.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        next({ status: 404, message: 'not found!' });
      }
    }).catch(next);
}

const valiadateProject = (req, res, next) => {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === null) {
    next({ status: 400, message: 'name, description, and completion status are required!' })
  } else {
    if (typeof completed === 'boolean') {
      next();
    } else {
      next({ status: 400, message: 'completion status must be a boolean value!' })
    }
  }
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
}

module.exports = {
  errorHandler,
  valiadateId,
  valiadateProject,
};