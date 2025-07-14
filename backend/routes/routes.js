const router = require("express").Router();
const fetchuser = require("../middleware/fetchuser");
const {
  userRegister,
  userLogin,
  getUser,
  resetPassword,
  otpGenerate,
  verifyOTP,
} = require("../controller/userController");
const {
  runCode,
  viewCode,
  addCode,
  updateCode,
  deleteCode,
} = require("../controller/editorController");

/************************ User Routes ************************/
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/getuser/:id", getUser);
router.put("/resetpassword", resetPassword);
router.post("/otp", otpGenerate);
router.post("/verify", verifyOTP);

/************************ Run Code Routes ************************/
router.post("/run", runCode);
/************************ Save Routes ************************/
router.post("/addcode", addCode);
router.post("/viewcode/:id", viewCode);
router.put("/updatecode/:id", updateCode);
router.delete("/deletecode/:id", deleteCode);

module.exports = router;
