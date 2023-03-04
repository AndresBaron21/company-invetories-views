import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { GiBookshelf } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useInfo } from './useData.js'

const Header = () => {
  
  const {
    removeAllUserTokens,
    signOff,
    adminRole,
  } = useInfo();

  return (
    <div className="header">
      <ul className="nav">
        <div className="col-6">
          <Link className="nav-item link" to="/home">
            <h3 className="section-title-header">Company invetaries</h3>
          </Link>
        </div>
        <div className="col-1 space-sides">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle icons-details-nav" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <GiBookshelf />
            </a>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li>
                <Link className="link dropdown-item" to="/companies">
                  Companies
                </Link>
              </li>
              {
                adminRole ||
                  localStorage.getItem('ROLES') == 'admin' 
                  ?
                  <li>
                    <Link className="link dropdown-item" to="/company-manager">
                      Companies dashboard
                    </Link>
                  </li>
                  : null
              }
            </ul>
          </li>
        </div>
        <div className="col-1 space-sides">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle icons-details-nav" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <CgProfile />
            </a>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li>
                <a className="link dropdown-item" onClick={signOff} >
                  Sign off
                </a>
              </li>
            </ul>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Header;
