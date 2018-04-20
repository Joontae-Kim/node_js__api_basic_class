const express = require('express')
const router = express.Router()
const ctrl = require('./user.ctrl')

// controller
const index = ctrl.index;
const show = ctrl.show;
const destroy = ctrl.destroy;
const create = ctrl.create;

router.get('/', index)
router.get('/:id', show)
router.delete('/:id', destroy)
router.post('/', create)

module.exports = router;
