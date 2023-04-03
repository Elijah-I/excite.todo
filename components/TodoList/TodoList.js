import React from "react";
import styles from "./TodoList.module.scss";
export const TodoList = () => {
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.header },
            React.createElement("h1", null, "TODO List"))));
};
