import React from "react";
import PropTypes from "prop-types";
import ddStyles from "./dropdown.module.css";

export default class DropdownItem extends React.Component {
  render() {
    const {
      children,
      onClick,
      className,
      isSelected,
      classNameFromParent
    } = this.props;
    const cx = `${ddStyles.item} ${className} ${classNameFromParent} ${
      isSelected ? ddStyles.isSelected : ""
    }`;
    return (
      <div className={cx} onClick={onClick}>
        {children}
      </div>
    );
  }
}

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
};

DropdownItem.defaultProps = {
  className: "",
  isSelected: false,
  children: []
};
