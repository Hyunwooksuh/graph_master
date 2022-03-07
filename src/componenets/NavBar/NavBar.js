import { useDispatch, useSelector } from "react-redux";
import React from "react";
import SidebarData from "./SidebarData";
import { setIsOpen } from "../../redux/slices/modalSlice";
import "./NavBar.css";
import { setProblem, setSubmittedCode } from "../../redux/slices/problemSlice";
import problemSet from "../../asset/problemSet";

export default function NavBar() {
  const dispatch = useDispatch();
  const { currentProblem } = useSelector((state) => state.problem);
  const problem = problemSet[currentProblem];

  const { isDebugging } = useSelector((state) => state.debug);
  const handleClickMenu = (title) => {
    if (title === "Reset") {
      return;
    }

    dispatch(setIsOpen(title));
  };

  const handleClickReset = () => {
    dispatch(setProblem(null));
    dispatch(setSubmittedCode(problem.template));
  };

  return (
    <div className="navbar">
      <div className="nav-menu-items">
        {SidebarData.map((item, index) => {
          if (!isDebugging && item.title === "Objective") {
            return;
          }

          if (item.title === "Reset") {
            if (isDebugging) {
              return;
            }

            return (
              <div key={index} className={item.cName} onClick={handleClickReset}>
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
