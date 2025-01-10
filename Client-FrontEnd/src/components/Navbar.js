import React from 'react';
import { Link } from 'react-router-dom';
import mediallogo from '../images/medical-symbol.png';

const Navbar = () => {
  return (
    <div><nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    <div className="d-flex align-items-center px-3">
          <img src={mediallogo} alt="Logo" width="50" height="50" />
         <h6 className="ms-auto">LifeSpring Medical Center</h6>
        </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href={"/"}>About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={"/"}>Departments</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href={"/" }tabindex="-1" aria-disabled="true">Lab</a>
          </li>
        </ul>
        <form className="d-flex">
          {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
          <Link className="btn btn-outline-primary mx-2" to="/" type="submit">Home</Link>
          <Link className="btn btn-outline-success mx-2" to="/login" type="submit">Login</Link>
          <Link className="btn btn-outline-danger mx-2" to="/register" type="submit">Register</Link>
          <Link className="btn btn-outline-danger mx-2" to="/doctor_login" type="submit">DocotorLogin</Link>
        </form>
      </div>
    </div>
  </nav>
  </div>
  );
};

export default Navbar;
