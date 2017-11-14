import React, { Component } from "react";
import "./style.css";

class SearchBox extends Component {
  componentDidMount() {
    this.input.focus();
  }

  handleChange = event => {
    this.props.handleChange(event.target.value);
  };

  render() {
    const { value, placeholder } = this.props;

    return (
      <input
        type="text"
        className="SearchBox"
        ref={elem => {
          this.input = elem;
        }}
        onChange={this.handleChange}
        value={value}
        placeholder={placeholder}
      />
    );
  }
}

export default SearchBox;
