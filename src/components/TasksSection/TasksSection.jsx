import React from "react";
import {AnimatePresence, Reorder} from "framer-motion";

import TaskItem from "../TaskItem/TaskItem";

function TasksSection({
  tasksData,
  darkMode,
  setCompleteStatus,
  clearAllCompleted,
  removeTask,
  setTasksData,
}) {
  const [activeOption, setActiveOption] = React.useState("All");

  const [controlsValue] = React.useState(["All", "Active", "Completed"]);

  const hasTasks = filterTasks().length > 0;

  function filterTasks() {
    if (activeOption === "Active") {
      return tasksData.filter((e) => !e.complete);
    } else if (activeOption === "Completed") {
      return tasksData.filter((e) => e.complete);
    } else {
      return tasksData;
    }
  }

  return (
    <div>
      <div
        className={`${
          darkMode ? "bg-secondaryBgD" : "bg-secondaryBgL"
        } sm:mt-6 mt-4 rounded-md shadow-xl  shadow-[#00000049]`}>
        <div>
          {hasTasks ? (
            <Reorder.Group
              as="ol"
              axis="y"
              values={tasksData}
              onReorder={setTasksData}>
              <AnimatePresence>
                {filterTasks().map((task) => (
                  <Reorder.Item
                    key={task.id}
                    value={task}
                    whileDrag={{
                      scale: 0.9,
                      boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.4)",
                    }}>
                    <TaskItem
                      darkMode={darkMode}
                      setCompleteStatus={setCompleteStatus}
                      id={task.id}
                      complete={task.complete}
                      removeTask={removeTask}
                      name={task.name}
                    />
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          ) : (
            <p className="sm:h-16 h-14  font-[500] flex items-center justify-center border-b-[1px] border-customBorder text-secondaryTextColor ">
              {activeOption !== "All"
                ? `No "${activeOption}" tasks.`
                : "No tasks yet..."}
            </p>
          )}
        </div>
        <div className="h-12 p-5 flex justify-between items-center text-secondaryTextColor text-[.8em] font-bold">
          <div>
            <p>
              {tasksData.filter((e) => e.complete === false).length} items left
            </p>
          </div>
          <div className=" hidden sm:flex gap-5">
            {controlsValue.map((element, index) => (
              <button
                key={index}
                onClick={() => setActiveOption(element)}
                className={`${
                  activeOption === element
                    ? "text-blueColor"
                    : darkMode
                    ? "hover:text-textHoverD"
                    : "hover:text-textHoverL"
                }  `}>
                {element}
              </button>
            ))}
          </div>
          <div>
            <button
              onClick={clearAllCompleted}
              className={`${
                darkMode ? "hover:text-textHoverD" : "hover:text-textHoverL"
              } mr-3 `}>
              Clear Completed
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          darkMode ? "bg-secondaryBgD" : "bg-secondaryBgL"
        } sm:h-16 h-14 flex justify-center mt-4 sm:hidden gap-5 shadow-xl shadow-[#00000049] rounded-md text-secondaryTextColor`}>
        {controlsValue.map((element) => (
          <button
            key={element}
            onClick={() => setActiveOption(element)}
            className={`${
              activeOption === element
                ? "text-blueColor"
                : darkMode
                ? "hover:text-textHoverD"
                : "hover:text-textHoverL"
            }  `}>
            {element}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TasksSection;
