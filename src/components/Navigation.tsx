import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../styles/Navigation.module.css";
import { RoleType } from "./../utils/types";

interface Role {
  role: string | null;
}

function getUserNavigationBar() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              DashBoard
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/scholarship-form"
            >
              Apply For Scholarship
            </NavLink>
          </li> */}

          {/* <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              Log Volunteering Hour
            </NavLink>
          </li> */}

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/edit_profile"
            >
              Edit Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function getAdminNavigationBar() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              DashBoard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/list"
            >
              Promote Users
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/search"
            >
              Search Application
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/edit_profile"
            >
              Edit Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function getReviewerNavigationBar() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              DashBoard
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/edit_profile"
            >
              Edit Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function getProgramManagerNavigationBar() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              // className={({ isActive }) => (isActive ? classes.active : "")}
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              DashBoard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              Assing Reviewer
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              Approve Volunteering Hour
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              Assign Reviewer
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/edit_profile"
            >
              Edit Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
const Navigation: React.FC<Role> = ({ role }) => {
  if (role === RoleType.ADMIN) {
    return getAdminNavigationBar();
  } else if (role === RoleType.PROGRAM_MANAGER) {
    return getProgramManagerNavigationBar();
  } else if (role === RoleType.REVIEWER) {
    return getReviewerNavigationBar();
  } else {
    return getUserNavigationBar();
  }
};

export default Navigation;
