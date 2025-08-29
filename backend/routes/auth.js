const {
     register, 
     login, 
     getAllUsers,
      logOut 
    } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;
