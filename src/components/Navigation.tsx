// just a initial navigation component for testing routes
import React from "react";
import { NavLink } from "react-router-dom";

import classes from "../styles/Navigation.module.css";

const Navigation: React.FC = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={(isActive) => (isActive ? classes.active : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(isActive) => (isActive ? classes.active : "")}
              to="/scholarship-form"
            >
              Scholarship Form
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
