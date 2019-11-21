  
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


  showEdit(bookmark) {
    console.log("edit  click"  + this.state.updatedbutton);
    this.setState({
      updatedbutton: true,
      selectedBookmark: bookmark
    });
  }
  
  createNewBookMark() {
    console.log("create click"  + this.state.updatedbutton);
    this.setState({
      updatedbutton: false
      
    });
  }
  async componentDidMount() {
    this.getBookmarks();
    // this.showEdit();
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
 
  render() {
    console.log("button..."+this.state.updatedbutton );
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
        {/* <UpdateForm
        bookmark={this.state.selectedBookmark}
        updatedBookmarks={this.state.updatedBookmarks}
        getBookmarks={this.getBookmarks}
      /> */}
       <div>{showUpdateForm}</div>
        <div>
          {this.state.bookmarks.map(bookmark => {
            return (
              <div>
               
                <a href={bookmark.url}>
                  <h5 key={bookmark._id}>{bookmark.title}</h5>
                </a>
                <h5 key={bookmark._id}> {bookmark.url}</h5>
                <button onClick={() => { this.showEdit(bookmark);}} >
                  update
                </button>
                <button onClick={() => this.deleteBookmark(bookmark._id)}>
                  Delete
                </button>
                <button onClick={() => { this.createNewBookMark();}} >
                  Create
                </button>
              </div>
            );
          })}
        </div>
        {/* {typeof this.state.bookmark !== "undefined" ? ( 
          <Show bookmark={this.state.bookmark} />
        ) : null}  */}
       
      </div>
    );
  }
}

export default App;