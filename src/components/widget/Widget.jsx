import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import InterestsRoundedIcon from '@mui/icons-material/InterestsRounded';
import Datatable_projects from "../datatable/Datatable_projects";
import { Link } from 'react-router-dom';

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 9;
  const diff = 2;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: (
          <Link to="/users">
            View Users
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "PROJECTS",
        isMoney: false,
        link: (
          <Link to="/products">
            View all projects
          </Link>
        ),
        icon: (
          <AccountTreeOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "INTERESTS",
        isMoney: true,
        link: (
          <Link to="/add-interest">
            View Interests
          </Link>
        ),
        icon: (
          <InterestsRoundedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BLOCKED PROJECTS",
        isMoney: true,
        link: (
          <Link to="/blocked_users">
            View Blocked Projects
          </Link>
        ),
        icon: (
          <BlockRoundedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && ""} {amount} 
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
