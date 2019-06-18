import React from "react";
import ReactDOM from "react-dom";

export default class DropdownList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { th: 100 };
    this.modalRoot = document.getElementById("modal-root");
  }

  componentDidMount() {
    const target = ReactDOM.findDOMNode(this.wrapper);
    this.setState({ th: target.getBoundingClientRect().height });
  }

  render() {
    const { width, bottom, top, left } = this.props.dimensions;
    const { th } = this.state;
    const wh = window.innerHeight;
    const ww = window.innerWidth;
    const topScrollAmount = document.documentElement.scrollTop;

    let verticalPosition = {};
    if (wh - bottom > th) {
      // altta yer var
      verticalPosition = { top: bottom + topScrollAmount };
    } else if (top > th) {
      // üstte yer var
      verticalPosition = { top: top + topScrollAmount - th };
    } else {
      wh - bottom > top
        ? (verticalPosition = {
            top: bottom + topScrollAmount,
            maxHeight: wh - bottom - 10,
            overflowY: "auto"
          })
        : (verticalPosition = {
            top: top - th > 0 ? top + topScrollAmount - th : topScrollAmount,
            maxHeight: top,
            overflowY: "auto"
          });
    }

    const fixedStyles = {
      position: "absolute",
      left: left,
      whiteSpace: "nowrap",
      width: "auto",
      minWidth: width,
      maxWidth: ww - left - 30
    };

    const allRules = Object.assign({}, verticalPosition, fixedStyles);

    return ReactDOM.createPortal(
      <div
        className={this.props.className}
        ref={c => (this.wrapper = c)}
        style={allRules}
      >
        {this.props.children}
      </div>,
      this.modalRoot
    );
  }
}
