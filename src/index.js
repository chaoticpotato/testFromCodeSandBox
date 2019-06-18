import React from "react";
import ReactDOM from "react-dom";
import Dropdown from "./Dropdown";
import DropdownItem from "./Dropdown/DropdownItem";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMultipleEnabled: true,
      selectedValues: [{ value: "fruit_2", label: "Orange" }]
    };
  }

  handleChange = e => {
    this.setState({ selectedValues: e });
  };

  handleToggle = () => {
    this.setState({ isMultipleEnabled: !this.state.isMultipleEnabled });
  };

  render() {
    const { isMultipleEnabled, selectedValues } = this.state;
    return (
      <div className="App">
        <h1>Dropdown demo</h1>
        <label>
          <input
            type="checkbox"
            checked={isMultipleEnabled}
            onChange={this.handleToggle}
          />
          Is multiple selection enabled?
        </label>
        <Dropdown
          name="test"
          className="omer"
          update={this.handleChange}
          current={selectedValues}
          isMultiple={isMultipleEnabled}
        >
          <DropdownItem value="fruit_1">Apple</DropdownItem>
          <DropdownItem value="fruit_2">Orange</DropdownItem>
          <DropdownItem value="fruit_3">Banana</DropdownItem>
          <DropdownItem value="fruit_4">Grapes</DropdownItem>
        </Dropdown>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
