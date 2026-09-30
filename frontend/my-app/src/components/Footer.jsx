import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <h4>StudentMS</h4>

        <p>
          A modern Student Management System built using React,
          Node.js, Express.js, and MySQL.
        </p>

        <div className="footer-icons">

          <a href="#">
            <FaGithub />
          </a>

          <a href="#">
            <FaLinkedin />
          </a>

          <a href="#">
            <FaEnvelope />
          </a>

        </div>

        <hr />

        <p className="copyright">
          © 2026 StudentMS. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;