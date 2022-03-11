import { batch, useDispatch, useSelector } from "react-redux";
import React from "react";
import SidebarData from "./SidebarData";
import { setIsOpen } from "../../redux/slices/modalSlice";
import "./NavBar.css";

export default function NavBar() {
  const dispatch = useDispatch();

  const { isDebugging } = useSelector((state) => state.debug);
  const handleClickMenu = (title) => {
    if (title === "Reset") {
      return;
    }

    dispatch(setIsOpen(title));
  };

  const handleClickHelp = (title) => {
    dispatch(setIsOpen(title));
  };

  return (
    <div className="navbar">
      <div className="nav-menu-items">
        {SidebarData.map((item, index) => {
          if (!isDebugging && item.title === "Objective") {
            return;
          }

          if (item.title === "Help") {
            if (isDebugging) {
              return;
            }

            return (
              <div
                key={index}
                className={item.cName}
                onClick={handleClickHelp.bind(null, item.title)}
              >
                {item.title}
              </div>
            );
          }

          return (
            <div key={index} className={item.cName} onClick={() => handleClickMenu(item.title)}>
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
