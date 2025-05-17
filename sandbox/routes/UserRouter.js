/*
const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {
  
});

router.get("/", async (request, response) => {
  
});

module.exports = router;
*/
const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// GET /user/list
router.get("/list", async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name").exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({ error: "Error fetching user list." });
  }
});

// GET /user/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user) {
      return res.status(400).send({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send({ error: "Invalid user ID format." });
  }
});

module.exports = router;

