const express = require('express');
const router = express.Router();
const useC = require('../controller/userController.js');

router.post("/login", useC.login);

router.post("/user", useC.create);
router.get("/users", useC.getUsers);
router.get("/users/:id", useC.getUserId);
router.put("/update/user/:id", useC.updateUser);
router.delete("/delete/user/:id", useC.deleteUser);

module.exports = router;
