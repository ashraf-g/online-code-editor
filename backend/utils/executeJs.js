const { exec } = require("child_process");

const executeJs = (filepath) => {
  try {
    return new Promise((resolve, reject) => {
      try {
        exec(`node ${filepath}`, (error, stdout, stderr) => {
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
    console.error("Enter valid syntax");
  }
};

module.exports = {
  executeJs,
};
