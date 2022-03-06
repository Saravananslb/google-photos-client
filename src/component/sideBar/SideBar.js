import React from "react";
import "./SideBar.css";
import { SIDE_MENU, SIDE_MENU1 } from "../../constant";
import { useNavigate,useParams } from "react-router-dom";
const CLOUD = require("../../assets/cloud-solid.svg").default;

export const SideBar = () => {
  const navigate = useNavigate();
  const {photoTab} = useParams();
  return (
    <div className="sidebar-container">
     
      <>
        {SIDE_MENU.map((item) => (
          <div
            className={
              item.key === photoTab ? "side-menu-bar selected-tab" : "side-menu-bar"
            }
            key={item.key}
            onClick={() => navigate(`/${item.key}`)}
          >
            <div className="">
              <img
                src={item.image.default}
                alt={item.name}
                width={20}
                height={20}
              />
              <span style={{ position: "relative", top: "1px" }}>
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </>
      <br />
      <div>
        <span className="library">LIBRARY</span>
      </div>
      <br/>
      <>
        {SIDE_MENU1.map((item) => (
          <div
            className={
              item.key === photoTab ? "side-menu-bar selected-tab" : "side-menu-bar"
            }
            key={item.key}
            onClick={() => navigate(`/${item.key}`)}
          >
            <div className="">
              <img
                src={item.image.default}
                alt={item.name}
                width={20}
                height={20}
              />
              <span style={{ position: "relative", top: "1px" }}>
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </>
      <br/>
      <br/>
      <div>
        <img src={CLOUD} alt="" width={20} height={20} />
        
        <span className="" style={{marginLeft: '10px'}}>Storage</span>
        <div class="progress">
          <div
            class="progress-bar bg-warning"
            role="progressbar"
            style={{width: "75%"}}
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <span>12.6 GB of 15 GB used</span>
      </div>
    </div>
  );
};
