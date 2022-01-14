// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { handleErrors, valiadateId, valiadateAction } = require('./actions-middlware')

const router = express.Router();

router.get('/', (req, res, next) => {
  Action.get()
    .then(actions => {
      res.status(200).json(actions);
    }).catch(next);
})

router.get('/:id', valiadateId, (req, res, next) => {
  res.status(200).json(req.action);
})

router.post('/', valiadateAction, (req, res, next) => {
  Action.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction);
    }).catch(next);
})

router.put('/:id', [valiadateId, valiadateAction], (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json(updated)
    }).catch(next);
})

router.delete('/:id', valiadateId, (req, res, next) => {
  const { id } = req.params;
  Action.remove(id)
    .then(deleted => {
      res.status(200).json(`deleted action with the id ${id}`);
    }).catch(next);
})

router.use(handleErrors);

module.exports = router;