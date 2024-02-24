import React from "react";
import {RxCross1} from "react-icons/rx";
import CheckBox from "../checkBox/CheckBox";
import {motion} from "framer-motion";

function TaskItem({
  name,
  removeTask,
  setCompleteStatus,
  darkMode,
  complete,
  id,
}) {
  const [crossVisible, setCrossVisible] = React.useState(false);

  return (
    <motion.div
      whileDrag={{
        opacity: 0,
      }}
      initial={{
        opacity: 0,
        height: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        height: "auto",
        scale: 1,
      }}
      exit={{
        opacity: 0,
        height: 0,
      }}
      transition={{
        duration: 0.2,
        delay: 0.1,
      }}
      onMouseEnter={() => setCrossVisible(true)}
      onMouseLeave={() => setCrossVisible(false)}
      className="relative flex items-center border-b-[1px] border-customBorder  ">
      <CheckBox
        darkMode={darkMode}
        checkStatus={complete}
        onClick={() => setCompleteStatus(id)}
      />
      <p
        onClick={() => setCompleteStatus(id)}
        className={`${
          complete && "line-through leading-normal opacity-30"
        } flex sm:h-16 h-14 items-center cursor-pointer placeholder:opacity-[0.7] w-full  rounded-md outline-none pl-5  `}>
        {name}
      </p>
      <RxCross1
        onClick={() => removeTask(id)}
        className={`sm:${
          crossVisible ? "opacity-1" : "opacity-0"
        } text-[1.5em]  transition-opacity ease-in duration-200 mr-5 cursor-pointer text-secondaryTextColor  ${
          darkMode ? "hover:text-textHoverD" : "hover:text-textHoverL"
        }`}
      />
    </motion.div>
  );
}

export default TaskItem;
