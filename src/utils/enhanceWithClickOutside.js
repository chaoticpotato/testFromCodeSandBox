import React from "react";
import ReactDOM from "react-dom";

// This function takes a component...
export default function enhanceWithClickOutside(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    componentDidMount() {
      document.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener("click", this.handleClickOutside);
    }

    handleClickOutside = e => {
      const domNode = this.__domNode;
      if (
        (!domNode || !domNode.contains(e.target)) &&
        this.__wrappedInstance &&
        typeof this.__wrappedInstance.handleClickOutside === "function"
      ) {
        this.__wrappedInstance.handleClickOutside(e);
      }
    };

    render() {
      const { wrappedRef } = this.props;
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          ref={c => {
            this.__wrappedInstance = c;
            this.__domNode = ReactDOM.findDOMNode(c);
            wrappedRef && wrappedRef(c);
          }}
          {...this.props}
        >
          {
            this.props.children // eslint-disable-line
          }
        </WrappedComponent>
      );
    }
  };
}
