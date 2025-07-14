import React from "react";
import "./Style.css";
import img1 from "./img/person1.jpg";
import img2 from "./img/person3.jpg";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container ">
        <div className="row animate-box">
          <div className="col-md text-center ">
            <h2>Meet Our Team</h2>
            <p>
              Meet our esteemed project partner, a dynamic collaborator
              dedicated to advancing our shared goals. With a wealth of
              experience and expertise in their field, our partner brings
              invaluable insights and a commitment to excellence.
            </p>
          </div>
        </div>
      </div>
      <div className="container text-center ">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="fh5co-staff">
                <img src={img1} alt="" />
                <h3>Huma Mokashi</h3>
                <strong className="role">Designer &amp; Devloper</strong>
                <p>
                  Hello, I'm Huma Mokashi, an MSc (Computer Science) student
                  with a passion for software development. Currently pursuing my
                  Master's degree, I am dedicated to honing my skills and
                  contributing meaningfully to the dynamic field of computer
                  science.
                </p>
                <ul className="fh5co-social-icons">
                  <li>
                    <a href="/">
                      <i className="bx bxl-linkedin-square" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="bx bxl-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="bx bxl-dribbble" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="bx bxl-github" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="fh5co-staff">
                <img src={img2} alt="" />
                <h3>Gulam Ashraf</h3>
                <strong className="role">Designer &amp; Devloper</strong>
                <p>
                  Hello, I'm Gulam Ashraf, an MSc (Computer Science) student
                  with a passion for software development. Currently pursuing my
                  Master's degree, I am dedicated to honing my skills and
                  contributing meaningfully to the dynamic field of computer
                  science.
                </p>
                <ul className="fh5co-social-icons">
                  <li>
                    <a href="/">
                      <i className="bx bxl-linkedin-square" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="bx bxl-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="bx bxl-dribbble" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="bx bxl-github" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
