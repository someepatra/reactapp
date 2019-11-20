import React, { Component } from "react";
import axios from "axios";
import NewBookmarkForm from "./components/NewBookmarkForm.js";
import "./App.css";
import Show from "./components/Show.js";

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
  async toggleBookmarked(selectedBookmark, selectedBookmarkId) {
    console.log("double clicked");
    const updatedBookmark = {
      title: selectedBookmark.title,
      url: selectedBookmark.url,
      clicked: !selectedBookmark.clicked
    };
    await axios.put(
      `${baseURL}/bookmark/${selectedBookmarkId}`,
      updatedBookmark
    );
    const updatedBookmarks = this.state.bookmarks.map(bookmark => {
      if (bookmark._id === selectedBookmarkId) {
        const updatedBookmarks = {
          ...selectedBookmark
        };
        return updatedBookmarks;
      } else {
        return bookmark;
      }
    });

///Show  Bookmarks


    this.setState({
      bookmarks: updatedBookmarks
    });
  }
  render() {
    return (
      <div className="App">
        <h1 className="heading"> BOOKMARKS APP</h1>
        <NewBookmarkForm baseURL={baseURL} getBookmarks={this.getBookmarks} />
        <div>
          {this.state.bookmarks.map(bookmark => {
            return (
              <div
                className={bookmark.clicked ? "Marked" : null}
                onDoubleClick={() =>
                  this.toggleBookmarked(bookmark, bookmark._id)
                }
              >
                <a href={bookmark.url}>
                  <p key={bookmark._id}>{bookmark.title}</p>
                </a>
                <p key={bookmark._id}>{bookmark.url}</p>
                <button>update</button>
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
