import React from "react";

function CheckBox({checkStatus, darkMode, onClick}) {
  return (
    <span
      onClick={onClick}
      aria-checked={checkStatus ? "true" : "false"}
      role="checkbox"
      className={`checkbox ${
        darkMode
          ? !checkStatus && "hover:after:bg-secondaryBgD"
          : !checkStatus && "hover:after:bg-secondaryBgL"
      }  ${checkStatus ? "checked" : ""}`}
    />
  );
}

export default CheckBox;
