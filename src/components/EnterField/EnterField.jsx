import React from "react";
import CheckBox from "../checkBox/CheckBox";
import {FaPlus} from "react-icons/fa6";
import {v4} from "uuid";

function EnterField({setter, tasksData, darkMode}) {
  const [checkStatus, setCheckStatus] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const addTask = () => {
    setter((prev) => [
      ...prev,
      {id: v4(), complete: checkStatus, name: inputValue},
    ]);
    setInputValue("");
    setCheckStatus(false);
  };
  const onPushEnter = (e) => {
    e.key === "Enter" && inputValue.trim().length && addTask();
  };
  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify([...tasksData]));
  }, [tasksData]);
  return (
    <div
      className={`${
        darkMode ? "bg-secondaryBgD" : "bg-secondaryBgL"
      } relative sm:h-16 h-14 flex items-center rounded-md shadow-lg shadow-[#00000069]`}>
      <CheckBox
        darkMode={darkMode}
        checkStatus={checkStatus}
        onClick={() => setCheckStatus(!checkStatus)}
      />
      <input
        id="todoInput"
        aria-label="Enter your task"
        className=" bg-[transparent]  w-full h-full ml-5 placeholder:text-secondaryTextColor  mr-0-auto  rounded-md outline-none text-customCl"
        placeholder="Create a new todo..."
        onKeyDown={(e) => onPushEnter(e)}
        onChange={(el) => setInputValue(el.target.value)}
        value={inputValue}
        type="text"
      />
      {inputValue && (
        <FaPlus
          onClick={addTask}
          className={`absolute top-1/2 right-2 -translate-y-1/2 text-[1.5em] h-full  mr-5 cursor-pointer  ${
            darkMode ? "hover:text-textHoverD" : "hover:text-textHoverL"
          }`}
        />
      )}
    </div>
  );
}

export default EnterField;
