import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
//import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import StoreIcon from "@mui/icons-material/Store";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Admin Gateway</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Projects</span>
            </li>
          </Link>
          <li>
            <InterestsOutlinedIcon className="icon" />
            <span>Interest</span>
          </li>
          <Link to="/reported_users" style={{ textDecoration: "none" }}>
          <li>
            <ReportGmailerrorredOutlinedIcon className="icon" />
            <span>Reported Users</span>
          </li>
          </Link>
          <Link to="/reported_projects" style={{ textDecoration: "none" }}>
          <li>
            <ReportProblemOutlinedIcon className="icon" />
            <span>Reported Projects</span>
          </li>
          </Link>
          <p className="title">BLOCK</p>
          <Link to="/blocked_users" style={{ textDecoration: "none" }}>
          <li>
            <BlockOutlinedIcon className="icon" />
            <span>Blocked Users</span>
          </li>
          </Link>
          <Link to="/blocked_projects" style={{ textDecoration: "none" }}>
          <li>
            <RemoveCircleOutlineOutlinedIcon className="icon" />
            <span>Blocked Projects</span>
          </li>
          </Link>
          {/* <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USER</p>
          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
