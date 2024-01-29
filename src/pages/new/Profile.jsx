import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";

const Profile = ({ inputs, title }) => {
  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
              
              {inputs.map((input) => (
                <div style={{ margin:"10px 0" }} key={input.id}>
                  <label>{input.label}</label>
                  <h3>{input.value}</h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
