const express = require("express");
const router = express.Router();
// const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Code = require("../model/CodeModel");
const { generateFile } = require("../utils/generateFile");
const { executePy } = require("../utils/executePy");
const { executeCpp } = require("../utils/executeCpp");
const { executeJs } = require("../utils/executeJs");
const Job = require("../model/JobModel");

/*============code Complie =======================ROUTE 1=============== */
const runCode = async (req, res) => {
  const { language = "py", code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  try {
    // need to generate a file with content from the request
    const filepath = await generateFile(language, code);
    let output;

    switch (language) {
      case "py":
        output = await executePy(filepath);
        break;
      case "cpp":
        output = await executeCpp(filepath);
        break;
      case "js":
        output = await executeJs(filepath);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, error: "Unsupported language!" });
    }

    // write into DB
    const job = await new Job({ language, filepath }).save();
    // console.log(job);

    return res.json({ filepath, output });
  } catch (err) {
    console.error("Error during code execution:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

/*============ view Code =======================ROUTE 2 =============== */
const viewCode = async (req, res) => {
  try {
    const userId = req.params.id;
    const code = await Code.find({ user: userId });
    res.status(200).json(code);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch Code" });
  }
};

/*============ add Code =======================ROUTE 3 =============== */
const addCode = async (req, res) => {
  try {
    // const { language, code } = req.body;

    // Validate the request body
    await Promise.all([
      body("language", "Language is required").notEmpty(),
      body("code", "Code is required").notEmpty(),
    ]);

    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Create a new instance of Code model   lang & code into one
    const newCode = new Code(req.body);

    // Save the code to the database
    const savedCode = await newCode.save();

    res.json(savedCode);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

/*============ update Code =======================ROUTE 4 =============== */
const updateCode = async (req, res) => {
  const { title, code } = req.body;
  try {
    // Create a newCode object
    const newCode = {};
    if (title) {
      newCode.title = title;
    }
    if (code) {
      newCode.code = code;
    }

    // Find the code to be updated and update it
    let existingCode = await Code.findById(req.params.id);
    if (!existingCode) {
      return res.status(404).send("Code not found");
    }

    // Ensure that the user is authorized to update the code
    if (existingCode.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    // Update the code
    existingCode = await Code.findByIdAndUpdate(
      req.params.id,
      { $set: newCode },
      { new: true }
    );

    res.json({ code: existingCode });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

/*============ delete Code =======================ROUTE 5 =============== */
const deleteCode = async (req, res) => {
  try {
    const codeId = req.params.id;
    // Find the code by ID and delete it
    const deletedCode = await Code.findByIdAndDelete(codeId);
    if (!deletedCode) {
      return res
        .status(404)
        .json({ success: false, message: "Code not found" });
    }
    // Send success response
    res
      .status(200)
      .json({ success: true, message: "Code deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  runCode,
  viewCode,
  addCode,
  updateCode,
  deleteCode,
};
