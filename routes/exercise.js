const express = require("express");
const exerciseController = require("../controllers/exerciseController");
const router = express.Router({ mergeParams: true });

router.post("/", exerciseController.createExercise);

module.exports = router;
