
// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');
const { errorHandler, valiadateId, valiadateProject } = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
  Project.get()
  .then(projects => {
    res.status(200).json(projects);
  }).catch(next);
});

router.get('/:id', valiadateId, (req, res, next) => {
  res.status(200).json(req.project);
})

router.post('/', valiadateProject, (req, res, next) => {
  Project.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject);
    }).catch(next)
})

router.put('/:id', [valiadateId, valiadateProject], (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json(updated);
    }).catch(next);
})

router.delete('/:id', valiadateId, (req, res, next) => {
  const { id } = req.params;
  Project.remove(id)
    .then(deleted => {
      res.status(200).json(`deleted project with the id ${id}`)
    }).catch(next);
})

router.get('/:id/actions', valiadateId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    }).catch(next);
})

router.use(errorHandler);

module.exports = router;