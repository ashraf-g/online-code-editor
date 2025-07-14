import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { api } from "../api";

const HomePage = () => {
  const [code, setCode] = useState({
    py: 'print("hello py")',
    cpp: '#include<stdio.h>\nint main() {\n  printf("hello c");\n  return 0;\n}',
    js: 'console.log("hello js")',
  });
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("py");
  const [error, setError] = useState("");
  const [extensions, setExtensions] = useState(python);
  const [loginUser, setLoginUser] = useState("");
  const [loading, setLoading] = useState(false);

  //fetch user from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  //change the value of code editor
  const onChange = (val, viewUpdate) => {
    setCode((prevCode) => ({
      ...prevCode,
      [language]: val,
    }));
  };

  //compile and run the code
  const handleSubmit = async () => {
    setError("");
    try {
      setLoading(true);
      const payload = {
        language: language,
        code: code[language],
      };

      const response = await fetch(`${api}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      if (response.ok) {
        setLoading(false);
        setOutput(responseData.output || "");
      } else {
        setLoading(false);
        throw new Error(responseData.error || "An error occurred.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error during compilation:", err);
      setError(err.message || "An error occurred.");
    }
  };

  //save Code
  const handleSave = async () => {
    const user = localStorage.getItem("user");

    const isLoggedIn = user !== null;
    if (!isLoggedIn) {
      toast.error("Please Login");
      return;
    }
    setError("");
    try {
      setLoading(true);
      const payload = {
        user: loginUser.id,
        language: language,
        code: code[language],
      };
      console.log(payload);

      const authToken = loginUser.authtoken;
      const response = await fetch(`${api}/addcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("An error occurred while saving the code.");
      }
      // Handle success, maybe show a success message
      toast.success("Code saved successfully.");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error during saving:", err);
      toast.error("An error occurred.");
    }
  };

  return (
    <Layout>
      <div className="container-md mt-3 border border-info">
        <div className="row">
          <div className="col-sm-9 p-2">
            <label>Language: </label>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                switch (e.target.value) {
                  case "py":
                    setExtensions(python);
                    break;
                  case "cpp":
                    setExtensions(cpp);
                    break;
                  case "js":
                    setExtensions(javascript);
                    break;
                  default:
                    setExtensions(python);
                    break;
                }
              }}
            >
              <option value="py">Python</option>
              <option value="cpp">C/C++</option>
              <option value="js">JavaScript</option>
            </select>
            <CodeMirror
              value={code[language]}
              height="400px"
              extensions={extensions}
              theme={okaidia}
              onChange={onChange}
            />
            {loading && <Spinner />}
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary m-3" onClick={handleSubmit}>
                Compile
              </button>
              <button className="btn btn-primary m-3" onClick={handleSave}>
                Save Code
              </button>
            </div>
          </div>
          <div className="col-3 pt-4 text-info bg-dark">
            <div className="col-sm">{output && <p>Output : {output}</p>}</div>
            <div className="col-sm">{error && <p>Error: {error}</p>}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
