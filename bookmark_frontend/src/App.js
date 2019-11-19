import React, {Component} from 'react';
import axios from 'axios';
import NewBookmarkForm from './components/NewBookmarkForm.js';
import './App.css';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
}
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      bookmarks: []
    }
    this.getBookmarks = this.getBookmarks.bind(this);
  }

  async getBookmarks() {
    const ownApiData = await axios(`${baseURL}/bookmark`);
    const data = ownApiData.data;
    this.setState({
      bookmarks: data
    })
    console.log('bookmark data..'+ this.state.bookmarks)
  }

  async componentDidMount() {
    this.getBookmarks();
  }

  render() {
    return (
      <div className="App">
          <h1> BOOKMARKS APP</h1>
          <NewBookmarkForm baseURL={baseURL} getBookmarks={this.getBookmarks}/>
          <div>
            {this.state.bookmarks.map(bookmark =>  {
              return  (
              <p key={bookmark._id}>{bookmark.title}</p>
                    
                )
            })}
          </div>
      </div>
    )
  }

}


export default App;