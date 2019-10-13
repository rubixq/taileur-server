const express = require("express");
const usersRouter = require("./users_routes");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({version: "1.0.0", author: "Edward Pie", email: "hackstockpie@gmail.com", message: "Taileur backend service"});
});

router.use("/users", usersRouter);

module.exports = router;