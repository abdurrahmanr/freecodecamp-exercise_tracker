const express = require("express");
const userController = require("../controllers/userController");
const exerciseRoute = require("./exercise");
const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.get("/:id/logs", userController.getLogs);

router.use("/:_id/exercises", exerciseRoute);

module.exports = router;
