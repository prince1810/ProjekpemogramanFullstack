const StudentController = require("../controllers/StudentController");
//biasanya routing api ini disebut dengan endpoint

const AuthController = require("../controllers/authController");
const express = require("express");
const router = express.Router();
router.get("/", (req, res) =>{
    res.send("Hello Express");
});
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/students", StudentController.index);
router.post("/students", StudentController.store);
router.put("/students/:id", StudentController.update);
router.delete("/students/:id", StudentController.destroy);

module.exports = router;