import React from "react";

import "./App.css";
import {motion} from "framer-motion";

import Header from "./components/Header/Header";
import EnterField from "./components/EnterField/EnterField";

import TasksSection from "./components/TasksSection/TasksSection";

function App() {
  const saveTheme = localStorage.getItem("darkMode");
  const saveTasks = localStorage.getItem("tasks");
  const [tasksData, setTasksData] = React.useState(
    saveTasks !== null ? JSON.parse(saveTasks) : []
  );
  const [darkMode, setDarkMode] = React.useState(
    saveTheme ? JSON.parse(saveTheme) : true
  );

  function removeTask(id) {
    setTasksData((prev) => {
      return prev.filter((t) => t.id !== id);
    });
  }
  function setCompleteStatus(id) {
    const newTaskArr = tasksData.map((task) =>
      task.id === id ? {...task, complete: !task.complete} : task
    );
    setTasksData(newTaskArr);
  }
  function clearAllCompleted() {
    setTasksData(tasksData.filter((e) => e.complete === false));
  }
  function darkModeToggle() {
    setDarkMode(!darkMode);
  }

  React.useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`${
        darkMode ? "dark:bg-bgDark dark:text-primaryClD" : ""
      } bg-bgLight text-primaryClL h-screen relative text-[18px]  select-none box-border `}>
      <img
        className="sm:h-max h-1/3 object-cover absolute "
        src={darkMode ? `bg-desktop-dark.jpg` : `bg-desktop-light.jpg`}
        alt="background banner"
      />

      <div className="container md:max-w-xl sm:max-w-lg max-w-[90%] mx-auto sm:pt-20 pt-10 relative z-auto">
        <Header darkModeToggle={darkModeToggle} darkMode={darkMode} />
        <motion.div
          initial={{opacity: 0, y: -100}}
          animate={{opacity: 1, y: 0}}
          transition={{
            ease: "easeOut",
            opacity: {duration: 0.6},
            y: {duration: 0.5},
          }}>
          <EnterField
            tasksData={tasksData}
            saveTasks={saveTasks}
            darkMode={darkMode}
            setter={setTasksData}
          />
          <TasksSection
            darkMode={darkMode}
            removeTask={removeTask}
            setCompleteStatus={setCompleteStatus}
            clearAllCompleted={clearAllCompleted}
            tasksData={tasksData}
            setTasksData={setTasksData}
          />
        </motion.div>
        {tasksData.length > 1 ? (
          <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, delay: 0.7}}
            className=" text-secondaryTextColor block mt-14 text-center">
            Drag and drop to reorder list
          </motion.p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
