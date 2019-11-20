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
      bookmarks: [],
      updatedbutton: false,
      selectedBookmark: {}
    };
    this.getBookmarks = this.getBookmarks.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
    // this.toggleBookmarked = this.toggleBookmarked.bind(this);
    this.showEdit = this.showEdit.bind(this);
  }

  async getBookmarks() {
    const ownApiData = await axios(`${baseURL}/bookmark`);
    const data = ownApiData.data;
    this.setState({
      bookmarks: data
    });
    console.log("bookmark data.." + this.state.bookmarks);
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
  // async toggleBookmarked(selectedBookmark, selectedBookmarkId) {
  //   console.log("double clicked");
  //   const updatedBookmark = {
  //     title: selectedBookmark.title,
  //     url: selectedBookmark.url
  //   };
  //   await axios.put(
  //     `${baseURL}/bookmark/${selectedBookmarkId}`,
  //     updatedBookmark
  //   );
  //   const updatedBookmarks = this.state.bookmarks.map(bookmark => {
  //     if (bookmark._id === selectedBookmarkId) {
  //       const updatedBookmarks = {
  //         ...selectedBookmark
  //       };
  //       return updatedBookmarks;
  //     } else {
  //       return bookmark;
  //     }
  //   });

  //   this.setState({
  //     bookmarks: updatedBookmarks
  //   });
  // }

  showEdit(bookmark) {
    console.log("click");
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
        <h1 className="heading"> BOOKMARKS APP</h1>
        {/* <NewBookmarkForm baseURL={baseURL} getBookmarks={this.getBookmarks} /> */}
        {showUpdateForm}
        <div>
          {this.state.bookmarks.map(bookmark => {
            return (
              <div>
                <a href={bookmark.url}>
                  <p key={bookmark._id}>{bookmark.title}</p>
                </a>
                <p key={bookmark._id}>{bookmark.url}</p>
                <button
                  onClick={() => {
                    this.showEdit(bookmark);
                  }}
                >
                  update
                </button>
                <button onClick={() => this.deleteBookmark(bookmark._id)}>
                  X
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
