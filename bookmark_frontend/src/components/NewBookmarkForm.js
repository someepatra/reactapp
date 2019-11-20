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
        //Destructuring const {name,value} = event.target
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  //edit form 
//   componentDidMount(){
        // this.setState({
        //     title: this.props.bookmark.title,
        //url: this.props.bookmark.url
        // })
//   }
  async handleSubmit(event) {
    console.log("before post...");
    const baseURL = this.props.baseURL;
    const response = await axios.post(`${baseURL}/bookmark`, {
      title: this.state.title, url: this.state.url}
      );
      console.log("after post...");
    
      this.setState({
      title: "",
      url: ""
    });
    console.log("response.data.."+response.data.url);
    //handleAddBookmark() will update the bookmarks array by using spread operator in App.js file
    //to render newly added data  on the page from the form witout refreshing the page
    // this.props.handleAddBookmark(response.data);
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
        />
        <label htmlFor="url"></label>
        <input
          type="text"
          id="url"
          name="url"
          onChange={this.handleChange}
          value={this.state.url}
          placeholder="add a URL"
        />

        <input type="submit" value="Add!" />
      </form>
    );
  }
}

export default NewBookmarkForm;
