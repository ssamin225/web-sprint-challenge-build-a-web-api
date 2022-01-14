// add middlewares here related to actions
const Action = require('./actions-model');
const Project = require('../projects/projects-model')

const handleErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
}

const valiadateId = (req, res, next) => {
  Action.get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({ status: 404, message: 'not found!' });
      }
    }).catch(next)
}

const valiadateAction = (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    next({ status: 400, message: 'project id, description, and notes are required!' })
  } else {
    Project.get(req.body.project_id)
    .then(project => {
      if (project) {
        next();
      } else {
        next({ status: 404, message: 'Project not found!' });
      }
    })
  }
}

module.exports = {
  handleErrors,
  valiadateId,
  valiadateAction,
}