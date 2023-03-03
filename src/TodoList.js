import cx from "classnames";
import { Component } from "react";

export default class TodoList extends Component {
  state = {
    items: [],
    inputValue: "",
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleAddItem = (e) => {
    e.preventDefault();
    const { inputValue, items } = this.state;
    if (inputValue.trim()) {
      const newItem = { text: inputValue.trim(), completed: false };
      this.setState({ items: [...items, newItem], inputValue: "" });
    }
  };

  handleItemClick = (index) => {
    const { items } = this.state;
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    this.setState({ items: newItems });
  };

  getRemainingTasksCount = () => {
    const { items } = this.state;
    const remainingTasks = items.filter((item) => !item.completed);
    return remainingTasks.length;
  };

  render() {
    const { items, inputValue } = this.state;
    const remainingTasksCount = this.getRemainingTasksCount();
    const totalTasksCount = items.length;

    return (
      <>
        <div>
          <h2>Todo List</h2>
          <form onSubmit={this.handleAddItem}>
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
            />
            <button type="submit">Add</button>
          </form>
          <p>
            {remainingTasksCount} remaining out of {totalTasksCount} tasks
          </p>

          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className={cx({ "is-done": item.completed })}
                onClick={() => this.handleItemClick(index)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
      </>
    );
  }
}
