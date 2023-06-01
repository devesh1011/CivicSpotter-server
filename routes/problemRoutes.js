const express = require('express');
const problemController = require('../controllers/problemControllers');

const router = express.Router();

router.get('/', problemController.getProblems);
router.post('/', problemController.createProblem);
router.delete('/:id', problemController.deleteProblem);

module.exports = router;