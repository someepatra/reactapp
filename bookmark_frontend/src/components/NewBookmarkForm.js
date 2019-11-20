import React, { Component } from "react";
import axios from "axios";

class NewBookmarkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }
  async handleSubmit(event) {
    const baseURL = this.props.baseURL;
    const response = await axios.post(`${baseURL}/bookmark`, {
      title: this.state.title
    });
    this.setState({
      title: "",
      url: ""
    });

    //handleAddBookmark() will update the bookmarks array by using spread operator in App.js file
    //to render newly added data  on the page from the form witout refreshing the page
    this.props.handleAddBookmark(response.data);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={this.handleChange}
          value={this.state.title}
          placeholder="add a bookmark"
        /> {" "}
        <label htmlFor="url"></label>
            <input type="text" id="url" name="url" onChange={this.handleChange} value={this.state.url} placeholder="add a URL"/>
        {" "}
        <input type="submit" value="Add!" />
      </form>
    );
  }
}

export default NewBookmarkForm;
