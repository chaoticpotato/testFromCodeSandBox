import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import EnhanceWithClickOutside from "./../utils/enhanceWithClickOutside";
import DropdownList from "./DropdownList";
import { ReactComponent as DownArrow } from "./../assets/chevron-down.svg";
import ddStyles from "./dropdown.module.css";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    this.detectPlacement();
    window.addEventListener("resize", this.detectPlacement);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.detectPlacement);
  }

  handleClickOutside = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  detectPlacement = () => {
    const target = ReactDOM.findDOMNode(this.wrapper);
    this.parentFontSize = window
      .getComputedStyle(ReactDOM.findDOMNode(this.wrapper))
      .getPropertyValue("font-size");
    this.setState({ a: target.getBoundingClientRect() });
  };

  toggleDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.detectPlacement();
  };

  isIn(arr, value) {
    return arr.findIndex(e => e.value === value) > -1;
  }

  handleClick = item => () => {
    const { value, children } = item.props;

    let newCurrentArr = [];
    if (this.props.isMultiple) {
      if (this.isIn(this.props.current, value)) {
        newCurrentArr = [...this.props.current];
        newCurrentArr = newCurrentArr.filter(t => t.value !== value);
      } else {
        newCurrentArr = [...this.props.current];
        newCurrentArr.push({ value: value, label: children });
      }
    } else {
      newCurrentArr = [{ value: value, label: children }];
    }
    this.props.update(newCurrentArr);

    !this.props.isMultiple && this.toggleDropdown();
  };

  isSelected = item => {
    return this.isIn(this.props.current, item.props.value);
  };

  renderChild = c => {
    const type = this.props.isMultiple ? "checkbox" : "radio";
    const nc = (
      <>
        {this.props.showCheckboxes && <span className={ddStyles[type]} />}
        {c.props.children}
      </>
    );

    const classNameFromParent = this.props.className
      ? `${this.props.className}-item`
      : "";

    return React.cloneElement(c, {
      children: nc,
      onClick: this.handleClick(c),
      isSelected: this.isSelected(c),
      classNameFromParent: classNameFromParent
    });
  };

  renderList(props) {
    const extraListClass = props.className ? `${props.className}-list` : "";
    const extraWrapperClass = props.className
      ? `${props.className}-listPositioner`
      : "";
    const list = (
      <div
        className={`${ddStyles.list} ${extraListClass}`}
        style={{ fontSize: this.parentFontSize }}
      >
        {React.Children.map(props.children, child => this.renderChild(child))}
      </div>
    );
    return (
      <DropdownList className={extraWrapperClass} dimensions={this.state.a}>
        {list}
      </DropdownList>
    );
  }

  render() {
    let text = "";
    if (this.props.current.length === 1) {
      text = this.props.current[0].label;
    } else if (this.props.current.length === this.props.children.length) {
      text = "All are selected";
    } else if (this.props.current.length > 1) {
      text = `${this.props.current.length} selected`;
    } else {
      text = this.props.placeholder;
    }

    const { isOpen } = this.state;
    const { className } = this.props;
    return (
      <div
        className={`${ddStyles.dropdown} ${className} ${
          isOpen ? "isOpen" : ""
        }`}
        ref={c => (this.wrapper = c)}
      >
        <div className={ddStyles.currentBox} onClick={this.toggleDropdown}>
          <div className={ddStyles.current}>{text}</div>
          <div className={ddStyles.arrow}>
            <DownArrow style={{ fill: isOpen ? "#2e41ad" : "#080808" }} />
          </div>
        </div>
        {isOpen && this.renderList(this.props)}
      </div>
    );
  }
}

export default EnhanceWithClickOutside(Dropdown);

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  update: PropTypes.func.isRequired,
  current: PropTypes.array,
  isMultiple: PropTypes.bool,
  showCheckboxes: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Dropdown.defaultProps = {
  className: "",
  childrenClassName: "",
  placeholder: "Please select",
  current: [],
  isMultiple: false,
  showCheckboxes: true
};
