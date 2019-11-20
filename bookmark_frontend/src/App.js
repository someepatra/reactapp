import React, { Component } from "react";
import axios from "axios";
import NewBookmarkForm from "./components/NewBookmarkForm.js";
import "./App.css";
import Show from "./components/Show.js";
import UpdateForm from "./components/UpdateForm.js";

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
} else {
  baseURL = "https://fathomless-sierra-68956.herokuapp.com";
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiIsLoaded: false,
      bookmarks: []
    };
    this.getBookmarks = this.getBookmarks.bind(this);
    this.handleAddBookmark  =  this.handleAddBookmark.bind(this);
  }

  /// Index route  to get bookmarks
  async getBookmarks() {
    const ownApiData = await axios(`${baseURL}/bookmark`);
    const data = ownApiData.data;
    this.setState({
      bookmarks: data,
      apiIsLoaded: true
    })
    console.log('bookmark data..'+ this.state.bookmarks)
  }

  // Adding Newly created book mark to the page
  handleAddBookmark(newBookmarkFromForm){
    this.setState({
      bookmarks: [ ...this.state.bookmarks, newBookmarkFromForm]
    })
    console.log(this.state.bookmarks.url);
  }


  async componentDidMount() {
    this.getBookmarks();
  }
  async deleteBookmark(id) {
    console.log("clicked");
    await axios.delete(`${baseURL}/bookmark/${id}`);
    const filteredBookmarks = this.state.bookmarks.filter(bookmark => {
      return bookmark._id !== id;
    });

    this.setState({
      bookmarks: filteredBookmarks
    });
  }
 
showEdit(bookmark) {
    this.setState({
      updatedbutton: !this.state.updatedbutton,
      selectedBookmark: bookmark
    });
  }

  render() {
    const showUpdateForm = this.state.updatedbutton ? (
      <UpdateForm
        bookmark={this.state.selectedBookmark}
        updatedBookmarks={this.state.updatedBookmarks}
        getBookmarks={this.getBookmarks}
      />
    ) : (
      <NewBookmarkForm baseURL={baseURL} getBookmarks={this.getBookmarks} />
    );

    return (
      <div className="App">
        <h1 className="heading">All BookMarks</h1>
        {/* <NewBookmarkForm baseURL={baseURL} getBookmarks={this.getBookmarks} /> */}
        {showUpdateForm}
        <div>
          {this.state.bookmarks.map(bookmark => {
            return (
              <div>
                Title
                <a href={bookmark.url}>
                  <h5 key={bookmark._id}>{bookmark.title}</h5>
                </a>
                <h5 key={bookmark._id}>Url {bookmark.url}</h5>
                <button
                  onClick={() => {
                    this.showEdit(bookmark);
                  }}
                >
                  update
                </button>
                <button onClick={() => this.deleteBookmark(bookmark._id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        {typeof this.state.bookmark !== "undefined" ? (
          <Show bookmark={this.state.bookmark} />
        ) : null}
      </div>
    );
  }
}

export default App;
