const { exec } = require("child_process");

const executePy = (filepath) => {
  try {
    return new Promise((resolve, reject) => {
      try {
        exec(`python ${filepath}`, (error, stdout, stderr) => {
          try {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            resolve(stdout);
          } catch (e) {
            console.log(stderr);
          }
        });
      } catch (e) {}
    });
  } catch (error) {
    alert("Enter valid syntax");
  }
};

module.exports = {
  executePy,
};
